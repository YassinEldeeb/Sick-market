import React, { useState, useEffect } from "react"
import styled from "styled-components"
import CheckoutSteps from "../components/CheckoutSteps"
import trueSVG from "../img/true.svg"
import falseSVG from "../img/false.svg"
import userSavePayment from "../actions/savePaymentMethod"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import addCouponAction from "../actions/addCouponCode"
import Loader from "../components/loader"
import { underline } from "colors"

const Payment = () => {
  const location = useLocation()
  const isBuyNow = location.search.split("=")[1] === "buyNow"

  const {
    paymentMethod,
    address,
    cartItems,
    discount,
    loadingCoupon,
    errorCoupon,
  } = useSelector((state) => state.cart)
  const { product } = useSelector((state) => state.buyNowProduct)

  const pricesArr = !isBuyNow
    ? cartItems.map((each) => each.price * each.qty)
    : product.price * product.qty

  const totalPrice = !isBuyNow
    ? pricesArr.length
      ? pricesArr.reduce((acc, item) => acc + item)
      : null
    : pricesArr

  const { user } = useSelector((state) => state.userInfo)

  const [method, setMethod] = useState(
    paymentMethod
      ? paymentMethod.length
        ? paymentMethod
        : "PayPal or Credit & Debit Cards"
      : "PayPal or Credit & Debit Cards"
  )
  const dispatch = useDispatch()
  const history = useHistory()

  const continueHandler = () => {
    dispatch(
      userSavePayment(
        totalPrice < 20 || totalPrice > 17000
          ? "PayPal or Credit & Debit Cards"
          : method
      )
    )
    const pushedLink = () => {
      if (location.search.split("=")[1] === "buyNow") {
        return "/placeOrder?order=buyNow"
      } else {
        return "/placeOrder"
      }
    }
    history.push(pushedLink())
  }

  useEffect(() => {
    if (!cartItems.length && !product.name) {
      history.push("/cart")
    }
  }, [cartItems])

  useEffect(() => {
    const pushedLink = () => {
      if (location.search.split("=")[1] === "buyNow") {
        return "/login?redirect=payment"
      } else {
        return "/login?redirect=payment?order=buyNow"
      }
    }
    if (location.pathname.split("/")[1] === "payment" && !user.name) {
      history.push(pushedLink())
    }
  }, [history, location, user])

  useEffect(() => {
    const pushedLink = () => {
      if (location.search.split("=")[1] === "buyNow") {
        return "/shipping?order=buyNow"
      } else {
        return "/shipping"
      }
    }
    if (!address.city) {
      history.push(pushedLink())
    }
  }, [history, location, user])

  const [couponInput, setCouponInput] = useState(false)
  const [discount2, setDiscount2] = useState(false)
  const [code, setCode] = useState("")

  const applyCodeHandler = (e) => {
    e.preventDefault()
    dispatch(addCouponAction(code))
  }
  useEffect(() => {
    if (discount) {
      setDiscount2(
        discount.code.isPercent
          ? discount.code.amount + "% OFF"
          : discount.code.amount + "EGP OFF"
      )
    }
  }, [discount])

  useEffect(() => {
    if (errorCoupon) {
      setDiscount2(errorCoupon)
    }
  }, [errorCoupon])
  return (
    <>
      <CheckoutSteps step1 step2 step3 current='step3' />
      <StyledPayment img={trueSVG} img2={falseSVG}>
        <div className='align'>
          <h1>Payment Method</h1>
          <div className='methods'>
            <div className='select'>
              <input type='radio' id='credit' />
              <label
                className={`${
                  method === "PayPal or Credit & Debit Cards" ? "active" : ""
                }`}
                htmlFor='credit'
                onClick={() => setMethod("PayPal or Credit & Debit Cards")}
              >
                PayPal or Credit & Debit Cards
              </label>
              <input type='radio' id='delivery' />
              <label
                className={`${method === "Cash on Delivery" ? "active" : ""} ${
                  totalPrice < 20 || totalPrice > 17000 ? "disabled" : ""
                }`}
                htmlFor='Cash on Delivery'
                onClick={() => {
                  if (!totalPrice < 20 || totalPrice > 17000)
                    setMethod("Cash on Delivery")
                }}
              >
                Cash on Delivery
              </label>
              {totalPrice < 20 && (
                <li className='explaningWhy'>Your order is less than 20 EGP</li>
              )}
              {totalPrice > 17000 && (
                <li className='explaningWhy'>
                  Your total cart value is above EGP 17,000
                </li>
              )}
            </div>
            {!couponInput && (
              <p className='haveaCoupon' onClick={() => setCouponInput(true)}>
                Have a coupon or a voucher?
              </p>
            )}
            {couponInput && (
              <form className='couponCont' onSubmit={applyCodeHandler}>
                <input
                  placeholder='Enter Code'
                  className='CouponInput'
                  type='text'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  type='submit'
                  className={`Indication ${
                    errorCoupon && !loadingCoupon ? "error" : ""
                  } ${
                    (!errorCoupon && !discount) || loadingCoupon ? "idle" : ""
                  }`}
                >
                  {loadingCoupon && <Loader />}
                </button>
                <div className={`inputError ${!errorCoupon ? "ok" : ""}`}>
                  <span>{discount2}</span>
                </div>
              </form>
            )}

            <button className='continue' onClick={continueHandler}>
              Continue
            </button>
          </div>
        </div>
      </StyledPayment>
    </>
  )
}

const StyledPayment = styled.div`
  .haveaCoupon {
    margin-bottom: 0.5rem;
    color: #0084a0;
    cursor: pointer;
    display: inline-block;
    transition: 0.1s ease;
    &:hover {
      color: #0093b4;
    }
  }
  .couponCont {
    position: relative;
    display: inline-block;
    width: 55%;
    margin-bottom: 0.5rem;

    .inputError {
      position: absolute;
      right: 0%;
      top: 50%;
      transform: translate(110%, -50%);
      color: #ff6969;
      font-size: calc(0.8rem + 0.3vw);
      font-weight: 500;
      &.ok {
        color: #22cb84;
      }
    }
    .CouponInput {
      background: #f3f3f3;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      width: 100%;
      font-size: calc(1rem + 0.3vw);
      display: inline-block;
      padding-right: calc(3% + 0.5rem + 25px);
    }
    .Indication {
      outline: none;
      border: none;
      position: absolute;
      right: 4%;
      top: 50%;
      transform: translate(0, -50%);
      width: 25px;
      height: 25px;
      background: url(${(props) => props.img});
      background-size: cover;
      cursor: pointer;
      border-radius: 50%;
      &.idle {
        background: rgba(71, 79, 87, 0.95);
      }
      &.error {
        background: url(${(props) => props.img2});
        background-size: cover;
      }
      #loader:first-child {
        position: absolute;
        right: 4%;

        transform: translate(0, -50%);
        width: 25px;
        height: 25px;
        #greybackground path {
          stroke: #25da8e;
        }
      }
    }
  }

  .explaningWhy {
    color: #e65959;
    font-size: calc(0.7rem + 0.3vw);
    font-weight: 500;
  }
  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }
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
      font-size: calc(0.61rem + 1vw);
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
      }
    }
  }
  .continue {
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
    font-size: calc(2rem + 1vw);
    margin-bottom: 1.2rem;
  }
  @media screen and (max-width: 1050px) {
    h1 {
      font-size: calc(1.74rem + 1vw);
    }
    .continue {
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
        }
      }
    }
  }
`

export default Payment
