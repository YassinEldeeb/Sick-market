import React, { useEffect } from "react"
import styled from "styled-components"
import { Scrollbars } from "react-custom-scrollbars"
import { useLocation, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

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
  const { user } = useSelector((state) => state.userInfo)

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (user.rank !== "admin") {
      history.push("/")
    }
    if (
      location.pathname.split("/")[1] === "dashboard" &&
      !location.pathname.split("/")[2]
    ) {
      history.push("/dashboard/statistics")
    }
    dashboardUsers.loading = true
    document.querySelector(".content div:first-child").scroll({
      top: 0,
      left: 0,
    })
  }, [location.pathname])
  return (
    <StyledDashboard>
      <div className='sidebar'>
        <Scrollbars className='scrollable'>
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
      <Scrollbars className='content'>{Content}</Scrollbars>
    </StyledDashboard>
  )
}

const StyledDashboard = styled.div`
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
    padding-top: 0;
    padding-top: calc(3rem + 1vh);
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
