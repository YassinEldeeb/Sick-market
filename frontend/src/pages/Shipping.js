import React, { useState, useEffect } from "react"
import styled from "styled-components"
import xSign from "../img/xSign.svg"
import { useLocation, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import userSaveAddress from "../actions/saveAddress"
import CheckoutSteps from "../components/CheckoutSteps"
import Select from "react-select"
import axios from "axios"
import Loader from "../components/loader"
import locationIcon from "../img/locationIcon.svg"

const Shipping = () => {
  const { address, geocodingLoading, cartItems } = useSelector(
    (state) => state.cart
  )
  useEffect(() => {
    if (!cartItems.length) {
      history.push("/cart")
    }
  }, [cartItems])
  const [addressValue, setAddress] = useState(
    address.address ? address.address : ""
  )
  const [city, setCity] = useState(address.city ? address.city : "")
  const [governorate, setGovernorate] = useState(
    address.governorate ? address.governorate : ""
  )
  const [phoneNumber, setPhoneNumber] = useState(
    address.phoneNumber ? address.phoneNumber : ""
  )

  useEffect(() => {
    console.log(address)
    setAddress(address.address ? address.address : "")
    setCity(address.city ? address.city : "")
    setGovernorate(address.governorate ? address.governorate : "")
    setPhoneNumber(address.phoneNumber ? address.phoneNumber : "")
  }, [address])

  const { user } = useSelector((state) => state.userInfo)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (location.pathname.split("/")[1] === "shipping" && !user.name) {
      history.push("/login?redirect=shipping")
    }
  }, [history, location, user])

  const dispatch = useDispatch()

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [display_address, setDisplay_address] = useState("")

  const [forwardGeocoding, setForwardGeocoding] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (
      phoneNumber.toString().startsWith("01") &&
      phoneNumber.toString().length === 11
    ) {
      const display_address_value = `${addressValue}, ${city}, ${
        governorate + ","
      } Egypt ${", " + phoneNumber}`

      const latitudeAndLongValue = async () => {
        if (!latitude && !longitude) {
          setForwardGeocoding(true)
          const { data } = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressValue}, ${city}, ${governorate}, Egypt.json?access_token=pk.eyJ1IjoieWFzc2luNzg5IiwiYSI6ImNraGNiZDc2cjBjcXoycm5nZDQzeWh5MGsifQ.vZNRBIwM6P8fwbZvoPgp1A`
          )
          const lon = data.features[0].center[0]
          const lat = data.features[0].center[1]
          setForwardGeocoding(false)
          return { lat, lon }
        } else {
          return { lat: latitude, lon: longitude }
        }
      }

      dispatch(
        userSaveAddress({
          address: addressValue,
          city,
          governorate,
          phoneNumber,
          location: await latitudeAndLongValue(),
          display_address: !display_address.length
            ? display_address_value
            : display_address,
        })
      )
      if (!forwardGeocoding) {
        history.push("/payment")
      }
    }
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
  const customStyles = {
    control: () => ({
      display: "flex",
      padding: "0.4rem 1rem !important",
      background: "#f3f3f3",
      color: "#000",
      borderRadius: "6px",
      paddingRight: "0.4rem !important",
      marginBottom: "1rem",
      marginTop: "0.3rem",
    }),
  }

  const cleanGovernorate = (data) => {
    if (data.toLowerCase().includes("sharqia")) {
      return "Ash Sharqia"
    } else if (data.toLowerCase().includes("north sinai")) {
      return "North Sinai"
    } else if (data.toLowerCase().includes("gharbiyya")) {
      return "Gharbia"
    } else if (data.toLowerCase().includes("dakahlia")) {
      return "Dakahlia"
    } else if (data.toLowerCase().includes("alexandria")) {
      return "Alexandria"
    } else if (data.toLowerCase().includes("asyut")) {
      return "Asyut"
    } else if (data.toLowerCase().includes("assouan")) {
      return "Aswan"
    } else if (data.toLowerCase().includes("assouan")) {
      return "Aswan"
    } else if (data.toLowerCase().includes("beni suef")) {
      return "Beni Suef"
    } else if (data.toLowerCase().includes("qalyubia")) {
      return "Qalyubia"
    } else if (data.toLowerCase().includes("cairo")) {
      return "Cairo"
    } else if (data.toLowerCase().includes("beheira")) {
      return "Beheira"
    } else if (data.toLowerCase().includes("damietta")) {
      return "Damietta"
    } else if (data.toLowerCase().includes("new valley")) {
      return "New Valley"
    } else if (data.toLowerCase().includes("faiyum")) {
      return "Faiyum"
    } else if (data.toLowerCase().includes("red sea")) {
      return "Red Sea"
    } else if (data.toLowerCase().includes("ismailia")) {
      return "Ismailia"
    } else if (data.toLowerCase().includes("kafr el-sheikh")) {
      return "Kafr El Sheikh"
    } else if (data.toLowerCase().includes("luxor")) {
      return "Luxor"
    } else if (data.toLowerCase().includes("matrouh")) {
      return "Matrouh"
    } else if (data.toLowerCase().includes("minya")) {
      return "Minya"
    } else if (data.toLowerCase().includes("port said")) {
      return "Port Said"
    } else if (data.toLowerCase().includes("qena")) {
      return "Qena"
    } else if (data.toLowerCase().includes("monufia")) {
      return "Menofia"
    } else if (data.toLowerCase().includes("south sinai")) {
      return "South Sinai"
    } else if (data.toLowerCase().includes("sohag")) {
      return "Sohag"
    } else if (data.toLowerCase().includes("suez")) {
      return "Suez"
    } else {
      return ""
    }
  }
  const geolocationHandler = () => {
    if (!geocodingLoading) {
      if (navigator.geolocation) {
        dispatch({ type: "GEOCODING_REQUEST" })
        navigator.geolocation.getCurrentPosition(showPosition)

        async function showPosition(position) {
          try {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            const { data } = await axios.get(
              `https://us1.locationiq.com/v1/reverse.php?key=pk.49f42f5ce86c30300b67591afd65161c&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
            )

            const display_address_value = `${
              data.address.house_number ? data.address.house_number : ""
            }${data.address.road ? " " + data.address.road + "," : ""}${
              data.address.neighbourhood
                ? " " + data.address.neighbourhood + ","
                : ""
            }${data.address.suburb ? " " + data.address.suburb : ""}${
              data.address.city ? " " + data.address.city + "," : ""
            }${
              data.address.state || data.address.town
                ? " " +
                  cleanGovernorate(
                    data.address.state
                      ? data.address.state
                      : data.address.town
                      ? data.address.town
                      : ""
                  ) +
                  ", "
                : ""
            }Egypt${", " + phoneNumber}`
            setDisplay_address(display_address_value)
            dispatch({
              type: "GEOCODING_SUCCESS",
              payload: {
                location: { lat: latitude, lon: longitude },
                display_address: display_address_value,
                address: `${
                  data.address.house_number ? data.address.house_number : ""
                }${data.address.road ? " " + data.address.road + "," : ""}${
                  data.address.neighbourhood
                    ? " " + data.address.neighbourhood + ","
                    : ""
                }${data.address.suburb ? " " + data.address.suburb : ""}`,
                city: `${data.address.city ? data.address.city : ""}`,
                governorate: cleanGovernorate(
                  data.address.state
                    ? data.address.state
                    : data.address.town
                    ? data.address.town
                    : ""
                ),
                phoneNumber: address.phoneNumber ? address.phoneNumber : null,
              },
            })
          } catch (error) {
            console.log(error)
            dispatch({
              type: "GEOCODING_FAIL",
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          }
        }
      } else {
        alert("Geolocation is not supported by this browser.")
      }
    }
  }

  return (
    <>
      <CheckoutSteps step1 step2 current='step2' />

      <StyledShipping>
        <form onSubmit={submitHandler}>
          <div className='title'>
            <h1>Shipping</h1>
            <button type='button' onClick={geolocationHandler}>
              {!geocodingLoading && <img src={locationIcon} />}
              {geocodingLoading && <Loader />}
            </button>
          </div>
          <div className='address'>
            <label htmlFor='address'>Address</label>
            <input
              value={addressValue}
              id='address'
              type='text'
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <img
              onClick={() => setAddress("")}
              style={{ display: `${addressValue.length ? "block" : "none"}` }}
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
              styles={customStyles}
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
              onChange={(e) => e}
            />
          </div>
          <div className='phoneNumber'>
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
              style={{
                boxShadow: `${
                  (!phoneNumber.toString().startsWith("01") &&
                    phoneNumber.length) ||
                  (phoneNumber.toString().length !== 11 && phoneNumber.length)
                    ? "0 0 3px red"
                    : "unset"
                }`,
              }}
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
          <button type='submit'>
            Continue {forwardGeocoding && <Loader />}
          </button>
        </form>
      </StyledShipping>
    </>
  )
}
const StyledShipping = styled.div`
  #loader {
    animation: loaderAnim 0.9s infinite linear;
  }
  #loader:first-child {
    width: 1.7rem !important;
    height: 1.7rem !important;
    margin-left: unset;
    #greybackground path {
      stroke: white;
    }
  }

  /* .css-yk16xz-control *,
  .css-1pahdxg-control * {
    padding: 0 !important;
  }
  .css-tlfecz-indicatorContainer {
    padding: 0 0.4rem !important;
  }
  .css-tlfecz-indicatorContainer {
    padding: 0px 8px;
  }
  .css-yk16xz-control,
  .css-1pahdxg-control {
    padding: 0.5rem 1rem !important;
    margin-bottom: 1rem !important;
    margin-top: 0.3rem !important;
    background: #f3f3f3;
    color: #000 !important;
    border: none !important;
    border-radius: 6px !important;
    box-shadow: none !important;
    padding-right: 0.5rem !important;
    min-height: unset !important;
  } */

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
      #loader:first-child {
        width: calc(0.9rem + 0.5vw) !important;
        height: calc(0.9rem + 0.5vw) !important;
        margin-left: 0.45rem !important;
        #greybackground path {
          stroke: white !important;
        }
      }
    }
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2rem;
      button {
        padding: 0.5rem;
        border-radius: 6px;
        img {
          margin-left: 0rem !important;
          width: 1.7rem !important;
          height: 1.7rem !important;
        }
        #loader:first-child {
          height: 1.7rem !important;
          width: 1.7rem !important;
          margin-left: 0rem !important;
        }
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
        padding: 0.38rem 1rem !important;
        padding-right: 0.4rem !important;
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
