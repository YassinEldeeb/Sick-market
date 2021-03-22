import React, { useEffect } from "react"
import styled from "styled-components"
import { Scrollbars } from "react-custom-scrollbars"
import { useLocation, useHistory, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useLastLocation } from "react-router-last-location"
import arrow from "../img/gobackArrow.svg"

import statistics from "../img/statistics.svg"
import orders from "../img/cartD.svg"
import categories from "../img/categories.svg"
import GeoMap from "../img/world.svg"
import Products from "../img/products.svg"
import discounts from "../img/discounts.svg"
import employees from "../img/employees.svg"
import customers from "../img/customers.svg"
import chat from "../img/chat.svg"
import emails from "../img/emails.svg"

import DashboardTab from "../components/DashboardTab"
import DashboardCustomers from "./DashboardCustomers"

const Dashboard = ({ pageContent }) => {
  const lastLocation = useLastLocation()

  const main = [
    { text: "Statistics", i: statistics },
    { text: "Orders", i: orders },
    { text: "Categories", i: categories },
    { text: "GeoMap", i: GeoMap },
    { text: "Products", i: Products },
    { text: "Discounts", i: discounts },
    { text: "Employees", i: employees },
    { text: "Customers", i: customers },
  ]
  main.forEach((e) => (e.active = e.text.toLowerCase() === pageContent))
  const communicate = [
    { text: "Chat", i: chat },
    { text: "Emails", i: emails },
  ]

  let Content
  const pageSort = () => {
    switch (pageContent) {
      case "customers":
        Content = <DashboardCustomers />
        break
    }
  }
  pageSort()

  const dashboardUsers = useSelector((state) => state.dashboardUsers)
  const userActions = useSelector((state) => state.userActions)
  const { user } = useSelector((state) => state.userInfo)

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const firstChild = document.querySelector(
      ".large-scrollable-content div:first-child"
    )
    if (!firstChild.classList.contains("addMoreMargin")) {
      firstChild.classList.add("addMoreMargin")
    }
    if (!location.pathname.split("/")[3]) {
      if (!lastLocation || !lastLocation.pathname.split("/")[3])
        firstChild.scroll({
          top: 0,
        })
    }

    if (user.rank !== "admin") {
      history.push("/")
    }
    if (
      location.pathname.split("/")[1] === "dashboard" &&
      !location.pathname.split("/")[2]
    ) {
      history.push("/dashboard/statistics")
    }
    if (
      !location.pathname.split("/")[3] && lastLocation
        ? !lastLocation.pathname.split("/")[3]
        : false
    ) {
      dashboardUsers.loading = true

      document.querySelector(".content div:first-child").scroll({
        top: 0,
        left: 0,
      })
    } else if (lastLocation ? lastLocation.pathname.split("/")[3] : false) {
      userActions.loading = true
    }
  }, [location.pathname, lastLocation])

  return (
    <StyledDashboard>
      <div className='sidebar'>
        <Scrollbars className='scrollable'>
          <Link to='/' className='backHome'>
            <img src={arrow} alt='' />
            <h6>Home</h6>
          </Link>
          <p>Main</p>
          {main.map((e) => (
            <DashboardTab
              text={e.text}
              icon={e.i}
              active={e.active ? e.active : false}
            />
          ))}
          <p className='last'>Communicate</p>
          {communicate.map((e) => (
            <DashboardTab
              text={e.text}
              icon={e.i}
              active={e.active ? e.active : false}
            />
          ))}
        </Scrollbars>
      </div>
      <Scrollbars className='content large-scrollable-content'>
        {Content}
      </Scrollbars>
    </StyledDashboard>
  )
}

const StyledDashboard = styled.div`
  .addMoreMargin {
    margin-bottom: -20px !important;
  }
  .backHome {
    display: flex !important;
    align-items: center !important;
    flex-direction: row !important;
    padding: calc(0.45rem + 0.3vw) calc(1.05rem + 0.3vw);
    margin-top: calc(1.5rem + 1vh);
    margin-bottom: calc(0.55rem + 0.2vh);
    cursor: pointer;
    background: rgba(62, 63, 111, 0.3);
    margin-left: calc(2.25rem + 0.3vw);
    border-radius: 10px;
    transition: 0.2s ease;
    &:hover {
      background: rgba(62, 63, 111, 0.157);
    }
    h6 {
      font-weight: 500;
      padding-left: 0.5rem;
      font-size: calc(0.85rem + 0.3vw);
    }
    img {
      width: 9px;
      filter: brightness(100000);
    }
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
    font-family: "Poppins", sans-serif;
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
