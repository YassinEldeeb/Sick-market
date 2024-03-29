import React, { useState, useRef, useCallback, FC, memo } from 'react'
import styled from 'styled-components'
import { parseISO, format } from 'date-fns'
import { ReactComponent as Gear } from '../img/gear.svg'
import { ReactComponent as Printer } from '../img/printer.svg'

import { motion, AnimatePresence } from 'framer-motion'
import { popup } from '../animations'
import { Link, useLocation } from 'react-router-dom'
import Loader from './loader'
import SmoothImg from './smoothImgLoading'
import OrderPaper from './OrderPaper'
import ReactToPrint from 'react-to-print'

interface Props {
  order?: any
  setDashboardScrollPosition?: any
  animate?: boolean
  key: string
}

const OrderDashboard: FC<Props> = ({
  order,
  setDashboardScrollPosition,
  animate = true,
}) => {
  const location = useLocation()

  const imgSrcCondition = () => {
    if (order.user) {
      if (
        order.user.profilePicLink &&
        order.user.profilePicLink !== 'cleared'
      ) {
        return order.user.profilePicLink
      } else {
        return `/api/users/profilePic/tiny/${order.user._id}?w=50&h=50`
      }
    } else {
      return `/api/users/profilePic/tiny/bla?noImage=true&w=118&h=100`
    }
  }

  const componentRef = useRef(null)

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current
  }, [componentRef.current])

  const [printLoading, setPrintLoading] = useState(false)

  const reactToPrintTrigger = useCallback(() => {
    return (
      <div className={`ActionCont ${order.approved ? '' : 'notAllowed'}`}>
        <div
          id={`${order.approved ? '' : 'notAllowed'}`}
          className={`actionOption trash ${order.approved ? '' : 'notAllowed'}`}
        >
          {printLoading ? (
            <Loader providedClassName='loadingPrint' />
          ) : (
            <Printer className='gearImg' />
          )}
        </div>
      </div>
    )
  }, [order.approved, printLoading])

  return (
    <StyledUser variants={animate ? popup : ''}>
      <div className='id'>
        <p data-for='order-card-tooltip' data-tip={'#' + order._id}>
          #{order._id.substr(order._id.length - 4)}
        </p>
      </div>
      <div className='user'>
        {order.user ? (
          <a
            target='_blank'
            href={
              order.user.rank !== 'user'
                ? `/dashboard/employees/${order.user.rank}/${order.user._id}`
                : `/dashboard/customers/${order.user._id}`
            }
            className='inner'
          >
            <SmoothImg
              key={order._id}
              tiny={`/api/users/profilePic/tiny/${order.user._id}`}
              contWidth={`max-content`}
              width={'100%'}
              height={'100%'}
              loaderId='loaderImg'
              providedClassName='pic'
              src={imgSrcCondition()}
              alt=''
            />
            <p data-for='order-card-tooltip' data-tip={order.user.name}>
              {order.user.name}
            </p>
          </a>
        ) : (
          <div className='inner'>
            <SmoothImg
              key={order._id}
              tiny={`/uploads/tinyNo.jpg`}
              contWidth={`max-content`}
              width={'100%'}
              height={'100%'}
              loaderId='loaderImg'
              providedClassName='pic'
              src={imgSrcCondition()}
              alt=''
            />
            <p data-for='order-card-tooltip' data-tip={'Deleted'}>
              Deleted
            </p>
          </div>
        )}
      </div>
      <div className='total'>
        <p
          data-for='order-card-tooltip'
          data-tip={parseFloat(order.totalPrice.toFixed(1))}
        >
          {parseFloat(order.totalPrice.toFixed(1))}
        </p>
      </div>
      <div className='paid'>
        <div className={`indicator ${order.isPaid ? 'ok' : ''}`}></div>
      </div>
      <div className='delivered'>
        <div className={`indicator ${order.isDelivered ? 'ok' : ''}`}></div>
      </div>
      <div className='date'>
        <p
          data-for='order-card-tooltip'
          data-tip={format(parseISO(order.createdAt), 'yyyy-MM-dd')}
        >
          {format(parseISO(order.createdAt), 'yyyy-MM-dd')}
        </p>
      </div>
      <div className='actions'>
        <div
          data-tip='See Product'
          data-for='action-info-tooltip'
          className='ActionCont'
        >
          <Link
            onClick={() => {
              const view = document.querySelector('.view')
              if (setDashboardScrollPosition && view) {
                setDashboardScrollPosition(view.scrollTop)
              }
            }}
            to={
              `/dashboard/orders/${order._id}` +
              `${location.search ? location.search : ''}`
            }
            className='actionOption'
            data-for='order-card-tooltip'
          >
            <Gear className='gearImg' />
          </Link>
        </div>

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
      </div>
    </StyledUser>
  )
}

const StyledUser = styled<any>(motion.div)`
  .loadingPrint {
    width: 23px;
    height: 23px;
  }
  #greybackground path {
    stroke: #ffffff !important;
  }
  .notAllowed {
    pointer-events: none !important;
    opacity: 0.8;
  }
  .indicator {
    min-width: 15px;
    min-height: 15px;
    background: #ff6969;
    border-radius: 50%;
    border: 2.7px solid #ff6969;
    transition: 0.2s ease;

    &.ok {
      border: unset;
      min-width: 15px;
      min-height: 15px;
      background: #25da8e;
    }
  }

  .pic {
    height: 50px;
    border-radius: 50%;
    min-width: 50px !important;
  }
  #loaderImg {
    border-radius: 50%;
    height: 50px !important;
    width: 50px !important;
  }
  .actualImg {
    object-fit: cover;
    width: 100%;
    border-radius: 50%;
  }
  &.hide {
    opacity: 0;
  }
  .imgCont {
    min-width: 52px !important;
  }
  .stockCont {
    position: relative;
  }
  .change {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(100%, -30%);
    font-size: calc(0.65rem + 0.3vw);
    color: #25da8e;
    font-weight: 500;
  }
  #deleting {
    cursor: not-allowed !important;
  }

  .ActionCont {
    min-width: 6%;
    display: flex;
    justify-content: flex-start;
    margin-left: calc(0.2rem + 0.35vw);
    &:first-child {
      margin-left: 0;
    }
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

  #loader {
    width: 24px;
    height: 24px;
  }
  .highlightSearch {
    background: #232647a1;
  }

  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #373864;
  padding: 0.65rem 2.1rem;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 1rem;
  }
  border-radius: 10px;
  overflow-x: auto;
  width: 100%;
  .gearCont {
    min-width: 6%;
    display: flex;
    justify-content: flex-start;
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
  .id,
  .user,
  .address,
  .date,
  .total,
  .paid,
  .delivered,
  .actions,
  .inner {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 2vw;
    p {
      color: rgba(255, 255, 255, 0.9) !important;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: calc(0.85rem + 0.3vw);
    }
  }
  .inner {
    max-width: 100%;
    padding-right: 1.1rem;
    transition: 0.2s ease;
    border-radius: 999rem;
    cursor: pointer;
    &:hover {
      background: #3d3e71;
    }
  }
  .gear {
    padding-right: 0.65rem !important;
  }
  .gearImg {
    min-height: 0px;
    width: 23px;
    height: 30px;
  }
  .trash .gearImg {
    width: 21px;
  }
  .id {
    min-width: 12%;
    padding-right: 2vw;
  }
  .user {
    min-width: 20%;
    padding-right: 2vw;
    p {
      margin-left: 0.6rem;
    }
  }

  .date {
    min-width: 18%;
    padding-right: 2vw;
  }
  .total {
    min-width: 14%;
    padding-right: 2vw;
  }
  .paid,
  .delivered {
    min-width: 10%;
    padding-right: 2vw;
    padding-left: 0.1rem;
  }
  .delivered {
    min-width: 12%;
  }
  .actions {
    min-width: 14%;
    padding-right: 2vw;
  }
`

export default memo(OrderDashboard)
