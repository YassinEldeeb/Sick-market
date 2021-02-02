import React, { useEffect } from "react"
import key from "../img/key.svg"
import orders from "../img/orders.svg"
import settings from "../img/settings.svg"
import edit from "../img/edit.svg"
import { Link, useLocation, useHistory } from "react-router-dom"
import styled from "styled-components"

const SlideBar = ({ slider, setSlider }) => {
  const history = useHistory()
  const location = useLocation().pathname.split("/")[1]
  const secondLocation = useLocation().pathname.split("/")[2]
  useEffect(() => {
    if (location === "account") {
      history.push("/account/edit-profile")
    }
  }, [location])
  return (
    <StyledSlider>
      <Link
        className={`link ${secondLocation === "edit-profile" ? "active" : ""}`}
        to='edit-profile'
      >
        <img src={edit} alt='edit Icon' />
        <h1>Edit Profile</h1>
      </Link>
      <Link
        className={`link ${secondLocation === "orders" ? "active" : ""}`}
        to='orders'
      >
        <img src={orders} alt='orders Icon' />
        <h1>My Orders</h1>
      </Link>
      <Link
        className={`link ${
          secondLocation === "account-settings" ? "active" : ""
        }`}
        to='account-settings'
      >
        <img src={settings} alt='gear Icon' />
        <h1>Account Settings</h1>
      </Link>
      <Link
        className={`link ${
          secondLocation === "change-password" ? "active" : ""
        }`}
        to='change-password'
      >
        <img src={key} alt='key Icon' />
        <h1>Password</h1>
      </Link>
    </StyledSlider>
  )
}
const StyledSlider = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff !important;
  box-shadow: 0px 0px 20px rgba(52, 58, 64, 0.12);
  width: max-content;
  padding: calc(0.5rem + 0.4vw) 0;
  position: fixed;
  height: 100%;
  z-index: 7;

  .link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: calc(1.1rem + 0.4vw) calc(1.7rem + 0.4vw);
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.035);
    &:last-child {
      border-bottom: unset;
    }
    &.active {
      border-left: 3px solid #00b2d8;
      background: #f7f7f7;
    }
    &:hover {
      background: #f7f7f7;
    }
    img {
      width: calc(1.4rem + 0.3vw);
      height: calc(1.4rem + 0.3vw);
    }
    h1 {
      color: #1a1a1a;
      font-weight: 500;
      font-size: calc(0.85rem + 0.3vw);
      padding-left: 0.6rem;
    }
  }
  @media screen and (max-width: 1050px) {
    transform: translateX(-100%);
    box-shadow: unset;
    left: 0;
  }
`

export default SlideBar
