import React, { useEffect } from "react"
import styled from "styled-components"
import { useLocation, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import CheckoutSteps from "../components/CheckoutSteps"
import PlaceOrderItem from "../components/PlaceOrderItem"

const PlaceOrder = () => {
  function truncate(str) {
    return str.length > 30 ? str.substr(0, 30 - 1) + ".." : str
  }
  const { address, cartItems, paymentMethod } = useSelector(
    (state) => state.cart
  )
  const { user } = useSelector((state) => state.userInfo)

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (
      location.pathname.split("/")[1].toLocaleLowerCase() === "placeorder" &&
      !user.name
    ) {
      history.push("/login?redirect=placeOrder")
    }
  }, [history, location, user])

  useEffect(() => {
    if (!cartItems.length || !address.display_address) {
      history.push("/cart")
    }
  }, [cartItems, address.display_address])

  useEffect(() => {
    if (!cartItems.length) {
      history.push("/cart")
    }
  }, [cartItems])

  const pricesArr = cartItems.map((each) => each.price * each.qty)
  const totalPrice = pricesArr.reduce((acc, item) => acc + item).toFixed(2)

  const toFixedFN = (num) => {
    return Number(num).toFixed(2)
  }
  return (
    <StyledPlaceOrder>
      <CheckoutSteps step1 step2 step3 step4 current='step4' />
      <div className='content'>
        <div className='summary'>
          <div className='shipping-section section'>
            <h1>Shipping :</h1>
            <p>Address: {address.display_address}</p>
          </div>
          <div className='payment-section section'>
            <h1>Payment Method :</h1>
            <p>Method: {paymentMethod}</p>
          </div>
          <div className='order-section section'>
            <h1>Order Items :</h1>
            {cartItems.map((each) => (
              <PlaceOrderItem
                price={each.price}
                qty={each.qty}
                productName={truncate(each.name)}
                img={each.image}
                id={each._id}
              />
            ))}
          </div>
        </div>
        <div className='table'>
          <h1 className='title'>Order Summary</h1>
          <div className='row1 row'>
            <h1>Items :</h1>
            <p>
              {totalPrice}
              <span className='currency'>EGP</span>
            </p>
          </div>
          <div className='row2 row'>
            <h1>Shipping :</h1>
            <p>
              {toFixedFN(50)}
              <span className='currency'>EGP</span>
            </p>
          </div>
          <div className='row3 row'>
            <h1>Tax :</h1>
            <p>
              {toFixedFN((Number(totalPrice) * 14) / 100)}
              <span className='currency'>EGP</span>
            </p>
          </div>
          <div className='row4 row'>
            <h1>Total :</h1>
            <p>
              {toFixedFN(
                Number(totalPrice) + 50 + (Number(totalPrice) * 14) / 100
              )}
              <span className='currency'>EGP</span>
            </p>
          </div>
          <button>Place Order</button>
        </div>
        <div className='lineSeperate'></div>
      </div>
    </StyledPlaceOrder>
  )
}
const StyledPlaceOrder = styled.div`
  .lineSeperate {
    display: none;
  }

  .shipping-section p,
  .payment-section p {
    width: 90%;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.55rem 0.5rem;
    border: none;
    background: #00b2d8;
    color: white;
    border-radius: 6px;
    font-size: calc(1.2rem + 0.3vw);
    cursor: pointer;
    transition: 0.1s;
    margin: 0 calc(1.1rem + 0.3vw);
    margin-bottom: calc(0.8rem + 0.3vw);
    &:hover {
      background: #00a8ce;
    }
    #loader:first-child {
      width: calc(0.9rem + 0.5vw);
      height: calc(0.9rem + 0.5vw);
      margin-left: 0.45rem;
      #greybackground path {
        stroke: white;
      }
    }
  }
  .currency {
    margin-left: 0.15rem;
    font-size: calc(0.6rem + 0.3vw) !important;
  }
  .table {
    box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid rgba(0, 0, 0, 7.5%);
    flex: 1 1 auto;
    h1 {
      font-size: calc(1rem + 0.3vw);
      font-weight: 400;
      padding: 0 calc(1.1rem + 0.3vw);
    }
    p {
      font-size: calc(1rem + 0.3vw);
      margin-left: calc(2.4rem + 1vw);
    }
    .title {
      font-size: calc(1.48rem + 0.3vw);
      font-weight: 500;
      padding-top: calc(0.8rem + 0.3vw);
      padding-bottom: calc(0.5rem + 0.3vw);
      color: #1a1a1a;
      margin-right: calc(1.7rem + 0.6vw);
      white-space: nowrap;
    }

    .row {
      padding: 0.5rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(0, 0, 0, 7.5%);
      margin: 0 calc(1.1rem + 0.3vw);
      h1 {
        padding: unset !important;
        color: #1a1a1a;
        font-size: calc(0.83rem + 0.3vw);
      }
      p {
        color: #1a1a1a;
        font-size: calc(0.83rem + 0.3vw);
      }
      span {
        color: #1a1a1a;
      }
    }
    .row1 {
      border-top: unset;
      padding-top: 0;
    }
    .row4 {
      margin-bottom: calc(0.5rem + 0.3vw);
      h1 {
        color: #1a1a1a;
      }
      p {
        color: #1a1a1a;
      }
      span {
        color: #1a1a1a;
      }
    }
  }
  .section {
    h1 {
      padding-bottom: 0.8rem;
      padding-top: 0.8rem;
      font-weight: 500;
      color: #1a1a1a;
      font-size: calc(1.8rem + 0.3vw);
    }
    &:first-child h1 {
      padding-top: unset;
    }
    p {
      color: #1a1a1a;
      padding-bottom: 0.8rem;
      font-size: calc(0.8rem + 0.3vw);
    }
    border-bottom: 1px solid rgba(0, 0, 0, 12.5%);
    &:last-child {
      border-bottom: unset;
    }
  }
  .content {
    width: 85%;
    margin: 0 auto;
    margin-top: 1.8rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: calc(1.5rem + 0.3vw);
    .summary {
      flex: 1 1 75%;
    }
  }

  @media screen and (max-width: 1050px) {
    .lineSeperate {
      display: block;
      border-radius: 1px;
      width: 45%;
      height: 2px;
      background: rgba(0, 176, 216, 62%);
      margin: calc(1.3rem + 0.5vh) auto;
      margin-top: calc(1.45rem + 0.5vh);
    }
    .currency {
      margin-left: 0.1rem;
      font-size: calc(0.55rem + 0.3vw) !important;
    }
    .content {
      flex-direction: column;
      width: 90%;
      gap: unset !important;
    }
    .summary {
      order: 2;
      width: 100%;
    }

    .table {
      width: 100%;
      margin-top: 0;
      border: unset;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
      .title {
        font-size: calc(1.55rem + 0.3vw);
        padding-bottom: calc(0.8rem + 0.3vw - 0.5rem);
        padding-top: calc(1rem + 0.3vw);
        margin-right: unset;
      }
      .row1 {
        border-top: unset !important;
      }
      .row4 {
        margin-bottom: calc(0.8rem + 0.3vw - 0.5rem) !important;
      }
      .row {
        border-top: 1px solid rgba(0, 0, 0, 5%);
        padding: 0.5rem 0;
        margin: 0 calc(1.1rem + 0.3vw);
      }
      .row h1,
      .row p {
        font-size: calc(0.9rem + 0.3vw);
      }
      button {
        font-size: calc(1.1rem + 0.3vw);
      }
      .row {
        padding: 0.5rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(0, 0, 0, 7.5%);
        margin: 0 calc(1.1rem + 0.3vw);
        h1 {
          padding: unset !important;
          color: #1a1a1a;
          font-size: calc(0.83rem + 0.3vw);
        }
        p {
          color: #1a1a1a;
          font-size: calc(0.83rem + 0.3vw);
        }
        span {
          color: #1a1a1a;
        }
      }
    }
    .section {
      h1 {
        padding-bottom: 0.4rem;
        padding-top: 0.8rem;
        font-weight: 500;
        color: #1a1a1a;
        font-size: calc(1.55rem + 0.3vw);
      }
      &:first-child h1 {
        padding-top: unset;
      }
      p {
        padding-bottom: 0.8rem;
        color: #1a1a1a;
        font-size: calc(0.45rem + 1vw) !important;
      }
      border-bottom: 1px solid rgba(0, 0, 0, 12.5%);
      &:last-child {
        border-bottom: unset;
      }
    }
  }
`

export default PlaceOrder
