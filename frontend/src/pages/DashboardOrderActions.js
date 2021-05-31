import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import { motion, AnimatePresence } from 'framer-motion'
import { popup2, hide5, hide } from '../animations'
import Loader from '../components/loader'
import { Scrollbars } from 'react-custom-scrollbars'
import Input from '../components/DashboardInput'
import Product from '../components/Product'
import DashboardError from '../components/DashboardError'
import CropImg from '../components/CropImg'
import { throttle } from 'underscore'
import { ReactComponent as XSign } from '../img/smallX.svg'
import Switch from 'react-switch'
import qs from 'qs'
import SmoothImg from '../components/smoothImgLoading'
import orderActions from '../actions/orderActions.js'
import { parseISO, format } from 'date-fns'
import Badge from '../components/Badge'
import OrderItemDashboard from '../components/dashboardOrderItem'

import { useInView } from 'react-intersection-observer'
import { ReactComponent as Printer } from '../img/printer.svg'
import { approveOrderAction } from '../actions/approveOrder'
import { packOrderAction } from '../actions/packOrder'
import { rejectOrderAction } from '../actions/rejectOrder'
import ConfirmPopup from '../components/confirmPopup'
import OrderPaper from '../components/OrderPaper'
import ReactToPrint from 'react-to-print'
import socket from '../clientSocket/socket'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const DashboardOrderActions = ({ scrolled }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const [element, inView] = useInView()

  const { orders } = useSelector((state) => state.dashboardOrders)

  const returnHandler = () => {
    console.log('SEARCH', location.search.length)
    const added =
      !orders && location.search.length > 0 ? `&query=something` : ''
    history.push('/dashboard/orders' + `${location.search}` + added)
  }
  useEffect(() => {
    if (
      location.search.includes('&query=something') &&
      location.pathname.split('/')[3]
    )
      history.push({
        search: location.search.replace('&query=something', ''),
      })
  }, [location.search, location.pathname])
  const imgSrcCondition = () => {
    if (order.user) {
      if (
        order.user.profilePicLink &&
        order.user.profilePicLink !== 'cleared'
      ) {
        return order.user.profilePicLink
      } else {
        return `/api/users/profilePic/tiny/${order.user._id}?w=95&h=95`
      }
    } else {
      return `/api/users/profilePic/tiny/bla?noImage=true&w=118&h=100`
    }
  }

  useEffect(() => {
    if (location.pathname.split('/')[3]) {
      dispatch(orderActions(location.pathname.split('/')[3]))
    } else {
      setMapState(false)
      setTimeout(() => {
        const view = document.querySelector('.actionsView')
        if (view) {
          document.querySelector('.actionsView').scrollTop = 0
        }
      }, 250)
    }
  }, [location.pathname])

  const {
    order,
    error,
    loadingApprove,
    loadingPack,
    asking,
    confirm,
    rejectLoading,
  } = useSelector((state) => state.orderActions)

  const [reasonValue, setReasonValue] = useState('')
  const [submitedConfirm, setSubmitedConfirm] = useState(false)
  const [mapState, setMapState] = useState(false)
  const mapboxMapRef = useRef(null)

  useEffect(() => {
    if (order && inView && !mapState && mapboxMapRef.current) {
      const map = new mapboxgl.Map({
        container: mapboxMapRef.current,
        // See style options here: https://docs.mapbox.com/api/maps/#styles
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [
          Number(order.shippingAddress.lon),
          Number(order.shippingAddress.lat),
        ],
        zoom: 15,
      })
      const marker1 = new mapboxgl.Marker({ color: '#5f61b1' })
        .setLngLat([
          Number(order.shippingAddress.lon),
          Number(order.shippingAddress.lat),
        ])
        .addTo(map)

      setMapState(map)
    }
  }, [order, inView])

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      mapboxMapRef.current = node
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      element(node)
    },
    [element]
  )
  const id = location.pathname.split('/')[3]

  const approveHandler = () => {
    dispatch(approveOrderAction(id))
  }
  const packHandler = () => {
    dispatch(packOrderAction(id))
  }

  useEffect(() => {
    if (confirm) {
      dispatch(rejectOrderAction(id, reasonValue))
    }
  }, [confirm])

  const componentRef = useRef(null)

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current
  }, [componentRef.current])

  const [printLoading, setPrintLoading] = useState(false)

  const reactToPrintTrigger = useCallback(() => {
    if (order) {
      return (
        <div className={`ActionCont`}>
          <div
            className={`actionOption trash ${
              order.approved ? '' : 'notAllowed'
            }`}
          >
            {printLoading ? (
              <Loader className='loadingPrint' />
            ) : (
              <Printer className='gearImg' />
            )}
          </div>
        </div>
      )
    }
  }, [order, printLoading])

  useEffect(() => {
    socket.on('orderPaid', (data) => {
      dispatch({
        type: 'PAID_DASHBOARD_ORDER_ACTIONS',
        payload: data,
      })
    })

    socket.on('orderDelivered', (data) => {
      dispatch({
        type: 'DELIVERED_DASHBOARD_ORDER_ACTIONS',
        payload: data,
      })
    })

    socket.on('orderApproved', (data) => {
      dispatch({
        type: 'APPROVE_DASHBOARD_ORDER_ACTIONS',
        payload: data,
      })
    })
    socket.on('orderRejected', (data) => {
      dispatch({
        type: 'REJECT_DASHBOARD_ORDER_ACTIONS',
        payload: data,
      })
    })

    socket.on('orderPacked', (data) => {
      dispatch({
        type: 'PACK_DASHBOARD_ORDER_ACTIONS',
        payload: data,
      })
    })
  }, [])

  return (
    <StyledUserAction
      style={{ top: `${scrolled}px` }}
      id={`${location.pathname.split('/')[3] ? 'active' : ''}`}
      className='cardCont'
      onClick={(e) => {
        if (e.target.classList.contains('cardCont')) {
          returnHandler()
        }
      }}
    >
      <AnimatePresence>
        {location.pathname.split('/')[3] && order ? (
          <>
            <ConfirmPopup
              input={'Reason*'}
              condition={asking}
              type='rejectOrder'
              action={`Reject This Order`}
              submitedConfirm={submitedConfirm}
              setSubmitedConfirm={setSubmitedConfirm}
              inputValue={reasonValue}
              setInputValue={setReasonValue}
            />

            <motion.div
              variants={hide5}
              onClick={returnHandler}
              className='CloseModel'
              initial='hidden'
              animate='show'
              exit='exit'
            >
              <XSign />
            </motion.div>

            <motion.div
              variants={popup2}
              initial='hidden'
              animate='show'
              exit='exit'
              className='actions-card'
            >
              <Scrollbars
                renderTrackHorizontal={(props) => (
                  <div {...props} className='track-horizontal-actionsView' />
                )}
                renderTrackVertical={(props) => (
                  <div {...props} className='track-vertical-actionsView' />
                )}
                renderThumbHorizontal={(props) => (
                  <div {...props} className='thumb-horizontal-actionsView' />
                )}
                renderThumbVertical={(props) => (
                  <div {...props} className='thumb-vertical-actionsView' />
                )}
                renderView={(props) => (
                  <div {...props} className='actionsView' />
                )}
                className='card-large-scrollable-content'
              >
                <div className='info'>
                  <a
                    target='_blank'
                    href={`/dashboard/customers/${order.user._id}`}
                  >
                    <SmoothImg
                      key={order.user._id}
                      tiny={`/api/users/profilePic/tiny/${order.user._id}`}
                      contWidth={`max-content`}
                      width={'100%'}
                      height={'100%'}
                      loaderId='loaderImg'
                      providedClassName='profilePic'
                      src={imgSrcCondition()}
                      alt=''
                    />
                  </a>
                  <div className='desc'>
                    <div className='descCont'>
                      <h1>
                        <p className='email'>{order.user.email}</p>
                        <a
                          target='_blank'
                          href={`/dashboard/customers/${order.user._id}`}
                        >
                          {order.user.name}
                        </a>
                      </h1>
                      <div className='badges'>
                        <Badge text='Delivered' status={order.isDelivered} />
                        <Badge text='Paid' status={order.isPaid} />
                        {!order.rejected ? (
                          <>
                            <Badge text='Packed' status={order.packed} />
                            <Badge text='Approved' status={order.approved} />
                          </>
                        ) : (
                          <Badge text='Rejected' status={true} />
                        )}
                      </div>
                    </div>
                    <p className='paid'>
                      Total Price: {order.totalPrice} <span>EGP</span>
                    </p>
                  </div>
                </div>
                <div className='order-items'>
                  <h1 className='title-table'>Order Items :</h1>
                  <div className='headers-actions'>
                    <div className='id'>
                      <p>Id</p>
                    </div>
                    <div className='name'>
                      <p>Name</p>
                    </div>
                    <div className='Price'>
                      <p>Price</p>
                    </div>
                    <div className='Qty'>
                      <p>Qty</p>
                    </div>
                    <div className='Total'>
                      <p>Total</p>
                    </div>
                  </div>
                </div>
                <motion.div>
                  {order.orderItems.map((e) => {
                    if (e) {
                      return <OrderItemDashboard key={e._id} product={e} />
                    }
                  })}
                </motion.div>
                <div className='seperator'></div>
                <div className='cards-cont'>
                  <div className='info-cards'>
                    <h1>Price Calculations :</h1>
                    <ul className='cont'>
                      <li>
                        Items Price: <span>{order.itemsPrice}</span>
                      </li>
                      <li>
                        Tax Price: <span>{order.taxPrice}</span>
                      </li>
                      <li>
                        Shipping Price:{' '}
                        <span>
                          {order.shippingPrice > 0
                            ? order.shippingPrice
                            : 'Free'}
                        </span>
                      </li>
                      {order.couponDiscount.discount > 0 && (
                        <li>
                          Coupon Discount:{' '}
                          <span>
                            {order.couponDiscount.discount}
                            <h6>
                              {!order.couponDiscount.isPercent
                                ? '(Voucher)'
                                : `(${Math.round(
                                    100 /
                                      ((Math.round(order.totalPrice) +
                                        Math.round(
                                          order.couponDiscount.discount
                                        ) -
                                        Math.round(order.shippingPrice)) /
                                        Math.round(
                                          order.couponDiscount.discount
                                        ))
                                  )}% Coupon)`}
                            </h6>
                          </span>
                        </li>
                      )}
                      <li className='total'>Total: {order.totalPrice}</li>
                    </ul>
                  </div>
                  <div className='info-cards'>
                    <h1>More Details :</h1>
                    <ul className='cont'>
                      <li>
                        Created At:{' '}
                        <span>
                          {format(
                            parseISO(order.createdAt),
                            'yyyy-MM-dd / hh:mm a'
                          )}
                        </span>
                      </li>
                      <li>
                        Payment Method: <span>{order.paymentMethod}</span>
                      </li>
                      {order.approved && (
                        <li>
                          Approved At:{' '}
                          <span>
                            {format(
                              parseISO(order.approved),
                              'yyyy-MM-dd / hh:mm a'
                            )}
                          </span>
                        </li>
                      )}
                      {order.packed && (
                        <li>
                          Packed At:{' '}
                          <span>
                            {format(
                              parseISO(order.packed),
                              'yyyy-MM-dd / hh:mm a'
                            )}
                          </span>
                        </li>
                      )}
                      {order.rejected && (
                        <li>
                          Rejected At:{' '}
                          <span>
                            {format(
                              parseISO(order.rejected.date),
                              'yyyy-MM-dd / hh:mm a'
                            )}
                          </span>
                        </li>
                      )}
                      {order.isPaid && (
                        <li>
                          Paid At:{' '}
                          <span>
                            {format(
                              parseISO(order.paidAt),
                              'yyyy-MM-dd / hh:mm a'
                            )}
                          </span>
                        </li>
                      )}
                      {order.isDelivered && (
                        <li>
                          Delivered At:{' '}
                          <span>
                            {format(
                              parseISO(order.deliveredAt),
                              'yyyy-MM-dd / hh:mm a'
                            )}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className='seperator'></div>
                <div className='location'>
                  <ul>
                    <li>
                      Address: <span>{order.shippingAddress.address}</span>
                    </li>
                    <li>
                      City: <span>{order.shippingAddress.city}</span>
                    </li>
                    <li>
                      Phone Number:{' '}
                      <span>{order.shippingAddress.phoneNumber}</span>
                    </li>
                    <li>
                      Governorate:{' '}
                      <span>{order.shippingAddress.governorate}</span>
                    </li>
                    <li>
                      Latitude: <span>{order.shippingAddress.lat}</span>
                    </li>
                    <li>
                      Longitude: <span>{order.shippingAddress.lon}</span>
                    </li>
                  </ul>
                  <div className='map-container' ref={setRefs} />
                </div>
                <div className='approveOrReject'>
                  <div className='btns'>
                    {!order.approved && !order.rejected ? (
                      <>
                        <motion.button
                          onClick={approveHandler}
                          className='approve'
                        >
                          Approve {loadingApprove && <Loader />}
                        </motion.button>
                        <motion.button
                          onClick={() =>
                            dispatch({ type: 'REJECT_ORDER_CONFIRM_REQUEST' })
                          }
                          className='reject'
                        >
                          Reject {rejectLoading && <Loader />}
                        </motion.button>
                      </>
                    ) : order.rejected ? (
                      <p className='rejected'>
                        *Rejected Becuase: {order.rejected.reason}
                      </p>
                    ) : !order.packed ? (
                      <>
                        <motion.button onClick={packHandler} className='pack'>
                          Pack The Package {loadingPack && <Loader />}
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            setReasonValue('Cancelled')
                            dispatch({ type: 'REJECT_ORDER_CONFIRM_REQUEST' })
                          }}
                          className='reject'
                        >
                          Cancel {rejectLoading && <Loader />}
                        </motion.button>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                  {order.approved && !order.packed && (
                    <>
                      <ReactToPrint
                        content={reactToPrintContent}
                        trigger={reactToPrintTrigger}
                        onBeforeGetContent={() => setPrintLoading(true)}
                        onBeforePrint={() => setPrintLoading(false)}
                      />
                      <div style={{ display: 'none' }}>
                        <OrderPaper
                          name={order.user.name}
                          email={order.user.email}
                          address={order.shippingAddress.address}
                          method={order.paymentMethod}
                          id={order._id}
                          createdAt={order.createdAt}
                          refrence={componentRef}
                          approved={order.approved}
                        />
                      </div>
                    </>
                  )}
                </div>
              </Scrollbars>
            </motion.div>
          </>
        ) : location.pathname.split('/')[3] && error ? (
          <DashboardError error={error} />
        ) : (
          ''
        )}
      </AnimatePresence>
    </StyledUserAction>
  )
}

const StyledUserAction = styled(motion.div)`
  .rejected {
    color: #ff6969;
    font-weight: 500;
  }
  .actionOption {
    width: 100%;
    padding: 0.65rem;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: 0.2s ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44.8px;
    height: 44.8px;
    &:hover {
      background: rgba(254, 254, 254, 0.07);
    }
    .providedLoader {
      #greybackground path {
        stroke: white !important;
      }
    }
  }
  .gear {
    padding: 0.65rem;
    border-radius: 10px;
    background: rgba(254, 254, 254, 0.1);
    cursor: pointer;
    transition: 0.2s ease;
    position: relative;

    &:hover {
      background: rgba(254, 254, 254, 0.07);
    }
  }
  .approve,
  .reject,
  .pack {
    background: #5a5da8;
    color: white;
    padding: 0.7rem 1.2rem;
    font-size: calc(0.78rem + 0.3vw);
    border: none;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: #505295;
    }
  }
  .reject {
    background: unset;
    box-shadow: inset 0px 0px 0px 2px white;
    margin-left: 1rem;
    padding: 0.7rem 1.3rem;

    &:hover {
      opacity: 0.8;
      background: unset;
    }
  }
  .btns {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .approveOrReject {
    margin-top: 1rem;
    padding-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .map-container {
    height: 100%;
    width: calc(100px + 20%);
    border-radius: 10px;
    border: 3px solid #57599d;
    box-shadow: -3px 3px 5px #3738648c;
  }
  .mapboxgl-ctrl-bottom-right {
    display: none !important;
  }
  .location {
    background: #43447a;
    padding: 1.3rem;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ul {
      max-width: 50%;
      li {
        font-size: calc(0.85rem + 0.3vw);
        list-style-position: inside;
        margin-bottom: 0.4rem;
        color: rgba(255, 255, 255, 0.95);
        span {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
  .seperator {
    width: 35%;
    min-height: 3px;
    background: rgba(67, 68, 122, 0.77);
    align-self: center;
    border-radius: 99rem;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }
  .cards-cont {
    height: max-content;
    display: flex;
    justify-content: center;
    align-items: stretch;
    padding-bottom: 1rem;
    .info-cards {
      flex: 1 1 0px;
      display: flex;
      flex-direction: column;
      h1 {
        font-weight: 400;
        color: rgba(255, 255, 255, 0.95);
        font-size: calc(1.15rem + 0.3vw);
        margin-bottom: 0.5rem;
      }
      .cont {
        background: #43447a;
        padding: 1.3rem;
        border-radius: 10px;

        li {
          font-size: calc(0.85rem + 0.3vw);
          list-style-position: inside;
          margin-bottom: 0.4rem;
          color: rgba(255, 255, 255, 0.95);
          &.total {
            font-weight: 700;
            color: white;
          }
          span {
            color: rgba(255, 255, 255, 0.8);
          }
          h6 {
            font-size: calc(0.6rem + 0.3vw);
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
            display: inline-block;
            margin-left: 0.15rem;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      &:last-child {
        margin-left: 1rem;
      }
    }
  }
  .order-items {
    .title-table {
      font-weight: 400;
      font-size: calc(1.15rem + 0.3vw);
      margin-bottom: 0.5rem;
      color: rgba(255, 255, 255, 0.95);
    }
  }
  .headers-actions {
    background: rgba(67, 68, 122, 0.37);
    padding: 0.5rem 2.1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .name,
    .id,
    .Price,
    .Category,
    .Brand,
    .Qty,
    .Total {
      p {
        color: rgba(255, 255, 255, 0.9) !important;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: calc(0.8rem + 0.3vw);
      }
    }
    .id {
      min-width: 12%;
      padding-right: 2vw;
    }
    .name {
      min-width: 40%;
      padding-right: 2vw;
    }
    .Price {
      min-width: 16%;
      padding-right: 2vw;
    }
    .Qty {
      padding-right: 2vw;
      min-width: 16%;
    }
    .Total {
      min-width: 16%;
    }
  }

  .badges {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;
  }
  position: absolute;
  left: 0;
  top: 0;
  &#active {
    background: rgba(29, 33, 62, 0.6);
    pointer-events: all;
  }
  .actionsView {
    height: 100% !important;
    overflow: auto !important;
    position: absolute;
    inset: 0px;
    margin-bottom: -20px !important;
    margin-right: -8px !important;
    display: grid;
    place-items: center;
    padding: calc(2.4rem + 1vw);
    padding-bottom: 0rem;
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    align-items: stretch;
  }
  .thumb-horizontal-actionsView {
    position: relative;
    display: block;
    height: 100%;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.2);
    width: 0px;
  }
  .track-horizontal-actionsView {
    position: absolute;
    height: 6px;
    right: 2px;
    bottom: 2px;
    left: 2px;
    border-radius: 3px;
  }

  .track-vertical-actionsView {
    position: absolute;
    width: 6px;
    right: 2px;
    bottom: 2px;
    top: 2px;
    border-radius: 3px;
  }
  .thumb-vertical-actionsView {
    position: relative;
    display: block;
    width: 100%;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.2);
    height: 135px;
    transform: translateY(0px);
  }
  .CloseModel {
    position: absolute;
    right: 3%;
    top: 4%;
    opacity: 0.7;
    transition: 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 22px;
      height: 22px;
    }
    &:hover {
      opacity: 0.9 !important;
    }
  }
  #loader:first-child {
    width: calc(0.65rem + 0.5vw) !important;
    height: calc(0.65rem + 0.5vw) !important;
    margin-left: 0.45rem !important;
    #greybackground path {
      stroke: white !important;
    }
  }

  cursor: pointer;
  pointer-events: none;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  .card-large-scrollable-content {
    border-radius: 20px;
    .title {
      font-size: calc(2rem + 0.3vw);
      margin-bottom: 1rem;
    }
  }
  .actions-card {
    cursor: auto;
    background: #373864;
    border-radius: 20px;
    width: calc(100% - (calc(2.5rem + 0.5vh) * 2));
    height: 82vh;
    .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 1.5rem;
      .profilePic {
        min-width: 95px;
        min-height: 95px;
        max-width: 95px;
        max-height: 95px;
        border-radius: 50%;
      }

      .desc {
        margin-left: 0.8rem;
        width: 100%;
        p {
          font-weight: 400;
        }
        h1 {
          font-size: calc(1.5rem + 0.3vw);
          font-weight: 500;
        }
        a {
          &:hover {
            text-decoration: underline;
          }
        }
        .paid {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        p {
          font-size: calc(0.75rem + 0.3vw);
          span {
            font-size: calc(0.4rem + 0.3vw);
          }
        }
        .descCont {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
      }
      .descCont .email {
        font-size: calc(0.6rem + 0.3vw) !important;
        color: white !important;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
      }
    }
  }
`

export default DashboardOrderActions
