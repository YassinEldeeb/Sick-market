import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Logo from "./Logo"
import Search from "./Search"
import Cart from "./Cart"
import Profile from "./Profile"
import BurgerMenu from "./BurgerMenu"
import { useLocation, Link } from "react-router-dom"
import danger from "../img/warningBarIcon.svg"
import { useSelector } from "react-redux"

const Nav = ({ activeMenu, setActiveMenu, cartCount }) => {
  const { user } = useSelector((state) => state.userInfo)
  const status = user ? user.status : "n"
  const location = useLocation()
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
  }, [location.pathname])
  const [warning, setWarning] = useState(
    localStorage.getItem("showWarning") ? false : true
  )

  return (
    <Header>
      {status !== "Verified" && user && (
        <div
          className='danger'
          style={{ display: `${warning ? "all" : "none"}` }}
        >
          <div className='danger-text'>
            <img src={danger} alt='danger' />
            <p>
              Your Email isn't verified!, You can't order or update your profile
              unless you go to{" "}
              <Link className='verifyLink' to='/verify'>
                Verify your Email
              </Link>
            </p>
            <svg
              onClick={() => {
                localStorage.setItem("showWarning", false)
                setWarning(false)
              }}
              viewBox='0 0 91 95'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle
                cx='45.5'
                cy='49.5'
                r='45.5'
                fill='white'
                fillOpacity='0.85'
              />
              <path
                d='M31.3682 66C31.0661 66 30.8962 65.9245 30.8584 65.7734C30.8206 65.6035 30.8395 65.4902 30.915 65.4336L42.5547 50.5088L30.915 35.5557C30.8584 35.499 30.8206 35.4329 30.8018 35.3574C30.8018 35.0931 30.9906 34.9609 31.3682 34.9609H35.5312C36.0033 34.9609 36.3903 35.1592 36.6924 35.5557L45.4717 46.7988L54.2793 35.5557C54.5814 35.1781 54.9684 34.9798 55.4404 34.9609H59.6035C59.9811 34.9609 60.1699 35.0931 60.1699 35.3574C60.1699 35.4329 60.1416 35.499 60.085 35.5557L48.3604 50.5088L60.085 65.4336C60.1416 65.4902 60.1699 65.5563 60.1699 65.6318C60.1699 65.8773 59.9811 66 59.6035 66H55.4404C54.9684 66 54.5814 65.8112 54.2793 65.4336L45.4717 54.2188L36.6924 65.4336C36.3903 65.8112 36.0033 66 35.5312 66H31.3682Z'
                fill='black'
              />
            </svg>
          </div>
        </div>
      )}
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
  )
}
const Header = styled.div`
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
    padding: calc(0.5rem + 1vw) 0;
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
