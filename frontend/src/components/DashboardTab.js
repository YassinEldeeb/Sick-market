import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DashboardTab = ({ text, icon, active, providedClassName }) => {
  const { newUsers } = useSelector((state) => state.dashboardUsers)
  const { newProducts } = useSelector((state) => state.productList)

  return (
    <Tab
      to={providedClassName ? '/' : `/dashboard/${text.toLowerCase()}`}
      className={`${active ? 'active' : ''} ${
        providedClassName ? providedClassName : ''
      }`}
    >
      <img src={icon} alt='icon' />
      <h4>{text}</h4>
      {text === 'Customers' && newUsers > 0 && (
        <h6 className='counter'>{newUsers}</h6>
      )}
      {text === 'Products' && newProducts > 0 && (
        <h6 className='counter'>{newProducts}</h6>
      )}
    </Tab>
  )
}

const Tab = styled(Link)`
  .counter {
    position: absolute;
    right: 0%;
    top: 50%;
    background: #2fa3e3;
    padding: 0.3rem;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    font-size: 0.7rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);
  }
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: calc(0.5rem + 0.3vw) calc(2.25rem + 0.3vw);
  padding-right: calc(6rem + 0.3vw);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  margin: 0.2rem 0;
  width: 89%;
  &.active {
    background: #3e3f6f;
  }
  img {
    width: 26px;
    height: 26px;
  }
  transition: 0.2s ease;
  &:not(.active):hover {
    background: rgba(62, 63, 111, 0.3);
  }
  h4 {
    font-weight: 500;
    padding-left: 0.6rem;
    font-size: calc(0.85rem + 0.3vw);
  }
  &:last-child {
    padding-bottom: calc(1.3rem + 0.3vw);
  }
`

export default DashboardTab
