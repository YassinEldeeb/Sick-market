import React from "react"
import styled from "styled-components"
import cart from "../img/cart.svg"
import { Link } from "react-router-dom"

const Cart = ({ cartCount }) => {
  return (
    <StyledCart className='cart' href='/cart'>
      <Link to='/cart'>
        <div className='cartImg'>
          <img src={cart} alt='cart' />
          {cartCount !== 0 && <span className='cart_counter'>{cartCount}</span>}
        </div>
        <h1>Cart</h1>
      </Link>
    </StyledCart>
  )
}
const StyledCart = styled.div`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0.1rem;
    color: white;
    h1 {
      font-weight: 500;
      font-size: calc(0.45rem + 1vw);
    }
    .cartImg {
      position: relative;
      width: calc(1.65rem + 0.8vw);
      margin-right: 0.15rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        z-index: 2;
        position: relative;
        width: 100%;
      }
    }
    .cart_counter {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-43%, -56%);
      color: white;
      pointer-events: none;
      font-weight: 500;
      background: #00b2d8;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.6rem;
      width: 1.6rem;
      font-size: 0.95rem;
      z-index: 1;
    }
  }
  @media screen and (max-width: 1050px) {
    a {
      .cart_counter {
        height: 1.4rem;
        width: 1.4rem;
        font-size: 0.85rem;
      }
      h1 {
        font-size: calc(0.8rem + 1vw);
      }
    }
  }
`

export default Cart
