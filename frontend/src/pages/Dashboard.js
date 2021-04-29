import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { useLocation, useHistory, Switch, Route } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useLastLocation } from 'react-router-last-location'
import { ReactComponent as Statistics } from '../img/statistics.svg'
import { ReactComponent as Orders } from '../img/cartD.svg'
import { ReactComponent as Categories } from '../img/categories.svg'
import { ReactComponent as GeoMap } from '../img/world.svg'
import { ReactComponent as Products } from '../img/products.svg'
import { ReactComponent as Discounts } from '../img/discounts.svg'
import { ReactComponent as Employees } from '../img/employees.svg'
import { ReactComponent as Customers } from '../img/customers.svg'
import { ReactComponent as Chat } from '../img/chat.svg'
import { ReactComponent as Emails } from '../img/emails.svg'
import { ReactComponent as Home } from '../img/home.svg'

import DashboardTab from '../components/DashboardTab'
import DashboardCustomers from './DashboardCustomers'
import DashboardProducts from './DashboardProducts'
import { useRef } from 'react'
import Meta from '../components/Meta'
import Product from '../components/Product'

const main = [
  { text: 'Statistics', i: <Statistics /> },
  { text: 'Orders', i: <Orders /> },
  { text: 'Categories', i: <Categories /> },
  { text: 'GeoMap', i: <GeoMap /> },
  { text: 'Products', i: <Products /> },
  { text: 'Discounts', i: <Discounts /> },
  { text: 'Employees', i: <Employees /> },
  { text: 'Customers', i: <Customers /> },
]

const communicate = [
  { text: 'Notify', i: <Chat /> },
  { text: 'Emails', i: <Emails /> },
]

const Dashboard = ({ setDashboardScrollPosition, dashboardScrollPosition }) => {
  const scrollRef = useRef(null)
  const lastLocation = useLastLocation()
  const location = useLocation()

  const dashboardUsers = useSelector((state) => state.dashboardUsers)
  const userActions = useSelector((state) => state.userActions)
  const { user } = useSelector((state) => state.userInfo)
  const productList = useSelector((state) => state.productList)

  const history = useHistory()

  useEffect(() => {
    const firstChild = document.querySelector('.view')

    if (!location.pathname.split('/')[3]) {
      if ((!lastLocation || !lastLocation.pathname.split('/')[3]) && firstChild)
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
            Icon={<Home />}
          />
          <p>Main</p>
          {main.map((e) => (
            <DashboardTab text={e.text} Icon={e.i} />
          ))}
          <p className='last'>Communicate</p>
          {communicate.map((e) => (
            <DashboardTab text={e.text} Icon={e.i} />
          ))}
        </Scrollbars>
      </div>
      <Scrollbars
        ref={scrollRef}
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
        renderView={(props) => <div {...props} className='view' id='view' />}
        className='content large-scrollable-content'
        marginWidth='-20px'
        marginHeight='-20px'
      >
        <Switch>
          <Route path='/dashboard/customers'>
            <DashboardCustomers />
          </Route>
          <Route path='/dashboard/products'>
            <DashboardProducts
              scrollRef={scrollRef}
              dashboardScrollPosition={dashboardScrollPosition}
              setDashboardScrollPosition={setDashboardScrollPosition}
            />
          </Route>
        </Switch>
      </Scrollbars>
      <Meta
        ogTitle={'Dashboard - Sick Market'}
        title={'Dashboard - Sick Market'}
      />
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
