import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Logo from "./Logo"
import Search from "./Search"
import Cart from "./Cart"
import Profile from "./Profile"
import BurgerMenu from "./BurgerMenu"
import { useLocation, Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import PopupMessage from "./PopupMessage"

const Nav = ({ activeMenu, setActiveMenu, cartCount }) => {
  const { user } = useSelector((state) => state.userInfo)
  const status = user.status
  const location = useLocation()
  const history = useHistory()

  const dispatch = useDispatch()
  useEffect(() => {
    if (location.pathname.split("/")[1]) {
      window.scroll({
        top: 0,
        left: 0,
      })
    }
    if (activeMenu) {
      setActiveMenu(false)
    }
  }, [location.pathname, setActiveMenu])

  const [warning, setWarning] = useState(
    localStorage.getItem("showWarning") ? false : true
  )
  const search = location.search.split("=")[1]
  const redirect = search ? search : "/"
  useEffect(() => {
    if (location.pathname.split("/")[1] === "account" && !user.name) {
      history.push(`/login?redirect=${location.pathname.replace("/", "")}`)
    } else if (
      location.pathname === "/account" ||
      location.pathname === "/account/"
    ) {
      history.push("/account/edit-profile")
    }
  }, [location.pathname, activeMenu, setActiveMenu, history, user])

  useEffect(() => {
    dispatch({
      type: "CLEAR_ERRORS",
    })
  }, [location.pathname, dispatch])

  return (
    <>
      {status !== "Verified" &&
        user.name &&
        warning &&
        location.pathname.split("/")[1] !== "verify" &&
        location.pathname.split("/")[1] !== "changeEmail" && (
          <PopupMessage
            setWarning={setWarning}
            desc={
              <p>
                Your Email isn't verified!, You can't order anything unless you
                go to{" "}
                <Link to={`/verify?redirect=${redirect.replace("/", "")}`}>
                  Verify your Email.
                </Link>
              </p>
            }
            title='Alert'
          />
        )}
      {location.pathname.split("/")[1].toLowerCase() !== "dashboard" && (
        <Header>
          <div className='actualNav'>
            <BurgerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <nav>
              <Logo activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
              <Search />
              <Cart cartCount={cartCount} />
              <Profile />
            </nav>
          </div>
        </Header>
      )}
    </>
  )
}
const Header = styled.div`
  position: relative;
  .verifyLink {
    color: #00b2d8;
    text-decoration: underline;
  }
  .danger {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .danger-text {
      padding: 0 calc(1.5rem + 1vw);
      display: flex;
      justify-content: center;
      align-items: center;
      background: #2c3237;
      width: 100%;
      img {
        width: calc(1.2rem + 0.05vw);
        height: calc(1.2rem + 0.05vw);
        margin-right: 0.4rem;
        filter: grayscale(1);
      }
      p {
        font-size: calc(0.75rem + 0.3vw);
        color: white;
        padding: 0.5rem 0;
        a {
          margin-left: 0.2rem;
        }
      }
      svg {
        border-radius: 50%;
        width: calc(1.7em + 0.05vw) !important;
        height: calc(1.7rem + 0.05vw) !important;
        cursor: pointer;
        margin-left: 0.9rem;
        circle {
          fill-opacity: 0.9 !important;
          transition: 0.05s ease;
          fill: #454d55;
        }
        path {
          fill: white;
        }
        &:hover circle {
          fill-opacity: 1 !important;
        }
      }
    }
  }
  position: sticky;
  top: 0;
  z-index: 8;

  .actualNav {
    padding: calc(0.3rem + 1vw) 0;
    width: 100%;
    background: #343a40;
    nav {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      svg {
        cursor: pointer;
        width: calc(10.6rem + 5vw);
      }
    }
    .slidableDiv {
      position: fixed;
      top: 0;
      left: 0;
      transform: translate(0%);
      z-index: 3;
      width: 100%;
      height: 100vh;
    }
  }
  @media screen and (max-width: 1050px) {
    .danger {
      .danger-text {
        p {
          font-size: calc(0.6rem + 0.3vw) !important;
        }
        img {
          width: calc(1.4rem + 0.05vw);
          height: calc(1.4rem + 0.05vw);
        }
        svg {
          width: calc(3rem + 0.05vw) !important;
          height: calc(3rem + 0.05vw) !important;
        }
      }
    }
  }
`

export default Nav
