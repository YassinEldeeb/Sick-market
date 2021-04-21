import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import xSign from '../img/xSign.svg'
import closedEye from '../img/closedEye.svg'
import eye from '../img/eye.svg'
import { useDispatch, useSelector } from 'react-redux'
import userLoginAction from '../actions/login'
import Message from '../components/message'
import Loader from '../components/loader'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import dotenv from 'dotenv'
import loginWithGoogle from '../actions/loginWithGoogle'

const Login = () => {
  dotenv.config()
  const inputRef = useRef(null)
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userLoginAction(emailValue, passwordValue))
  }

  const { loading, user, error } = useSelector((state) => state.userInfo)

  const search = location.search.replace('?redirect=', '')
  const redirect = search ? search : '/'

  useEffect(() => {
    if (user.name) {
      history.push(redirect)
    }
  }, [user, history, redirect])

  const responseGoogle = (response) => {
    let userObj
    if (
      response.error &&
      response.error !== 'idpiframe_initialization_failed'
    ) {
      if (response.error === 'popup_closed_by_user') {
        return
      }
    } else {
      if (response.profileObj) {
        dispatch(
          loginWithGoogle(
            response.profileObj.givenName +
              ' ' +
              response.profileObj.familyName,
            response.profileObj.email,
            response.profileObj.imageUrl.replace('s96', 's250')
          )
        )
      }
      localStorage.setItem('sickUserInfo', JSON.stringify(userObj))
    }
  }

  return (
    <StyledLogin>
      <form onSubmit={submitHandler}>
        <div className='signInDiv'>
          <h1>Sign In</h1>
          <GoogleLogin
            className='googleBtn'
            clientId='25823829212-0hmuh788jgci6d908u0u1q6nmkcmc1pc.apps.googleusercontent.com'
            buttonText='Continue'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <Message
          vibrating='true'
          visiblity={error ? true : false}
          msg={
            error
              ? error.includes('timed out')
                ? 'Network Error'
                : error.includes('mongo')
                ? 'Server Error'
                : error
              : 'Ok'
          }
          type='error'
        />
        <div className='email'>
          <label htmlFor='email'>Email Address</label>
          <input
            value={emailValue}
            id='email'
            type='text'
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <img
            onClick={() => setEmailValue('')}
            style={{ display: `${emailValue.length ? 'block' : 'none'}` }}
            className='xSign2'
            src={xSign}
            alt='X icon'
          />
        </div>
        <div className='password'>
          <label htmlFor='password'>Password</label>
          <input
            ref={inputRef}
            value={passwordValue}
            id='password'
            type={`${show ? 'text' : 'password'}`}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <img
            style={{ display: `${show ? 'none' : 'block'}` }}
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
          <Link to='/forgotPassword' className='forgotPassword'>
            Forgot Password?
          </Link>
          <img
            style={{ display: `${!show ? 'none' : 'block'}` }}
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
        <button type='submit'>Login {loading && <Loader />}</button>
        <p className='desktop'>
          New Customer?{' '}
          <span className='register'>
            <Link to={`/register?redirect=${redirect}`}>Register</Link>
          </span>
        </p>
      </form>
      <p className='mobile'>
        New Customer?{' '}
        <span className='register'>
          <Link to={`/register?redirect=${redirect}`}>Register</Link>
        </span>
      </p>
    </StyledLogin>
  )
}

const StyledLogin = styled.div`
  .forgotPassword {
    text-align: end;
    margin-top: 0.5rem;
    color: #0084a0;
    width: max-content;
    align-self: flex-end;
  }
  .googleBtn {
    border-radius: 6px !important;
    div:first-child {
      display: flex;
      margin-right: 0px !important;
      padding-right: 8px !important;
    }
  }
  .eye2 {
    transform: translate(-50%, -55%) !important;
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
  .eye {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-50%, -54%);
    width: calc(1.8rem + 0.3vw);
    cursor: pointer;
  }
  .mobile {
    display: none;
  }
  .desktop {
    display: block;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 35%;
    justify-content: center;
    margin-bottom: 0.5rem;

    h1 {
      color: #1a1a1a;
      font-weight: 500;
      font-size: calc(2rem + 1vw);
      margin-bottom: 0.1rem;
    }
    .signInDiv {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .email,
    .password {
      display: flex;
      flex-direction: column;
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
      padding: 0.35rem 1.4rem;
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
  .desktop,
  .mobile {
    font-size: calc(0.9rem + 0.2vw);
    margin-top: 1rem;
    span a {
      color: #0084a0;
      cursor: pointer;
      transition: 0.1s;

      &:hover {
        color: #0094b6;
      }
    }
  }
  .message {
    margin-bottom: 0.5rem;
    margin-top: 0.1rem;
    padding: 0.55rem 0.8rem !important;
  }
  @media screen and (max-width: 1050px) {
    .forgotPassword {
      margin-top: 0.65rem;
      margin-bottom: 0.325rem;
    }
    .message {
      padding: 0.5rem 0.7rem !important;
    }
    .eye {
      position: absolute;
      right: 0%;
      top: 50%;
      cursor: pointer;
      padding: 0.6rem;
      transform: translate(-18%, -60%);
      width: calc(2.8rem + 1vw);
    }
    .eye2 {
      transform: translate(-18%, -60%) !important;
    }
    .xSign2 {
      transform: translate(-50%, -24%) !important;
      width: calc(2rem + 1vw);
      cursor: pointer;
      padding: 0.6rem;
      transform: translate(-12%, -36%) !important;
    }
    justify-content: space-around;
    form {
      width: 90%;
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
      #password {
        margin-bottom: 0rem;
      }
    }
    .mobile {
      margin-bottom: 1.2rem;
      display: block;
      font-size: calc(1.1rem + 0.2vw);
    }
    .desktop {
      display: none;
    }
  }
`

export default Login
