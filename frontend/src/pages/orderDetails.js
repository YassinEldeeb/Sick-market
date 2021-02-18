import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import getOrderAction from "../actions/getOrder"
import { useLocation, Link } from "react-router-dom"
import styled from "styled-components"
import PlaceOrderItem from "../components/PlaceOrderItem"
import Message from "../components/message"
import Loader from "../components/loader"
import QrReader from "react-qr-reader"
import qrCodeImg from "../img/qrCode.png"
import closeImg from "../img/close.svg"
import Lottie from "react-lottie"
import animationData from "../lotties/41791-loading-wrong.json"
import animationData2 from "../lotties/41793-correct.json"
import axios from "axios"
import { PayPalButton } from "react-paypal-button-v2"
import orderPayAction from "../actions/orderPay"

const OrderDetails = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice"
    },
  }
  const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice"
    },
  }

  function truncate(str) {
    return str.length > 30 ? str.substr(0, 30 - 1) + ".." : str
  }
  const toFixedFN = (num) => {
    return Number(num).toFixed(2)
  }

  const dispatch = useDispatch()
  const location = useLocation()

  const { order, error, orderLoading } = useSelector(
    (state) => state.orderDetails
  )

  const { orderPayLoading, success } = useSelector((state) => state.orderPay)

  const [sdkReady, setSdkReady] = useState(false)

  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    const currencyFetch = async () => {
      const { data: currency } = await axios.get(
        "https://api.currencyfreaks.com/latest?apikey=a85d31d75fc34b3e999bc0e87c08a8a9&symbols=EGP"
      )
      setCurrency(Number(currency.rates.EGP))
    }
    if (!currency) {
      currencyFetch()
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if ((!order.totalPrice && !orderLoading) || success) {
      dispatch({ type: "ORDER_PAY_RESET" })
      dispatch(getOrderAction(location.pathname.split("/")[2]))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [location, dispatch, success, order])

  const [qrResult, setQrResult] = useState("No result")
  const [showScanner, setShowScanner] = useState(false)
  const qrScanHandler = (result) => {
    if (result) {
      setQrResult(result)
    }
  }
  const [showSVGAnimation, setShowSVGAnimation] = useState(null)
  useEffect(() => {
    if (order._id && qrResult === order._id.toString()) {
      setShowScanner(false)
      setShowSVGAnimation(true)
      setTimeout(() => {
        setShowSVGAnimation(null)
      }, 2300)
    } else if (qrResult.length === 24) {
      setShowScanner(false)
      setShowSVGAnimation(false)
      setTimeout(() => {
        setShowSVGAnimation(null)
      }, 2300)
    }
  }, [qrResult])

  const qrErrorHandler = (result) => {
    if (result) {
      console.log(result)
    }
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(orderPayAction(order._id, paymentResult))
  }

  return (
    <StyledPlaceOrder>
      {showScanner && (
        <div
          className='qrCodeWrapper'
          onClick={(e) => {
            console.log(e.currentTarget)
            if (e.currentTarget.classList[0] === "qrCodeWrapper")
              setShowScanner(false)
          }}
        >
          <QrReader
            style={{ width: "100%" }}
            delay={300}
            onError={qrErrorHandler}
            onScan={qrScanHandler}
            className='qrCodeScanner'
          />
          <img
            onClick={() => {
              setShowScanner(false)
              setShowSVGAnimation(null)
            }}
            className='close'
            src={closeImg}
          />
        </div>
      )}
      <div
        className='content'
        style={{
          alignItems: `${error ? "flex-start" : "center"}`,
          width: `${error ? "90%" : "85%"}`,
        }}
      >
        {orderLoading && <Loader />}
        {error && (
          <Message
            vibrating='true'
            visiblity={error ? true : false}
            msg={
              error
                ? error.includes("timed out")
                  ? "Network Error"
                  : error.includes("mongo")
                  ? "Server Error"
                  : error
                : "Ok"
            }
            hidden={error ? false : true}
            type='error'
          />
        )}
        {order.itemsPrice && (
          <>
            <h1 className='orderId'>
              <Link to='/orders'>
                #Order:<div className='line'></div>
              </Link>
              <span>{" " + order._id}</span>
            </h1>
            <div className='actualContent'>
              {showSVGAnimation === false && (
                <div className='failureOrderScreen'>
                  <Lottie
                    options={defaultOptions}
                    width={"50%"}
                    height={"50%"}
                  />
                  <img
                    onClick={() => {
                      setShowSVGAnimation(null)
                      setShowScanner(false)
                    }}
                    className='close'
                    src={closeImg}
                  />
                </div>
              )}
              {showSVGAnimation && (
                <div className='successOrderScreen'>
                  <Lottie
                    options={defaultOptions2}
                    width={"50%"}
                    height={"50%"}
                  />
                  <img
                    onClick={() => {
                      setShowSVGAnimation(null)
                      setShowScanner(false)
                    }}
                    className='close'
                    src={closeImg}
                  />
                </div>
              )}
              <div className='summary'>
                <div className='shipping-section section'>
                  <h1>Shipping :</h1>
                  <p>Name: {order.user.name}</p>
                  <p>Email: {order.user.email}</p>
                  <p className='lastChild'>
                    Address: {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.governorate}, Egypt,{" "}
                    {order.shippingAddress.phoneNumber}
                  </p>
                  <div className='flex'>
                    {!order.isDelivered && (
                      <Message type='error' msg='Not Delivered' />
                    )}
                    <img
                      onClick={() => setShowScanner(true)}
                      src={qrCodeImg}
                      alt=''
                    />
                  </div>
                </div>
                <div className='payment-section section'>
                  <h1>Payment Method :</h1>
                  <p>Method: {order.paymentMethod}</p>
                  {!order.isPaid && <Message type='error' msg='Not Paid' />}
                </div>
                <div className='order-section section'>
                  <h1>
                    {order.orderItems.length === 1
                      ? "Order Item :"
                      : "Order Items :"}
                  </h1>
                  {order.orderItems.map((each) => (
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
                    {order.itemsPrice}
                    <span className='currency'>EGP</span>
                  </p>
                </div>
                <div className='row2 row'>
                  <h1>Shipping :</h1>
                  <p>
                    {order.shippingPrice}
                    <span className='currency'>EGP</span>
                  </p>
                </div>
                <div className='row3 row'>
                  <h1>Tax :</h1>
                  <p>
                    {toFixedFN(order.taxPrice)}
                    <span className='currency'>EGP</span>
                  </p>
                </div>
                {order.couponDiscount > 0 && (
                  <div className='row5 row'>
                    <h1>Discount :</h1>
                    <p>
                      -{order.couponDiscount}
                      <span className='currency'>EGP</span>
                    </p>
                  </div>
                )}
                <div className='row4 row'>
                  <h1>Total :</h1>
                  <p
                    className={`${order.couponDiscount > 0 ? "discount" : ""}`}
                  >
                    {order.couponDiscount > 0 && (
                      <h1 className='lastPrice'>
                        {toFixedFN(
                          Number(order.itemsPrice) +
                            50 +
                            (Number(order.itemsPrice) * 14) / 100
                        )}
                      </h1>
                    )}
                    {toFixedFN(
                      Number(order.itemsPrice) +
                        50 +
                        (Number(order.itemsPrice) * 14) / 100 +
                        -order.couponDiscount
                    ) > 0
                      ? toFixedFN(
                          Number(order.itemsPrice) +
                            50 +
                            (Number(order.itemsPrice) * 14) / 100 +
                            -order.couponDiscount
                        )
                      : "+" +
                        Math.abs(
                          toFixedFN(
                            Number(order.itemsPrice) +
                              50 +
                              (Number(order.itemsPrice) * 14) / 100 +
                              -order.couponDiscount
                          )
                        )}
                    <span
                      className={`currency ${
                        toFixedFN(
                          Number(order.totalPrice) +
                            50 +
                            (Number(order.totalPrice) * 14) / 100
                        ) === order.couponDiscount
                          ? "free"
                          : ""
                      }`}
                    >
                      EGP
                    </span>
                  </p>
                </div>
                {!order.isPaid && (
                  <div className='row row6'>
                    {orderPayLoading && <Loader />}
                    {(!sdkReady || !currency || !order.totalPrice ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={(order.totalPrice / currency).toFixed(2)}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className='lineSeperate'></div>
            </div>
          </>
        )}
      </div>
    </StyledPlaceOrder>
  )
}
const StyledPlaceOrder = styled.div`
  .row6 {
    z-index: 1;
    border-top: unset !important;
    padding: unset !important;
    div {
      width: 100%;
      svg {
        margin-bottom: 1.05rem !important;
        width: calc(1.5rem + 1vw) !important;
        height: calc(1.5rem + 1vw) !important;
      }
    }
  }
  .failureOrderScreen,
  .successOrderScreen {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    z-index: 10001;
    .close {
      width: 3rem;
      height: 3rem;
      object-fit: contain;
      border-radius: 50%;
      position: absolute;
      right: 5%;
      top: 3%;
      opacity: 0.5;
      transition: 0.2s ease;
      &:hover {
        filter: brightness(1);
      }
    }
  }
  .qrCodeWrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: rgba(26, 26, 26, 0.93);
    z-index: 10000;
    width: 100%;
    .close {
      width: 3rem;
      height: 3rem;
      object-fit: contain;
      border-radius: 50%;
      position: absolute;
      right: 5%;
      top: 3%;
      cursor: pointer;
      filter: brightness(1.2);
      transition: 0.2s ease;
      &:hover {
        filter: brightness(1);
      }
    }
  }
  .qrCodeScanner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(300px + 10vw) !important;
    transform: translate(-50%, -50%);
    section {
      border-radius: 5px;
    }
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem !important;
    img {
      width: calc(2.8rem + 0.3vw);
      border: 2.5px solid #00b2d8;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.2s ease;
      &:hover {
        opacity: 0.85;
      }
    }
    .message {
      margin-bottom: 0 !important;
    }
  }
  .orderId {
    margin-bottom: 1.8rem;
    align-self: flex-start;
    color: white;
    background: #343a40;
    font-weight: 400;
    position: relative;
    padding: 0.35rem 0.6rem;
    border-radius: 6px;
    font-size: calc(1.05rem + 0.3vw);
    width: max-content;
    max-width: 100%;
    span {
      font-weight: 500;
    }
    a {
      position: relative;
      &:hover .line {
        display: block;
      }
      .line {
        position: absolute;
        left: 0;
        bottom: 2%;
        height: 1.8px;
        background: white;
        width: 100%;
        border-radius: 100rem;
        display: none;
      }
    }
  }
  .message span {
    font-size: calc(0.8rem + 0.3vw) !important;
  }
  .message {
    padding: 0.6rem 0.9rem !important;
    margin-bottom: 0.8rem !important;
  }
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
    &.free {
      display: none;
    }
  }
  .table {
    box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    margin-top: 0.1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid rgba(0, 0, 0, 5.5%);
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
      margin-bottom: 4px;
      h1 {
        color: #1a1a1a;
      }
      p {
        color: #1a1a1a;
        margin-left: calc(1.5rem + 1vw);
        display: flex;
        align-items: center;
      }
      p.discount {
        font-weight: 500;
      }
      span {
        color: #1a1a1a;
      }
      .lastPrice {
        margin-right: 0.4rem;
        text-decoration: line-through;
        font-size: calc(0.71rem + 0.3vw);
        font-weight: 400 !important;
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
      padding-bottom: 0.6rem;
      font-size: calc(0.8rem + 0.3vw);
    }
    .lastChild {
      padding-bottom: 0.8rem !important;
    }
    border-bottom: 1px solid rgba(0, 0, 0, 12.5%);
    &:last-child {
      border-bottom: unset;
    }
  }
  .actualContent {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: calc(1.5rem + 0.3vw);
  }
  .content {
    width: 85%;
    margin: 0 auto;
    margin-top: 1.8rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .summary {
      flex: 1 1 75%;
    }
  }

  @media screen and (max-width: 1050px) {
    .content {
      width: 90% !important;
    }
    .qrCodeScanner {
      width: 90% !important;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .message {
      padding: 0.5rem 0.8rem !important;
      margin-bottom: 0.8rem !important;
    }
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
    .actualContent {
      width: 100%;
      flex-direction: column;
      gap: unset !important;
    }
    .orderId {
      width: 100%;
      font-size: calc(0.93rem + 0.3vw);
      padding: 0.45rem 0.6rem;
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
        padding-bottom: 0.55rem;
        color: #1a1a1a;
        font-size: calc(0.52rem + 1vw) !important;
      }
      .lastChild {
        padding-bottom: 0.8rem !important;
      }
      border-bottom: 1px solid rgba(0, 0, 0, 12.5%);
      &:last-child {
        border-bottom: unset;
      }
    }
  }
`

export default OrderDetails
