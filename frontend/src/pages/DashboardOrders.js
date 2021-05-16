import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader'
import DashboardError from '../components/DashboardError'
import { AnimatePresence, motion } from 'framer-motion'
import { hide } from '../animations'
import { useHistory, useLocation } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import { throttle } from 'underscore'
import ConfirmPopup from '../components/confirmPopup'
import { ReactComponent as SmallX } from '../img/smallX.svg'
import { ReactComponent as Search } from '../img/searchIcon.svg'
import { ReactComponent as Sort } from '../img/sort.svg'
import { v4 as uuid } from 'uuid'
import { useRef } from 'react'
import qs from 'qs'
import { useInView } from 'react-intersection-observer'
import getDashboardOrdersAction from '../actions/getDashboardOrders'
import OrderDashboard from '../components/dashboardOrder'
import DashboardOrderActions from './DashboardOrderActions'

const DashboardOrders = () => {
  const dispatch = useDispatch()
  const lastLocation = useLastLocation()
  const [scrolled, setScrolled] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const container = document.querySelector('.view')
    if (container) {
      container.addEventListener(
        'scroll',
        throttle(() => {
          setScrolled(container.scrollTop)
        }, 100)
      )
    }
    if (!location.pathname.split('/')[3]) {
      dispatch(getDashboardOrdersAction())
    }
  }, [])
  useEffect(() => {
    if (
      !location.pathname.split('/')[3] &&
      !orders &&
      lastLocation &&
      lastLocation.pathname.split('/')[3]
    ) {
      dispatch(getDashboardOrdersAction())
    }
    const container = document.querySelector('#view')

    if (container) {
      if (location.pathname.split('/')[3]) {
        container.classList.add('preventScrolling')
      } else {
        container.classList.remove('preventScrolling')
      }
    }
  }, [location.pathname])

  const { orders, loading, count, error } = useSelector(
    (state) => state.dashboardOrders
  )
  const { order, loading: orderLoading } = useSelector(
    (state) => state.orderActions
  )

  return (
    <StyledOrders>
      <DashboardOrderActions scrolled={scrolled} setScrolled={setScrolled} />

      {error ? (
        <DashboardError error={error} />
      ) : (loading && !location.pathname.split('/')[3]) ||
        (orderLoading && location.pathname.split('/')[3] && !orders) ? (
        <Loader />
      ) : orders ? (
        <>
          <div className='title'>
            <h1>Orders</h1>
            <p>{count} Orders Found</p>
          </div>

          <div className='headers'>
            <div className='id'>
              <p>Id</p>
            </div>
            <div className='user'>
              <p>User</p>
            </div>

            <div className='total'>
              <p>Total</p>
            </div>
            <div className='paid'>
              <p>Paid</p>
            </div>
            <div className='delivered'>
              <p>Delivered</p>
            </div>
            <div className='date'>
              <p>Date</p>
            </div>
            <div className='actions'>
              <p>Actions</p>
            </div>
          </div>
          <motion.div
            variants={hide}
            initial='hidden'
            animate='show'
            exit='exit'
          >
            {orders.map((each) => (
              <OrderDashboard order={each} />
            ))}
          </motion.div>
        </>
      ) : (
        ''
      )}
    </StyledOrders>
  )
}

const StyledOrders = styled(motion.div)`
  overflow-x: hidden;
  overflow-y: hidden;
  height: max-content;
  min-height: 100%;
  padding: calc(3rem + 0.5vh) calc(2.5rem + 0.5vh);
  padding-bottom: 1rem;
  p {
    padding: 0 !important;
  }

  #greybackground path {
    stroke: #363761 !important;
  }
  .headers {
    background: rgba(51, 52, 92, 31%);
    padding: 0.5rem 2.1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .id,
    .user,
    .address,
    .date,
    .total,
    .paid,
    .delivered,
    .actions {
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
    .user {
      min-width: 20%;
      padding-right: 2vw;
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
    }
    .delivered {
      min-width: 12%;
    }
    .actions {
      min-width: 14%;
      padding-right: 2vw;
    }
  }
  .title {
    margin-bottom: 1rem;
    h1 {
      font-weight: 500;
      font-size: calc(2.1rem + 0.3vw);
    }
    p {
      color: rgba(255, 255, 255, 0.7) !important;
      font-weight: 400;
    }
  }
`

export default DashboardOrders
