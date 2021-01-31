import React, { useEffect, useState } from "react"
import styled from "styled-components"
import verifyEmailAction from "../actions/verifyEmail"
import danger from "../img/danger.svg"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/message"
import Loader from "../components/loader"
import { Link, useHistory } from "react-router-dom"
import newCodeAction from "../actions/newCode"

const Verify = () => {
  const [code, setCode] = useState("")
  const [codeError, setCodeError] = useState("")
  const {
    verificationError,
    verifyLoading,
    user,
    newCodeError,
    newCodeLoading,
  } = useSelector((state) => state.userInfo)
  const [timer, setTimer] = useState(0)
  const [startTimer, setStartTimer] = useState(false)
  const status = user ? user.status : ""

  const [timerSeconds, setTimerSeconds] = useState(
    localStorage.getItem("sickTimerSeconds")
      ? JSON.parse(localStorage.getItem("sickTimerSeconds"))
      : 60
  )

  let timerInterval
  useEffect(() => {
    if (startTimer && !timerInterval) {
      timerInterval = setTimeout(() => {
        if (timer > 0) {
          setTimer((prevTime) => prevTime - 1)
          localStorage.setItem("sickTimerSeconds", timer)
        } else {
          setStartTimer(false)
          localStorage.removeItem("sickTimerSeconds")
        }
      }, 1000)
    }
  }, [startTimer, timer])

  const dispatch = useDispatch()
  const verifyHandler = (e) => {
    setCodeError("")
    e.preventDefault()

    if (code.length === 4) {
      dispatch(verifyEmailAction(Number(code)))
    } else {
      setCodeError("Code must be 4 Digits")
    }
  }
  const sendAgainHandler = () => {
    if (!startTimer) {
      setTimer(60)
      setStartTimer(true)
    }

    dispatch(newCodeAction())
  }

  const history = useHistory()

  useEffect(() => {
    console.log("USER", user)
    if (user) {
      if (status === "Verified") {
        history.push("/")
      }
    } else {
      history.push("/")
    }
  }, [status, user])

  useEffect(() => {
    dispatch(newCodeAction())
  }, [])

  useEffect(() => {
    if (!startTimer && newCodeError) {
      setTimer(timerSeconds)
      setStartTimer(true)
    }
  }, [newCodeError])

  useEffect(() => {
    if (newCodeLoading === false && !newCodeError) {
      setTimer(60)
      if (!startTimer) setStartTimer(true)
    } else if (newCodeError === "Email already Verified") {
      history.push("/")
    }
  }, [newCodeLoading])

  return (
    <StyledVerify>
      <div className='modelBox'>
        <div className='danger'>
          <div className='danger-text'>
            <img src={danger} alt='danger' />
            <p>
              If you didn’t find the email in your Inbox, maybe It’s in your
              Spam box
            </p>
          </div>
          <div className='theRest'>
            <h1>Enter Code to Verify</h1>
            <Message
              vibrating='true'
              visiblity={
                codeError.length
                  ? codeError
                  : verificationError && !verifyLoading
                  ? true
                  : false
              }
              msg={
                codeError.length
                  ? codeError
                  : verificationError
                  ? verificationError.includes("timed out")
                    ? "Network Error"
                    : verificationError.includes("mongo")
                    ? "Server Error"
                    : verificationError
                  : "Ok"
              }
              type='error'
            />
            <form className='verifyBtns' onSubmit={verifyHandler}>
              {user && newCodeLoading === false && !newCodeError && (
                <p className='emailSentMessage'>
                  Email Sent to '{user.email}'{" "}
                  <Link to='/changeEmail?redirect=verify'>Change Email</Link>
                </p>
              )}
              <input
                maxLength={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type='number'
                id='code'
                placeholder='4 Digits Code'
              />
              <div className='btns'>
                <button type='submit'>
                  Verify {verifyLoading && <Loader />}
                </button>
                <p
                  className={`${startTimer ? "waitActive" : ""}`}
                  onClick={sendAgainHandler}
                >
                  {timer ? `Send again(${timer})` : "Send again"}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StyledVerify>
  )
}
const StyledVerify = styled.div`
  .emailSentMessage {
    margin: 0.35rem 0;
    margin-bottom: 0.5rem;
    color: #3e3e3e;
    font-size: calc(1rem + 0.2vw);
    a {
      color: #0084a0;
    }
  }
  .waitActive {
    filter: grayscale(0.2);
    opacity: 0.7;
    pointer-events: none;
  }
  .message {
    align-self: flex-start;
    margin-bottom: calc(0.1rem + 0.2vh);
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  .modelBox {
    border-radius: 12px;
    box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
  }

  .danger {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    .danger-text {
      padding: 0.9rem calc(1.5rem + 1vw);
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fffbd6;
      width: 100%;
      img {
        width: calc(1.4rem + 0.05vw);
        height: calc(1.4rem + 0.05vw);
        margin-right: 0.4rem;
      }
      p {
        font-size: calc(0.85rem + 0.3vw);
        color: #715100;
      }
    }
  }
  .theRest {
    padding: calc(1.5rem + 1vw);
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
      color: #1a1a1a;
      font-weight: 500;
      font-size: calc(2.2rem + 0.3vw);
      align-self: flex-start;
    }
    input {
      background: #f3f3f3;
      border: none;
      border-radius: 5px;
      font-size: calc(1.1rem + 0.3vw);
      padding: 0.5rem 1rem;
      margin-bottom: calc(2rem + 1vh);
    }
    .verifyBtns {
      display: flex;
      flex-direction: column;
      width: 100%;
      button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem 1.3rem;
        border: none;
        color: white;
        background: #00b2d8;
        border-radius: 6px;
        font-size: calc(1.2rem + 0.3vw);
        cursor: pointer;
        transition: 0.1s ease;
        &:hover {
          background: #00bde7;
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
      .btns {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        p {
          font-size: calc(0.9rem + 0.2vw);
          cursor: pointer;
          color: #0084a0;
        }
      }
    }
  }
  @media screen and (max-width: 1050px) {
    .emailSentMessage {
      font-size: calc(0.9rem + 0.2vw);
    }
    .message {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      padding: 0.5rem 0.55rem !important;
      margin-bottom: 0 !important;
      span {
        font-size: calc(0.7rem + 0.1vw) !important;
      }
    }
    margin-top: calc(2rem + 0.3vh);
    align-items: flex-start;
    .danger {
      .danger-text {
        padding: 0.9rem calc(1rem + 1vw);
        img {
          width: calc(1.3rem + 0.05vw);
          height: calc(1.3rem + 0.05vw);
          margin-right: 0.55rem;
        }
        p {
          font-size: calc(0.7rem + 0.3vw);
        }
      }
    }
    .theRest {
      padding: calc(0.85rem + 1vw) calc(1rem + 1vw) calc(1rem + 1vw)
        calc(1rem + 1vw);
      h1 {
        font-size: calc(1.6rem + 0.3vw);
      }
      input {
        margin-bottom: calc(1rem + 0.3vh);
      }
    }
    .modelBox {
      width: 90%;
      border: unset;
      border-radius: 12px;
      box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);
    }
    .verifyBtns {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
`

export default Verify
