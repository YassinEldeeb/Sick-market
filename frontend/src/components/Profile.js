import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from '../img/arrow3.svg'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogoutAction, userLogoutAllAction } from '../actions/logout'
import SmoothImg from './smoothImgLoading'

const Profile = () => {
  const [dropDown, setDropDown] = useState(false)
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userInfo)
  function truncate(str = '') {
    return str.length > 15 ? str.substr(0, 15 - 1) + '..' : str
  }
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (!userInfo.user && location.pathname.split('/')[1] === 'account') {
      history.push('/login')
    }
  }, [location.pathname])

  document.body.addEventListener('click', (e) => {
    e.stopPropagation()
    if (
      !e.target.classList.contains('lazyImgLoader') &&
      !e.target.classList.contains('show') &&
      !e.target.classList.contains('loading') &&
      !e.target.classList.contains('profilePicImg') &&
      !e.target.classList.contains('profilePic') &&
      !e.target.classList.contains('rank') &&
      !e.target.classList.contains('arrowProfile') &&
      !e.target.classList.contains('name') &&
      !e.target.classList.contains('profile')
    ) {
      if (dropDown) {
        setDropDown(false)
      }
    }
  })
  const imgSrcCondition = () => {
    if (
      userInfo.user.profilePicLink &&
      userInfo.user.profilePicLink !== 'cleared'
    ) {
      return userInfo.user.profilePicLink
    } else {
      return `http://localhost:5000/api/users/profilePic/${userInfo.user._id}`
    }
  }
  return (
    <StyledProfile className='profile'>
      {userInfo.user.name && (
        <div className='profile' onClick={() => setDropDown(!dropDown)}>
          <div className='profilePic'>
            <div className='profilePicImg'>
              <SmoothImg
                key={userInfo.user._id}
                imgId='profileIMG'
                loaderId={'profileLoading'}
                width={'100%'}
                height={'100%'}
                src={imgSrcCondition()}
                alt=''
                tiny={`http://localhost:5000/api/users/profilePic/tiny/${userInfo.user._id}`}
              />
            </div>
            {userInfo.user.rank && userInfo.user.rank !== 'user' && (
              <div className='rank'>
                <span className='rank'>{userInfo.user.rank}</span>
              </div>
            )}
          </div>
          <h1 className='name'>{truncate(userInfo.user.name)}</h1>

          <Arrow className='arrowProfile' />
          <div className={`dropMenu ${dropDown ? 'active' : ''}`}>
            <div className='account'>
              <Link to='/account/edit-profile'>Account</Link>
            </div>
            {userInfo.user.rank === 'admin' && (
              <div className='account'>
                <Link to='/dashboard'>Dashboard</Link>
              </div>
            )}
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
      {!userInfo.user.name && (
        <Link to='/login'>
          <h1>Sign in</h1>
        </Link>
      )}
    </StyledProfile>
  )
}
const StyledProfile = styled.div`
  .dropDown {
    max-height: 50vh;
    overflow-y: auto;
  }
  #profileIMG {
    width: 48px;
    height: 48px;
    object-fit: cover;
  }
  .profilePicImg {
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
  #profileLoading {
    border-radius: 50%;
  }
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
      position: relative;
      transition: 0.02s ease;
      margin-left: 0.3rem;
      transform: translateY(9%);
      width: 13px;
      height: 13px;
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
        border-radius: 3px;
        font-size: 0.65rem;
        padding: 0.1rem 0.2rem;
        transform: translate(60%, -40%);
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        text-transform: capitalize;
        z-index: 2;
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
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
      display: none;

      &.active {
        display: block;
      }
      h1,
      a {
        color: #ffffff;
        margin: 0;
        padding: 0.5rem 0.8rem;
        font-size: calc(0.9rem + 0.1vw);
        font-weight: 400;
        &:first-child {
          margin-top: 0.15rem;
        }
        &:hover {
          background: #2f353a;
        }
      }
      a {
        display: flex;
        justify-content: flex-start;
      }
    }
  }
`

export default Profile
