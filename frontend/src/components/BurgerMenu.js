import React, { useState } from "react"
import styled from "styled-components"
import flag from "../img/flag.svg"
import dollar from "../img/dolar.svg"
import lang from "../img/lang.svg"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userLogoutAction, userLogoutAllAction } from "../actions/logout"
import falseSVG from "../img/false.svg"
import trueSVG from "../img/true.svg"

const BurgerMenu = ({ activeMenu, setActiveMenu }) => {
  const dispatch = useDispatch()
  function truncate(str = "") {
    return str.length > 13 ? str.substr(0, 13 - 1) + ".." : str
  }
  const userInfo = useSelector((state) => state.userInfo)
  const [check, setCheck] = useState(false)
  const bgIdentify = () => (check ? trueSVG : falseSVG)

  const imgSrcCondition = () => {
    if (
      userInfo.user.profilePicLink &&
      userInfo.user.profilePicLink !== "cleared"
    ) {
      return userInfo.user.profilePicLink
    } else {
      return `/api/users/profilePic/${userInfo.user._id}`
    }
  }
  return (
    <StyledMenu
      bg={bgIdentify()}
      className={`allBoxModel ${activeMenu ? "active" : ""}`}
      onClick={(e) => {
        if (e.target.classList.contains("allBoxModel") && activeMenu)
          setActiveMenu(!activeMenu)
      }}
    >
      <div className='shadowDiv'>
        <div className='profileStatus'>
          {userInfo.user.name && (
            <div className='profile-mobile'>
              <div className='profile-mobile-pic'>
                <img src={imgSrcCondition()} alt='' />
              </div>
              <div className='profile-desc-mobile'>
                <h1>{truncate(userInfo.user.name)}</h1>
                {userInfo.user.rank !== "user" && (
                  <div className='rank-mobile'>
                    <h1>{userInfo.user.rank}</h1>
                  </div>
                )}
              </div>
            </div>
          )}
          {!userInfo.user.name && (
            <div className='signInSection'>
              <Link to='/login'>Sign in</Link>
            </div>
          )}
          <div className='signInChildren'>
            <h4>
              <Link to='/'>Home</Link>
            </h4>
            <h4>
              <Link to='/account'>Account</Link>
            </h4>
            <h4>Categories</h4>
          </div>
          <div className='settingsSection'>
            <h1>Settings</h1>
          </div>
          <div className='settingsChildren'>
            <div className='settingChild'>
              <img src={flag} alt='country' />
              <h4>Egypt</h4>
            </div>
            <div className='settingChild'>
              <img src={lang} alt='USA flag' />
              <h4>English</h4>
            </div>
            <div className='settingChild'>
              <img src={dollar} alt='dollar' />
              <h4>EGP</h4>
            </div>
          </div>
        </div>
        {userInfo.token && (
          <div className='logout'>
            <h1
              onClick={() => {
                check
                  ? dispatch(userLogoutAllAction())
                  : dispatch(userLogoutAction())
              }}
            >
              Logout
            </h1>
            <div className='check'>
              <input value={check} type='checkbox' id='radio' />
              <label onClick={() => setCheck(!check)} htmlFor='radio'>
                all Users
              </label>
            </div>
          </div>
        )}
      </div>
    </StyledMenu>
  )
}
const StyledMenu = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  height: 100vh;
  transform: translate(-100%);
  transition: transform 0.3s ease;
  &.active {
    transition: background 0.3s ease 0.2s, transform 0.3s ease;
    background: rgba(0, 0, 0, 0.35);
    transform: translate(0%);
  }

  .shadowDiv {
    display: flex;
    flex-direction: column;
    .profile-mobile {
      transform: translate(-2%, 0);
      margin-bottom: calc(1rem + 0.5vh);
      margin-top: 0.2vh;
      display: flex;
      .profile-mobile-pic {
        width: 66px;
        height: 66px;
        img {
          border-radius: 50%;
          height: 100%;
          width: 100%;
        }
      }
      .profile-desc-mobile {
        margin-left: 0.45rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        h1 {
          font-weight: 500;
          font-size: calc(1.4rem + 0.1vw);
        }
      }
      .rank-mobile {
        margin-top: 0.1rem;
        background: #00b2d8;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        box-shadow: 0 2 4px rgba(0, 0, 0, 0.5);
        h1 {
          font-weight: 400;
          font-size: 0.75rem;
          padding: 0.15rem 0.25rem;
        }
      }
    }
    padding-top: calc(3.5rem + 1vh);
    z-index: 11;
    height: 100vh;
    width: 78% !important;
    background: #343a40;
    color: white;
    padding-left: 7vw;
    overflow-y: scroll;
    .settingsSection {
      padding-top: calc(1rem + 0.5vh);
    }
    .signInSection,
    .settingsSection {
      margin-bottom: calc(1rem + 1vw);
      a,
      h1 {
        white-space: nowrap;
        font-weight: 500;
        padding-bottom: 1vw;
        border-bottom: 3px solid rgba(231, 231, 231, 0.05);
        display: inline-block;
        font-size: calc(1.8rem + 1vw);
      }
    }
    .signInChildren h4,
    .settingsChildren h4 {
      font-weight: 400;
      font-size: calc(1.1rem + 1vw);
      color: #f1f1f1;
      white-space: nowrap;
    }
    .signInChildren h4 {
      margin-bottom: calc(0.7rem + 1vh);
    }
    .signInChildren h4:last-child {
      margin-bottom: 0;
    }
    .settingChild {
      display: flex;
      margin-bottom: calc(0.7rem + 1vh);
      justify-content: center;
      align-items: center;
      img {
        width: 25px;
        height: 25px;
      }
      h4 {
        padding-left: 0.5rem;
        white-space: nowrap;
      }
    }
    .signInChildren,
    .settingsChildren {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
    }
    .logout {
      flex: 1 1 auto;
      display: flex;
      align-items: flex-end;
      margin-bottom: calc(1.7rem + 0.5vh);
      .check {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1rem;
        input {
          display: none;
        }
        label {
          margin-left: 0.2rem;
          position: relative;
          ::after {
            content: "";
            background: url(${(props) => props.bg});
            transform: translate(100%, -30%);
            position: absolute;
            right: 0;
            top: 0;
            display: block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-size: cover;
          }
        }
      }
      h1 {
        font-weight: 400;
        font-size: calc(1rem + 1vw);
        color: #ff6969;
      }
    }
    @media screen and (min-width: 1050px) {
      display: none;
    }
    @media screen and (max-height: 650px) and (max-width: 1050px) {
      .profileStatus {
        .signInSection,
        .settingsSection {
          margin-bottom: calc(1rem + 1vw);
          a,
          h1 {
            font-size: calc(1.25rem + 1vw) !important;
          }
        }
        .signInChildren h4 {
          font-size: calc(0.8rem + 1vw) !important;
        }
        .settingChild h4 {
          font-size: calc(0.8rem + 1vw) !important;
        }
      }
      .logout h1 {
        font-size: calc(0.8rem + 1vw) !important;
      }
      .check label {
        font-size: calc(0.6rem + 1vw) !important;
      }
      width: 65% !important;
      .profile-mobile-pic {
        width: 56px !important;
        height: 56px !important;
      }
      .profile-desc-mobile h1 {
        font-size: calc(1.25rem + 0.1vw) !important;
      }
      .rank-mobile h1 {
        font-size: 0.6rem !important;
        padding: 0.1rem 0.2rem !important;
      }
    }
  }
`

export default BurgerMenu
