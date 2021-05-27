import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ReactComponent as XSign } from '../img/xSign.svg'
import { ReactComponent as ClosedEye } from '../img/closedEye.svg'
import { ReactComponent as Eye } from '../img/eye.svg'
import { useDispatch, useSelector } from 'react-redux'
import userUpdateAction from '../actions/update'
import Message from '../components/message'
import Loader from '../components/loader'
import { useHistory, useLocation } from 'react-router-dom'
import dotenv from 'dotenv'
import Goback from '../components/Goback'

const ChangeEmail = () => {
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

    dispatch(userUpdateAction(null, emailValue, passwordValue))
  }

  const { updateLoading, user, updateError, updated } = useSelector(
    (state) => state.userInfo
  )

  const search = location.search.split('=')[1]
  const redirect = search ? search : '/'

  useEffect(() => {
    if (updated) history.push(redirect)
  }, [updated, history, redirect])

  useEffect(() => {
    if (!user || user.status !== 'pending') {
      history.push('/')
    }
  }, [user, history, redirect])
  return (
    <>
      <Goback providedClassName='gobackMessage' toPath='/verify' />
      <StyledLogin>
        <form onSubmit={submitHandler}>
          <div className='signInDiv'>
            <h1>Change Email</h1>
          </div>
          <Message
            vibrating='true'
            visiblity={updateError ? true : false}
            msg={
              updateError
                ? updateError.includes('timed out')
                  ? 'Network Error'
                  : updateError.includes('mongo')
                  ? 'Server Error'
                  : updateError
                : 'Ok'
            }
            type='error'
          />
          <div className='email'>
            <label htmlFor='email'>New Email Address</label>
            <input
              value={emailValue}
              id='email'
              type='text'
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <XSign
              onClick={() => setEmailValue('')}
              style={{ display: `${emailValue.length ? 'block' : 'none'}` }}
              className='xSign2'
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
            <ClosedEye
              style={{ display: `${show ? 'none' : 'block'}` }}
              className='eye eye1'
              draggable='false'
              onClick={() => {
                inputRef.current.focus()
                setShow(!show)
                setTimeout(function () {
                  inputRef.current.selectionStart =
                    inputRef.current.selectionEnd = 10000
                }, 0)
              }}
            />
            <Eye
              style={{ display: `${!show ? 'none' : 'block'}` }}
              className='eye eye2'
              draggable='false'
              onClick={() => {
                inputRef.current.focus()
                setShow(!show)
                setTimeout(function () {
                  inputRef.current.selectionStart =
                    inputRef.current.selectionEnd = 10000
                }, 0)
              }}
            />
          </div>
          <button type='submit'>Update {updateLoading && <Loader />}</button>
        </form>
      </StyledLogin>
    </>
  )
}

const StyledLogin = styled.div`
  position: relative;
  .googleBtn {
    border-radius: 6px !important;
    div:first-child {
      display: flex;
      margin-right: 0px !important;
      padding-right: 8px !important;
    }
  }
  .eye2 {
    transform: translate(-50%, -15%) !important;
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
    transform: translate(-50%, -21%);
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
  justify-content: flex-start;
  flex: 1 1 auto;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 35%;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: calc(1.2rem + 1vh);
    h1 {
      color: #1a1a1a;
      font-weight: 500;
      font-size: calc(1.85rem + 1vw);
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
    .message {
      padding: 0.5rem 0.7rem !important;
    }
    .eye {
      position: absolute;
      right: 0%;
      top: 50%;
      cursor: pointer;
      transform: translate(-50%, -32%);
      width: calc(1.4rem + 1vw);
    }
    .eye2 {
      transform: translate(-50%, -28%) !important;
    }
    .xSign2 {
      transform: translate(-50%, -28%) !important;
      width: calc(1rem + 1vw);
      cursor: pointer;
    }
    form {
      width: 90%;
      h1 {
        font-size: calc(2rem + 1vw);
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

export default ChangeEmail
