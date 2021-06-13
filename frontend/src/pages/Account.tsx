import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Switch, Route, useLocation } from 'react-router-dom'
import EditProfile from './edit-profile'
import MyOrders from './MyOrders'
import ChangePassword from './changePassword'
import SlideBar from '../components/slidebar'
import { useState } from 'react'

const Account = () => {
  const location = useLocation()
  const [slider, setSlider] = useState(false)
  useEffect(() => {
    setSlider(false)
  }, [location.pathname])
  return (
    <StyledAccount
      classList='slider-shadow'
      onClick={(e: any) => {
        if (e.target.classList.contains('slider-shadow') && slider)
          setSlider(false)
      }}
    >
      <SlideBar slider={slider} setSlider={setSlider} />
      <div className='slider-Burger' onClick={() => setSlider(!slider)}>
        <span
          className={`first-slider-burger ${slider ? 'active' : ''}`}
        ></span>
        <span
          className={`third-slider-burger ${slider ? 'active' : ''}`}
        ></span>
      </div>

      <Switch>
        <Route path='/account/edit-profile'>
          <EditProfile />
        </Route>
        <Route path='/account/orders'>
          <MyOrders />
        </Route>
        <Route path='/account/account-settings'></Route>
        <Route path='/account/change-password'>
          <ChangePassword />
        </Route>
      </Switch>
      <div
        className='slider-shadow'
        style={{
          pointerEvents: `${slider ? 'all' : 'none'}`,
          background: `${slider ? 'rgba(0, 0, 0, 0.2)' : 'unset'}`,
        }}
      ></div>
    </StyledAccount>
  )
}
const StyledAccount = styled.div<any>`
  height: 0px;
  position: relative;
  display: flex;
  flex: 1 1 auto;
  .first-slider-burger.active {
    transform: translate(0%, 142%) rotate(-135deg);
  }
  .third-slider-burger.active {
    transform: translate(0%, -140%) rotate(135deg);
  }
  .slider-Burger {
    z-index: 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: max-content;
    margin-left: 5vw;
    margin-top: 5vw;
    background: #1a1a1a;
    padding: 1rem 0.5rem;
    width: 49px;
    height: 49px;
    border-radius: 50%;
    span {
      width: 1.8rem !important;
      height: 0.18rem !important;
      margin: 0.18rem 0 !important;
      background: white;
      border-radius: 1px;
      transition: 0.3s ease;
    }
  }
  .slider-Burger {
    display: none;
    cursor: pointer;
  }
  .slider-shadow {
    display: none;
  }
  @media screen and (max-width: 1050px) {
    flex-direction: column;

    .slider-Burger {
      display: flex;
    }
    .slider-shadow {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      transition: 0.3s ease 0.15s;
    }
  }
`

export default Account
