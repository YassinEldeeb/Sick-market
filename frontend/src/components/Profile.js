import React, { useState } from "react"
import styled from "styled-components"
import arrow from "../img/arrow2.svg"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userLogoutAction, userLogoutAllAction } from "../actions/logout"

const Profile = () => {
  const [dropDown, setDropDown] = useState(false)
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userInfo)
  function truncate(str) {
    return str.length > 11 ? str.substr(0, 11 - 1) + ".." : str
  }
  document.body.addEventListener("click", (e) => {
    e.stopPropagation()
    if (
      !e.target.classList.contains("profilePicImg") &&
      !e.target.classList.contains("profilePic") &&
      !e.target.classList.contains("rank") &&
      !e.target.classList.contains("arrowProfile") &&
      !e.target.classList.contains("name") &&
      !e.target.classList.contains("profile")
    ) {
      if (dropDown) {
        setDropDown(false)
      }
    }
  })

  return (
    <StyledProfile className='profile'>
      {userInfo.user && (
        <div className='profile' onClick={(e) => setDropDown(!dropDown)}>
          <div className='profilePic'>
            <img
              className='profilePicImg'
              src={
                userInfo.user.profilePicLink
                  ? userInfo.user.profilePicLink
                  : `/api/users/profilePic/${userInfo.user._id}`
              }
              alt=''
            />
            {userInfo.user.rank && userInfo.user.rank !== "user" && (
              <div className='rank'>
                <span className='rank'>{userInfo.user.rank}</span>
              </div>
            )}
          </div>
          <h1 className='name'>{truncate(userInfo.user.name)}</h1>
          <img className='arrowProfile' src={arrow} alt='arrow' />
          <div className={`dropMenu ${dropDown ? "active" : ""}`}>
            <div className='account'>
              <h1>Account</h1>
            </div>
            <div
              className='logout'
              onClick={() => dispatch(userLogoutAction())}
            >
              <h1>Logout</h1>
            </div>
            <div
              className='logoutAll'
              onClick={() => dispatch(userLogoutAllAction())}
            >
              <h1>Logout all</h1>
            </div>
          </div>
        </div>
      )}
      {!userInfo.user && (
        <Link to='/login'>
          <h1>Sign in</h1>
        </Link>
      )}
    </StyledProfile>
  )
}
const StyledProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: calc(1.5rem + 0.3vw);
  cursor: pointer;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-weight: 500;
    font-size: calc(0.45rem + 1vw);
    margin-left: calc(0.3rem + 0.1vw);
    color: white;
  }
  .profile {
    h1 {
      font-size: calc(0.35rem + 1vw);
    }
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .arrowProfile {
      margin-left: calc(0.3rem + 0.1vw);
      filter: brightness(1000000%);
      transform: translateY(25%);
    }
    .profilePic {
      width: 48px;
      height: 48px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
      position: relative;
      .rank {
        color: white;
        background: #00b2d8;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 4px;
        font-size: 0.7rem;
        padding: 0.1rem 0.2rem;
        transform: translate(60%, -40%);
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 8%));
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        text-transform: capitalize;
      }
    }
    .dropMenu {
      z-index: 5;
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex-direction: column;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(0, 103%);
      background: #343a40;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
      opacity: 0;
      &.active {
        opacity: 1;
      }
      h1 {
        color: #ffffff;
        margin: 0;
        padding: 0.5rem 0.8rem;
        font-size: calc(0.9rem + 0.1vw);
        font-weight: 400;
        &:hover {
          background: #30363b;
        }
      }
    }
  }
`

export default Profile
