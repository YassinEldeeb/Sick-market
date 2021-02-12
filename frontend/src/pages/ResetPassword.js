import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import closedEye from "../img/closedEye.svg"
import eye from "../img/eye.svg"
import Message from "../components/message"
import Loader from "../components/loader"
import resetPassword from "../actions/resetPassword"
import { useHistory, useLocation, Link } from "react-router-dom"

const ResetPassword = () => {
  const inputRef = useRef(null)
  const inputRef2 = useRef(null)
  const { reset2Loading, error, reset, user } = useSelector(
    (state) => state.userInfo
  )

  const [passwordValue, setPasswordValue] = useState("")
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
  const [confirmPasswordValid, setConfirmPasswordValid] = useState("")
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const token = location.search.split("=")[1]

  useEffect(() => {
    if (!token) {
      history.push("/forgotPassword")
    }
  }, [])
  const submitHandler = (e) => {
    e.preventDefault()
    setConfirmPasswordValid("")
    if (!confirmPasswordValue || !passwordValue) {
      setConfirmPasswordValid("Password & Confirm Password are required")
      return
    } else if (confirmPasswordValue !== passwordValue) {
      setConfirmPasswordValid("Password & Confirm Password don't match")
      return
    } else {
      setConfirmPasswordValid("")
      dispatch(resetPassword(passwordValue, token))
    }
  }

  useEffect(() => {
    if (reset) history.push("/login")
  }, [history, reset])

  useEffect(() => {
    if (user.name) {
      history.push("/")
    }
  }, [user])
  const messageError = () => {
    if (confirmPasswordValid) {
      return confirmPasswordValid
    } else if (error) {
      if (error.includes("timed out")) {
        return "Network Error"
      } else if (error.includes("mongo")) {
        return "Server Error"
      } else if (
        error.includes("jwt expired") ||
        error.includes("Link Expired")
      ) {
        return (
          <p>
            Send a Reset Password Email at{" "}
            <Link className='ForgotLink' to='forgotPassword'>
              Forgot Password
            </Link>
          </p>
        )
      } else {
        return error
      }
    } else {
      return ""
    }
  }
  return (
    <StyledReset>
      <div className='content'>
        <h1>Reset Password</h1>
        <Message
          vibrating='true'
          visiblity={
            confirmPasswordValid ? confirmPasswordValid : error ? true : false
          }
          msg={messageError()}
          type='error'
        />
        <form onSubmit={submitHandler}>
          <div className='password'>
            <label htmlFor='password'>Password</label>
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
          <div className='password'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              ref={inputRef2}
              value={confirmPasswordValue}
              id='confirmPassword'
              type={`${show ? "text" : "password"}`}
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
            />
            <img
              style={{ display: `${show ? "none" : "block"}` }}
              className='eye eye1'
              src={closedEye}
              alt='closedEye'
              draggable='false'
              onClick={() => {
                inputRef2.current.focus()
                setShow(!show)
                setTimeout(function () {
                  inputRef2.current.selectionStart = inputRef2.current.selectionEnd = 10000
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
                inputRef2.current.focus()
                setShow(!show)
                setTimeout(function () {
                  inputRef2.current.selectionStart = inputRef2.current.selectionEnd = 10000
                }, 0)
              }}
            />
          </div>
          <button type='submit'>
            Send
            {reset2Loading && <Loader />}
          </button>
        </form>
      </div>
    </StyledReset>
  )
}
const StyledReset = styled.div`
  .ForgotLink {
    color: rgba(113, 43, 41, 0.9);
    text-decoration: underline;
    &:hover {
      color: rgba(113, 43, 41, 1);
    }
  }
  .message {
    margin-bottom: 0.5rem;
  }
  width: 90%;
  margin: 0 auto;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 35%;

  h1 {
    color: #1a1a1a;
    font-weight: 500;
    font-size: calc(2rem + 1vw);
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 0.5rem;
    width: 100%;
    max-width: 606px;
  }
  .eye2 {
    transform: translate(-50%, 8%) !important;
  }
  .eye {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-50%, -6%);
    width: calc(1.8rem + 0.3vw);
    cursor: pointer;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    justify-content: center;
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
    .email,
    .password,
    .name {
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
      padding: 0.35rem 1.2rem;
      border: none;
      background: #00b2d8;
      color: white;
      border-radius: 6px;
      font-size: calc(1.2rem + 0.3vw);
      cursor: pointer;
      transition: 0.1s;
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
    #password,
    #confirmPassword,
    #name {
      margin-bottom: 1rem;
      margin-top: 0.3rem;
      padding-right: 2.8rem;
    }
  }
  @media screen and (max-width: 1050px) {
    width: 90%;
    .eye {
      position: absolute;
      right: 0%;
      top: 50%;
      cursor: pointer;
      padding: 0.6rem;
      transform: translate(-18%, -36%);
      width: calc(2.8rem + 1vw);
    }
    .eye2 {
      transform: translate(-18%, -35%) !important;
    }
    .message {
      padding: 0.5rem 0.7rem !important;
    }
  }
`

export default ResetPassword
