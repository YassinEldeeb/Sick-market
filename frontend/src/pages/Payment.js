import React, { useState, useEffect } from "react"
import styled from "styled-components"
import CheckoutSteps from "../components/CheckoutSteps"
import trueSVG from "../img/true.svg"
import userSavePayment from "../actions/savePaymentMethod"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"

const Payment = () => {
  const { paymentMethod, address } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.userInfo)

  const [method, setMethod] = useState(
    paymentMethod.length ? paymentMethod : "Paypal"
  )
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const continueHandler = () => {
    dispatch(userSavePayment(method))
    history.push("/place-order")
  }

  useEffect(() => {
    if (location.pathname.split("/")[1] === "payment" && !user.name) {
      history.push("/login?redirect=payment")
    }
  }, [history, location, user])

  useEffect(() => {
    if (!address.city) {
      history.push("/shipping")
    }
  }, [history, location, user])
  return (
    <>
      <CheckoutSteps step1 step2 step3 current='step3' />
      <StyledPayment img={trueSVG}>
        <div className='align'>
          <h1>Payment Method</h1>
          <div className='methods'>
            <div className='select'>
              <input type='radio' id='credit' />
              <label
                className={`${method === "Paypal" ? "active" : ""}`}
                htmlFor='credit'
                onClick={() => setMethod("Paypal")}
              >
                PayPal or Credit Card & Debit
              </label>
              <input type='radio' id='delivery' />
              <label
                className={`${method === "Delivery" ? "active" : ""}`}
                htmlFor='delivery'
                onClick={() => setMethod("Delivery")}
              >
                Pay on Delivery
              </label>
            </div>
            <button onClick={continueHandler}>Continue</button>
          </div>
        </div>
      </StyledPayment>
    </>
  )
}
const StyledPayment = styled.div`
  .align {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 52%;
  }
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1.8rem;
  .methods {
    margin-left: 0.7rem;
  }
  .select {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 43px;
    margin-bottom: 1.2rem;
    border-left: 2px solid #dfdfdf;
    input {
      display: none;
    }
    label {
      margin-bottom: 0.7rem;
      position: relative;
      font-size: calc(0.68rem + 1vw);
      font-weight: 400;
      cursor: pointer;
      color: #1a1a1a;
      &:last-child {
        margin-bottom: unset;
      }
      &::before {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        box-shadow: inset 0px 0px 0px 2px #343a40;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-120%, -50%);
      }
      &.active::before {
        box-shadow: unset;
        background: url(${(props) => props.img});
        background-size: cover;
        filter: brightness(93%);
      }
    }
  }
  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.45rem 0.9rem;
    border: none;
    background: #00b2d8;
    color: white;
    border-radius: 6px;
    font-size: calc(1.1rem + 0.3vw);
    cursor: pointer;
    transition: 0.1s;
    &:hover {
      background: #00a8ce;
    }
  }
  h1 {
    color: #1a1a1a;
    font-weight: 500;
    font-size: calc(2.5rem + 1vw);
    margin-bottom: 1.2rem;
  }
  @media screen and (max-width: 1050px) {
    h1 {
      font-size: calc(1.74rem + 1vw);
    }
    button {
      font-size: calc(1.15rem + 0.3vw);
      border-radius: 6px;
      padding: 0.5rem 0.9rem;
    }
    .align {
      width: 100%;
    }
    .select {
      margin-bottom: 1.05rem;
      padding-left: 33px;
      label {
        margin-bottom: 0.85rem;
        font-size: calc(0.7rem + 1vw);

        &::before {
          content: "";
          width: 18px;
          height: 18px;
          box-shadow: inset 0px 0px 0px 1.5px #343a40;
        }
        &.active::before {
          box-shadow: unset;
          background: url(${(props) => props.img});
          background-size: cover;
          filter: brightness(93%);
        }
      }
    }
  }
`

export default Payment
