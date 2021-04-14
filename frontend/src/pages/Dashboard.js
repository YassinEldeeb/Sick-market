import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLastLocation } from 'react-router-last-location'
import { v4 as uuid } from 'uuid'
import statistics from '../img/statistics.svg'
import orders from '../img/cartD.svg'
import categories from '../img/categories.svg'
import GeoMap from '../img/world.svg'
import Products from '../img/products.svg'
import discounts from '../img/discounts.svg'
import employees from '../img/employees.svg'
import customers from '../img/customers.svg'
import chat from '../img/chat.svg'
import emails from '../img/emails.svg'
import home from '../img/home.svg'

import DashboardTab from '../components/DashboardTab'
import DashboardCustomers from './DashboardCustomers'
import DashboardProducts from './DashboardProducts'
import socket from '../clientSocket/socket'

const Dashboard = ({ pageContent }) => {
  const dispatch = useDispatch()
  const lastLocation = useLastLocation()

  const main = [
    { text: 'Statistics', i: statistics },
    { text: 'Orders', i: orders },
    { text: 'Categories', i: categories },
    { text: 'GeoMap', i: GeoMap },
    { text: 'Products', i: Products },
    { text: 'Discounts', i: discounts },
    { text: 'Employees', i: employees },
    { text: 'Customers', i: customers },
  ]
  main.forEach((e) => (e.active = e.text.toLowerCase() === pageContent))
  const communicate = [
    { text: 'Notify', i: chat },
    { text: 'Emails', i: emails },
  ]

  let Content
  const pageSort = () => {
    switch (pageContent) {
      case 'customers':
        Content = <DashboardCustomers />
        break
      case 'products':
        Content = <DashboardProducts />
        break
    }
  }
  pageSort()

  const dashboardUsers = useSelector((state) => state.dashboardUsers)
  const userActions = useSelector((state) => state.userActions)
  const { user } = useSelector((state) => state.userInfo)
  const productList = useSelector((state) => state.productList)

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const firstChild = document.querySelector('.view')

    if (!location.pathname.split('/')[3]) {
      if (!lastLocation || !lastLocation.pathname.split('/')[3])
        firstChild.scroll({
          top: 0,
        })
    }

    if (user.rank !== 'admin') {
      history.push('/')
    }
    if (
      location.pathname.split('/')[1] === 'dashboard' &&
      !location.pathname.split('/')[2]
    ) {
      history.push('/dashboard/statistics')
    }
    if (
      !location.pathname.split('/')[3] && lastLocation
        ? !lastLocation.pathname.split('/')[3]
        : false
    ) {
      dashboardUsers.loading = true

      const content = document.querySelector('.view')
      if (content)
        content.scroll({
          top: 0,
          left: 0,
        })
    } else if (lastLocation ? lastLocation.pathname.split('/')[3] : false) {
      userActions.loading = true
    }
  }, [location.pathname, lastLocation])

  useEffect(() => {
    const dashboardTabs = document.querySelector('.view2')
    if (dashboardTabs)
      dashboardTabs.scroll({
        top: 0,
        left: 0,
      })
  }, [])

  useEffect(() => {
    if (
      lastLocation
        ? lastLocation.pathname.split('/')[1] !== 'products'
        : true || location.pathname.split('/')[1] !== 'products'
    ) {
      if (
        location.pathname.split('/')[2] !== 'products' ||
        (lastLocation
          ? lastLocation.pathname.split('/')[2] !== 'products'
          : false &&
            location.pathname.split('/')[2] !== 'products' &&
            !location.pathname.split('/')[3])
      ) {
        productList.loading = true
        productList.success = false
        productList.newError = null
      }
    }

    if (location.pathname.split('/')[3] === 'add') {
      const firstChild = document.querySelector('.view')
      if (firstChild) firstChild.style.overflowY = 'hidden !important'
    }
  }, [location.pathname])

  useEffect(() => {
    socket.on('NewUser', () => {
      dispatch({
        type: 'NEW_DASHBOARD_USERS',
      })
    })
    socket.on('ProductAdded', () => {
      dispatch({
        type: 'NEW_DASHBOARD_PRODUCT',
      })
    })
  }, [])

  return (
    <StyledDashboard>
      <div className='sidebar'>
        <Scrollbars
          renderView={(props) => <div {...props} className='view2' />}
          className='scrollable dashboardTabs'
        >
          <DashboardTab
            providedClassName='backHome'
            text={'Home'}
            icon={home}
          />
          <p>Main</p>
          {main.map((e) => (
            <DashboardTab
              key={uuid()}
              text={e.text}
              icon={e.i}
              active={e.active ? e.active : false}
            />
          ))}
          <p className='last'>Communicate</p>
          {communicate.map((e) => (
            <DashboardTab
              key={uuid()}
              text={e.text}
              icon={e.i}
              active={e.active ? e.active : false}
            />
          ))}
        </Scrollbars>
      </div>
      <Scrollbars
        renderTrackHorizontal={(props) => (
          <div {...props} className='track-horizontal' />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className='track-vertical' />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className='thumb-horizontal' />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className='thumb-vertical' />
        )}
        renderView={(props) => <div {...props} className='view' />}
        className='content large-scrollable-content'
        marginWidth='-20px'
        marginHeight='-20px'
      >
        {Content}
      </Scrollbars>
    </StyledDashboard>
  )
}

const StyledDashboard = styled.div`
  .view,
  .view2 {
    height: 100% !important;
    overflow: auto !important;
    position: absolute;
    inset: 0px;
    margin-right: -8px;
    margin-bottom: -8px;
  }
  .thumb-horizontal {
    position: relative;
    display: block;
    height: 100%;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.2);
    width: 0px;
  }
  .track-horizontal {
    position: absolute;
    height: 6px;
    right: 2px;
    bottom: 2px;
    left: 2px;
    border-radius: 3px;
  }

  .track-vertical {
    position: absolute;
    width: 6px;
    right: 2px;
    bottom: 2px;
    top: 2px;
    border-radius: 3px;
  }
  .thumb-vertical {
    position: relative;
    display: block;
    width: 100%;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.2);
    height: 135px;
    transform: translateY(0px);
  }
  .preventScrolling {
    overflow-y: hidden !important;
  }
  .backHome {
    padding: calc(0.45rem + 0.3vw) calc(1rem + 0.3vw);
    margin-top: calc(1.5rem + 1vh);
    padding-left: calc(2.25rem + 0.3vw);
  }
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex: 1 1 auto;
  overflow-y: auto;
  height: 0px;

  p {
    padding: calc(0.1rem + 0.1vw) calc(2.25rem + 0.3vw);
    font-size: calc(0.85rem + 0.3vw);
    color: rgba(255, 255, 255, 19%);
    &.last {
      padding-top: calc(0.1rem + 0.1vw);
    }
  }
  .scrollable {
    padding-right: calc(0.8rem + 0.3vw);
    div:first-child {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .sidebar {
    position: relative;
    background: linear-gradient(280deg, #373965, #2a2b4a);
    font-family: 'Poppins', sans-serif;
    color: white;
    min-width: calc(255px + 3vw);
  }
  .content {
    flex: 1 1 auto;
    background: linear-gradient(280deg, #1b203d, #1f203e);
    overflow-y: auto;
    color: white;
  }
  .title {
    font-weight: 500;
  }
`

export default Dashboard
