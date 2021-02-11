import React, { useState, useEffect } from "react"
import styled from "styled-components"
import xSign from "../img/xSign.svg"
import Message from "../components/message"
import Loader from "../components/loader"
import { useDispatch, useSelector } from "react-redux"
import resetPasswordEmail from "../actions/resetPasswordEmail"
import Goback from "../components/Goback"
import { useHistory } from "react-router-dom"
import PopupMessage from "../components/PopupMessage"

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const [emailValue, setEmailValue] = useState("")
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(resetPasswordEmail(emailValue))
  }
  const { error, resetLoading, user, sent } = useSelector(
    (state) => state.userInfo
  )
  const history = useHistory()

  useEffect(() => {
    if (user.name) {
      history.push("/")
    }
  }, [user])
  const [warning, setWarning] = useState(false)
  return (
    <>
      <Goback providedClassName={"goBackForgotPassword"} />
      {sent && (
        <PopupMessage
          setWarning={setWarning}
          timer={5}
          desc={
            <p>
              Check Your email to verify It's you
              <br /> and Reset your Password
            </p>
          }
          title='Email Sent'
          type={"ok"}
        />
      )}
      <StyledForgot>
        <div className='cont'>
          <h1>Forgot Password</h1>
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
                : ""
            }
            type='error'
          />
          <form onSubmit={submitHandler}>
            <label htmlFor='email'>Email</label>
            <div className='email'>
              <input
                onChange={(e) => setEmailValue(e.target.value)}
                value={emailValue}
                type='text'
                id='email'
              />
              <img
                onClick={() => setEmailValue("")}
                style={{ display: `${emailValue.length ? "block" : "none"}` }}
                className='xSign2'
                src={xSign}
                alt='X icon'
              />
            </div>
            <button type='submit'>
              Send
              {resetLoading && <Loader />}
            </button>
          </form>
        </div>
      </StyledForgot>
    </>
  )
}
const StyledForgot = styled.div`
  .cont {
    margin-top: clamp(20px, 14vh, 80px);
    width: 35%;
    max-width: 606px;
  }
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1 1 auto;
  .xSign2 {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-50%, -70%);
    width: calc(0.75rem + 1vw);
    cursor: pointer;
    padding: 0.2rem;
  }
  h1 {
    color: #1a1a1a;
    font-weight: 500;
    font-size: calc(2rem + 1vw);
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    justify-content: center;
    margin-bottom: 0.5rem;
    margin-top: 0.3rem;

    .email {
      position: relative;
      img {
      }
      input {
        width: 100%;
        background: #f3f3f3;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        width: 100%;
        font-size: calc(1rem + 0.3vw);
      }
    }
    label {
      font-size: calc(1rem + 0.3vw);
      color: #343a40;
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
    #password {
      margin-bottom: 1rem;
      margin-top: 0.3rem;
      padding-right: 2.8rem;
    }
    #password {
      margin-bottom: 0rem;
    }
  }
  @media screen and (max-width: 1050px) {
    .cont {
      width: 90%;
    }
    .xSign2 {
      transform: translate(-50%, -24%) !important;
      width: calc(2rem + 1vw);
      cursor: pointer;
      padding: 0.6rem;
      transform: translate(-12%, -65%) !important;
    }
    form {
      align-items: stretch;
    }
    button {
      align-self: flex-start;
    }
  }
`

export default ForgotPassword
