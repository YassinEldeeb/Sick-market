import React, { useEffect } from "react"
import key from "../img/key.svg"
import orders from "../img/orders.svg"
import settings from "../img/settings.svg"
import edit from "../img/edit.svg"
import { Link, useLocation, useHistory } from "react-router-dom"
import styled from "styled-components"
import Goback from "../components/Goback"
import { useSelector } from "react-redux"

const SlideBar = ({ slider, setSlider }) => {
  const { user } = useSelector((state) => state.userInfo)
  const history = useHistory()
  const location = useLocation().pathname
  const secondLocation = useLocation().pathname.split("/")[2]
  useEffect(() => {
    if (location === "/account" || location === "/account/") {
      history.push("/account/edit-profile")
    }
  }, [location, history])
  useEffect(() => {
    if (slider) setSlider(false)
  }, [location])

  return (
    <StyledSlider className={`${slider ? "active" : ""}`}>
      <Goback toPath='/' providedClassName='goBackSlider' text='Go Home' />
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
      {!user.profilePicLink && user.profilePicLink !== "cleared" && (
        <Link
          className={`link ${
            secondLocation === "change-password" ? "active" : ""
          }`}
          to='change-password'
        >
          <img src={key} alt='key Icon' />
          <h1>Password</h1>
        </Link>
      )}
    </StyledSlider>
  )
}
const StyledSlider = styled.div`
  position: relative;
  z-index: 6;
  .goBackSlider {
    display: inline-flex;
    padding-left: calc(1.7rem + 0.4vw);
    padding-bottom: 1rem;
    border-bottom: 1px solid #f6f6f6;
  }
  display: flex;
  flex-direction: column;
  background: #fff !important;
  box-shadow: 0px 0px 20px rgba(52, 58, 64, 0.12);
  width: max-content;
  padding: calc(0.5rem + 0.4vw) 0;
  overflow-y: scroll;
  flex: 0 1 auto;

  &.active {
    transform: translateX(0%);
  }
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
    .goBackSlider {
      display: none;
    }
    transform: translateX(-100%);
    box-shadow: unset;
    height: 100%;
    position: absolute;
    top: 0%;
    z-index: 7;
    transition: transform 0.3s ease;
    padding-top: calc(8.5vw + 49px);
  }
`

export default SlideBar
