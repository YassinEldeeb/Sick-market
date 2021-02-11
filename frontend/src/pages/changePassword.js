import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import closedEye from "../img/closedEye.svg"
import eye from "../img/eye.svg"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/message"
import Loader from "../components/loader"
import dotenv from "dotenv"
import userUpdateAction from "../actions/update"
import SlideBar from "../components/slidebar"
import PopupMessage from "../components/PopupMessage"
import { useLocation, useHistory } from "react-router-dom"

const ChangePassword = () => {
  dotenv.config()
  const location = useLocation()
  const history = useHistory()

  const { updateError, updateLoading, updated, user } = useSelector(
    (state) => state.userInfo
  )

  const inputRef = useRef(null)
  const inputRef2 = useRef(null)
  const [oldPasswordValue, setOldPasswordValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [show, setShow] = useState(false)
  const [requiredInputs, setRequiredInputs] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (
      (location.pathname === "/account/change-password" &&
        user.profilePicLink) ||
      (location.pathname === "/account/change-password/" && user.profilePicLink)
    ) {
      history.push("/account/edit-profile")
    }
  }, [])
  const submitHandler = (e) => {
    e.preventDefault()
    setWarning(true)
    setRequiredInputs(null)
    if (!oldPasswordValue.length && !passwordValue.length) {
      setRequiredInputs("Old & New Passwords are required")
    } else if (oldPasswordValue === passwordValue) {
      setRequiredInputs("Old & New Passwords are the Same")
    } else {
      dispatch(userUpdateAction(null, null, oldPasswordValue, passwordValue))
    }
  }

  const [slider, setSlider] = useState(false)
  const [warning, setWarning] = useState(true)

  useEffect(() => {
    if (requiredInputs || updateError || updated) {
      document.querySelector(".content").scroll({
        top: 0,
        left: 0,
        behavior: `${updated ? "smooth" : "auto"}`,
      })
    }
  }, [updateError, requiredInputs, updated])

  return (
    <StyledLogin
      onClick={(e) => {
        if (e.target.classList.contains("slider-shadow") && slider)
          setSlider(false)
      }}
    >
      {updated && warning && (
        <PopupMessage
          warning={warning}
          setWarning={setWarning}
          title='Updated'
          type='ok'
          desc='Password Updated, All other devices signed in with this account have been signed out, except you'
          timer={5}
          oneTime={false}
        />
      )}
      <SlideBar slider={slider} />
      <div className='slider-Burger' onClick={() => setSlider(!slider)}>
        <span
          className={`first-slider-burger ${slider ? "active" : ""}`}
        ></span>
        <span
          className={`third-slider-burger ${slider ? "active" : ""}`}
        ></span>
      </div>

      <div className='content'>
        <form onSubmit={submitHandler}>
          <div className='signInDiv'>
            <h1>Change Password</h1>
          </div>
          <Message
            vibrating='true'
            visiblity={updateError || requiredInputs ? true : false}
            msg={
              requiredInputs
                ? requiredInputs
                : updateError
                ? updateError.includes("timed out")
                  ? "Network Error"
                  : updateError.includes("mongo")
                  ? "Server Error"
                  : updateError
                : "Ok"
            }
            type='error'
          />
          <div className='old-password'>
            <label htmlFor='old-password'>Old Password</label>
            <input
              ref={inputRef2}
              value={oldPasswordValue}
              id='old-password'
              type={`${show ? "text" : "password"}`}
              onChange={(e) => setOldPasswordValue(e.target.value)}
            />
            <img
              style={{ display: `${show ? "none" : "block"}` }}
              className='eye eye3'
              src={closedEye}
              alt='closedEye'
              draggable='false'
              onClick={() => {
                inputRef2.current.focus()
                setShow(!show)
                setTimeout(function () {
                  inputRef2.current.selectionStart = inputRef.current.selectionEnd = 10000
                }, 0)
              }}
            />
            <img
              style={{ display: `${!show ? "none" : "block"}` }}
              className='eye eye4'
              src={eye}
              alt='eye'
              draggable='false'
              onClick={() => {
                inputRef.current.focus()
                setShow(!show)
                setTimeout(function () {
                  inputRef.current.selectionStart = inputRef.current.selectionEnd = 10000
                }, 0)
              }}
            />
          </div>
          <div className='password'>
            <label htmlFor='password'>New Password</label>
            <input
              ref={inputRef}
              value={passwordValue}
              id='password'
              type={`${show ? "text" : "password"}`}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            <img
              style={{ display: `${show ? "none" : "block"}` }}
              className='eye eye1'
              src={closedEye}
              alt='closedEye'
              draggable='false'
              onClick={() => {
                inputRef.current.focus()
                setShow(!show)
                setTimeout(function () {
                  inputRef.current.selectionStart = inputRef.current.selectionEnd = 10000
                }, 0)
              }}
            />
            <img
              style={{ display: `${!show ? "none" : "block"}` }}
              className='eye eye2'
              src={eye}
              alt='eye'
              draggable='false'
              onClick={() => {
                inputRef.current.focus()
                setShow(!show)
                setTimeout(function () {
                  inputRef.current.selectionStart = inputRef.current.selectionEnd = 10000
                }, 0)
              }}
            />
          </div>
          <button type='submit'>Change {updateLoading && <Loader />}</button>
        </form>
      </div>
      <div
        className='slider-shadow'
        style={{
          pointerEvents: `${slider ? "all" : "none"}`,
          background: `${slider ? "rgba(0, 0, 0, 0.2)" : "unset"}`,
        }}
      ></div>
    </StyledLogin>
  )
}
const StyledLogin = styled.div`
  position: relative;
  .slider-shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: 0.3s ease 0.15s;
  }
  .alert .title h1 {
    margin-left: 0.35rem;
  }
  height: 0px;
  position: relative;
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
    padding: 1rem 0.8rem;
    width: 49px;
    height: 49px;
    border-radius: 50%;
    cursor: pointer;
    margin-bottom: calc(5vw);
    display: none;

    span {
      width: 1.8rem !important;
      height: 0.18rem !important;
      margin: 0.18rem 0 !important;
      background: white;
      border-radius: 1px;
      transition: 0.3s ease;
    }
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex: 1 1 auto;
    padding: calc(2rem + 10vh);
    overflow-y: scroll;
  }
  .eye3 {
    transform: translate(-50%, 0%) !important;
  }
  .eye4 {
    transform: translate(-50%, 10%) !important;
  }
  .eye2 {
    transform: translate(-50%, 34%) !important;
  }
  .eye {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-50%, 18%);
    width: calc(1.8rem + 0.3vw);
    cursor: pointer;
  }
  display: flex;
  flex: 1 1 auto;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 1rem;
    width: 50%;
    max-width: 606px;
    min-width: max-content;
    padding-bottom: 1.5rem;

    h1 {
      color: #1a1a1a;
      font-weight: 500;
      font-size: calc(1.8rem + 1vw);
      margin-bottom: 0.1rem;
    }
    .signInDiv {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .old-password,
    .password {
      position: relative;
      width: 100%;
      input {
        background: #f3f3f3;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        width: 100%;
        font-size: calc(1rem + 0.3vw);
      }
      label {
        font-size: calc(1rem + 0.3vw);
        color: #343a40;
      }
    }
    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.45rem 0.95rem;
      border: none;
      background: #00b2d8;
      color: white;
      border-radius: 6px;
      font-size: calc(1.1rem + 0.3vw);
      cursor: pointer;
      transition: 0.1s;
      margin-top: 1rem;
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
    #email,
    #old-password {
      margin-bottom: 1rem;
      margin-top: 0.3rem;
      padding-right: 2.8rem;
    }
  }
  .message {
    margin-bottom: 0.5rem;
    margin-top: 0.1rem;
    padding: 0.55rem 0.8rem !important;
  }
  @media screen and (max-width: 1050px) {
    flex-direction: column;

    .message {
      padding: 0.5rem 0.7rem !important;
    }
    .eye {
      position: absolute;
      right: 0%;
      top: 50%;
      cursor: pointer;
      padding: 0.6rem;
      transform: translate(-17%, -29%) !important;
      width: calc(2.8rem + 1vw);
    }
    .eye1,
    .eye2 {
      transform: translate(-17%, -42%) !important;
    }
    .eye4 {
      transform: translate(-17%, -27%) !important;
    }
    .xSign2 {
      transform: translate(-50%, -24%) !important;
      width: calc(2rem + 1vw);
      cursor: pointer;
      padding: 0.6rem;
      transform: translate(-12%, -36%) !important;
    }
    justify-content: space-around;
    .signInDiv h1 {
      font-size: calc(1.8rem + 1vw);
    }
    form {
      width: 90%;
      max-width: unset;
      min-width: unset;
      h1 {
        font-size: calc(2.5rem + 1vw);
      }
      input {
        font-size: calc(1.1rem + 0.3vw);
      }
      label {
        font-size: calc(1.3rem + 0.3vw);
      }
      button {
        font-size: calc(1.2rem + 0.3vw);
        padding: 0.4rem 1.3rem;
        border-radius: 6px;
      }
      #email,
      #password {
        margin-bottom: 1.3rem;
      }
    }
    .slider-Burger {
      display: flex;
    }
    .content {
      padding: unset;
    }
  }
`

export default ChangePassword
