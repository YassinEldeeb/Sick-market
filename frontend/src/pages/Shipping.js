import React, { useState, useEffect } from "react"
import styled from "styled-components"
import xSign from "../img/xSign.svg"
import { useLocation, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import userSaveAddress from "../actions/saveAddress"
import CheckoutSteps from "../components/CheckoutSteps"
import Select from "react-select"

const Shipping = () => {
  const cart = useSelector((state) => state.cart)
  const cartAddress = cart.address
  const [address, setAddress] = useState(
    cartAddress.address ? cartAddress.address : ""
  )
  const [city, setCity] = useState(cartAddress.city ? cartAddress.city : "")
  const [governorate, setGovernorate] = useState(
    cartAddress.governorate ? cartAddress.governorate : ""
  )
  const [phoneNumber, setPhoneNumber] = useState(
    cartAddress.phoneNumber ? cartAddress.phoneNumber : ""
  )

  const { user } = useSelector((state) => state.userInfo)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (location.pathname.split("/")[1] === "shipping" && !user.name) {
      history.push("/login?redirect=shipping")
    }
  }, [history, location, user])

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userSaveAddress({ address, city, governorate, phoneNumber }))
    history.push("/payment")
  }
  const options = [
    { value: "Ash Sharqia", label: "Ash Sharqia" },
    { value: "Giza", label: "Giza" },
    { value: "North Sinai", label: "North Sinai" },
    { value: "Gharbia", label: "Gharbia" },
    { value: "Dakahlia", label: "Dakahlia" },
    { value: "Alexandria", label: "Alexandria" },
    { value: "Asyut", label: "Asyut" },
    { value: "Aswan", label: "Aswan" },
    { value: "Beni Suef", label: "Beni Suef" },
    { value: "Qalyubia", label: "Qalyubia" },
    { value: "Cairo", label: "Cairo" },
    { value: "Beheira", label: "Beheira" },
    { value: "Damietta", label: "Damietta" },
    { value: "New Valley", label: "New Valley" },
    { value: "Faiyum", label: "Faiyum" },
    { value: "Red Sea", label: "Red Sea" },
    { value: "Ismailia", label: "Ismailia" },
    { value: "Kafr El Sheikh", label: "Kafr El Sheikh" },
    { value: "Luxor", label: "Luxor" },
    { value: "Matrouh", label: "Matrouh" },
    { value: "Minya", label: "Minya" },
    { value: "Port Said", label: "Port Said" },
    { value: "Qena", label: "Qena" },
    { value: "Menofia", label: "Menofia" },
    { value: "South Sinai", label: "South Sinai" },
    { value: "Sohag", label: "Sohag" },
    { value: "Suez", label: "Suez" },
  ]
  return (
    <>
      <CheckoutSteps step1 step2 current='step2' />

      <StyledShipping>
        <form onSubmit={submitHandler}>
          <h1>Shipping</h1>
          <div className='address'>
            <label htmlFor='address'>Address</label>
            <input
              value={address}
              id='address'
              type='text'
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <img
              onClick={() => setAddress("")}
              style={{ display: `${address.length ? "block" : "none"}` }}
              className='xSign2'
              src={xSign}
              alt='X icon'
            />
          </div>
          <div className='city'>
            <label htmlFor='city'>City</label>
            <input
              value={city}
              id='city'
              type='text'
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <img
              onClick={() => setCity("")}
              style={{ display: `${city.length ? "block" : "none"}` }}
              className='xSign2'
              src={xSign}
              alt='X icon'
            />
          </div>
          <div className='governorate'>
            <label htmlFor='governorate'>Governorate</label>
            <Select
              onChange={(e) => setGovernorate(e.value)}
              value={
                governorate.length
                  ? { label: governorate, value: governorate }
                  : null
              }
              options={options}
            />
            <input
              autoComplete='off'
              style={{
                opacity: 0,
                height: "100%",
                pointerEvents: "none",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                transform: "translate(2.5% ,-15%)",
              }}
              value={governorate}
              required={true}
            />
          </div>
          <div className='phoneNumber'>
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
              value={phoneNumber}
              id='phoneNumber'
              type='number'
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <img
              onClick={() => setPhoneNumber("")}
              style={{ display: `${phoneNumber.length ? "block" : "none"}` }}
              className='xSign2'
              src={xSign}
              alt='X icon'
            />
          </div>
          <button type='submit'>Continue</button>
        </form>
      </StyledShipping>
    </>
  )
}
const StyledShipping = styled.div`
  .css-tlfecz-indicatorContainer {
    padding: 0px 8px;
  }
  .css-yk16xz-control,
  .css-1pahdxg-control {
    padding: 0.405rem 1rem !important;
    margin-bottom: 1rem !important;
    margin-top: 0.3rem !important;
    background: #f3f3f3;
    color: #000 !important;
    border: none !important;
    border-radius: 6px !important;
    box-shadow: none !important;
    padding-right: 0.5rem !important;
    min-height: unset !important;
  }

  .css-1uccc91-singleValue {
    color: #000 !important;
    font-size: calc(1rem + 0.3vw) !important;
  }
  .css-g1d714-ValueContainer {
    padding: 0 !important;
    margin: 0 !important;
  }
  .css-26l3qy-menu {
  }
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 52%;
    justify-content: center;
    margin-bottom: 1rem;
    max-width: 750px;
    margin-top: 1.8rem;
    h1 {
      color: #1a1a1a;
      font-weight: 500;
      font-size: calc(2rem + 1vw);
      margin-bottom: 1.2rem;
    }
    .signInDiv {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .address,
    .governorate,
    .city,
    .phoneNumber {
      position: relative;
      width: 100%;
      input {
        background: #f3f3f3;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        width: 100%;
        font-size: calc(1rem + 0.3vw);
        margin-top: 0.1rem;
      }
      label {
        font-size: calc(1rem + 0.3vw);
        color: #343a40;
      }
    }
    .governorate {
      position: relative;
    }
    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0.9rem;
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
    #governorate,
    #city,
    #address,
    #phoneNumber {
      margin-bottom: 1rem;
      margin-top: 0.3rem;
      padding-right: 2.8rem;
    }
  }
  .xSign2 {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-50%, -12%);
    width: calc(0.75rem + 1vw);
    cursor: pointer;
    padding: 0.2rem;
  }

  @media screen and (max-width: 1050px) {
    margin-top: unset !important;
    justify-content: flex-start;
    .xSign2 {
      transform: translate(-50%, -24%) !important;
      width: calc(2rem + 1vw);
      cursor: pointer;
      padding: 0.6rem;
      transform: translate(-12%, -36%) !important;
    }
    form {
      width: 100%;
      margin-top: 1.2rem;
      h1 {
        font-size: calc(2.5rem + 1vw);
      }
      input {
        font-size: calc(1.1rem + 0.3vw);
      }
      label {
        font-size: calc(1.3rem + 0.3vw);
      }
      .css-yk16xz-control,
      .css-1pahdxg-control {
        padding: 0.25rem 1rem !important;
        padding-right: 0.5rem !important;
      }
      .css-1uccc91-singleValue {
        color: #000 !important;
        font-size: calc(1.1rem + 0.3vw);
      }
      button {
        font-size: calc(1.15rem + 0.3vw);
        border-radius: 6px;
        padding: 0.5rem 0.9rem;
      }
      #address,
      #password,
      #governorate,
      #city {
        margin-bottom: 1.3rem;
      }
    }
  }
`

export default Shipping
