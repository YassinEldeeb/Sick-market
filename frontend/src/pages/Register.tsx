import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ReactComponent as XSign } from '../img/xSign.svg'
import { ReactComponent as ClosedEye } from '../img/closedEye.svg'
import { ReactComponent as Eye } from '../img/eye.svg'

import { useDispatch, useSelector } from 'react-redux'
import userRegisterAction from '../actions/register'
import Message from '../components/message'
import Loader from '../components/loader'
import { useHistory, useLocation, Link } from 'react-router-dom'

const Register = () => {
  const inputRef = useRef(null)
  const inputRef2 = useRef(null)
  const [name, setName] = useState<any>('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [show, setShow] = useState(false)
  const [passwordMatch, SetpasswordMatch] = useState<any>(null)

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const submitHandler = (e: any) => {
    e.preventDefault()

    if (passwordValue !== confirmPasswordValue) {
      SetpasswordMatch("Password & Confirm Password don't match")
    } else {
      if (!name && !emailValue && !passwordValue) {
        SetpasswordMatch('name, Email and Password are Required')
      } else {
        if (!isNaN(name)) {
          SetpasswordMatch('Name must be alphabetical letters!')
        } else {
          SetpasswordMatch(null)
          dispatch(userRegisterAction(name, emailValue, passwordValue))
        }
      }
    }
  }

  const { loading, user, error } = useSelector((state: any) => state.userInfo)

  const search = location.search.replace('?redirect=', '')
  const redirect = search !== '/' ? search : '/verify'

  useEffect(() => {
    if (user.name) {
      history.push(redirect)
    }
  }, [user, history, redirect])

  const errorFunctionHandler = () => {
    if (passwordMatch) {
      return passwordMatch
    } else {
      if (error) {
        if (error.includes('mongo')) {
          return 'Server Error'
        }
        if (error.includes('timed out')) {
          return 'Network Error'
        }
        if (error.includes('is shorter than the minimum allowed length (8)')) {
          return 'Password is shorter than the minimum allowed length (8).'
        }
        switch (error) {
          case "User validation failed: password: Password can't contain any sort of 'password' keyword":
            return "Your Password can't contain any sort of the 'password' keyword."
          default:
            return error
        }
      } else {
        return 'ok'
      }
    }
  }

  useEffect(() => {
    if (passwordMatch || error) {
      window.scroll({
        top: 0,
        left: 0,
      })
    }
  }, [error, passwordMatch])

  return (
    <StyledRegister>
      <form onSubmit={submitHandler}>
        <h1>Sign Up</h1>
        <Message
          vibrating='true'
          visiblity={error || passwordMatch ? true : false}
          msg={errorFunctionHandler()}
          type='error'
        />

        <div className='name'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            id='name'
            type='text'
            onChange={(e) => setName(e.target.value)}
          />
          <XSign
            onClick={() => setName('')}
            style={{ display: `${name.length ? 'block' : 'none'}` }}
            className='xSign2'
          />
        </div>
        <div className='email'>
          <label htmlFor='email'>Email Address</label>
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
              const input = inputRef.current! as HTMLInputElement
              input.focus()
              setShow(!show)
              setTimeout(function () {
                input.selectionStart = input.selectionEnd = 10000
              }, 0)
            }}
          />
          <Eye
            style={{ display: `${!show ? 'none' : 'block'}` }}
            className='eye eye2'
            draggable='false'
            onClick={() => {
              const input = inputRef.current! as HTMLInputElement

              input.focus()
              setShow(!show)
              setTimeout(function () {
                input.selectionStart = input.selectionEnd = 10000
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
            type={`${show ? 'text' : 'password'}`}
            onChange={(e) => setConfirmPasswordValue(e.target.value)}
          />
          <ClosedEye
            style={{ display: `${show ? 'none' : 'block'}` }}
            className='eye eye1'
            draggable='false'
            onClick={() => {
              const input = inputRef.current! as HTMLInputElement

              input.focus()
              setShow(!show)
              setTimeout(function () {
                input.selectionStart = input.selectionEnd = 10000
              }, 0)
            }}
          />
          <Eye
            style={{ display: `${!show ? 'none' : 'block'}` }}
            className='eye eye2'
            draggable='false'
            onClick={() => {
              const input = inputRef.current! as HTMLInputElement

              input.focus()
              setShow(!show)
              setTimeout(function () {
                input.selectionStart = input.selectionEnd = 10000
              }, 0)
            }}
          />
        </div>

        <button className='registerBtn' type='submit'>
          Register {loading && <Loader />}
        </button>
        <p className='desktop'>
          Have an Account?{' '}
          <span className='register'>
            <Link to={`/login?redirect=${redirect}`}>Login</Link>
          </span>
        </p>
      </form>
      <p className='mobile'>
        Have an Account?{' '}
        <span className='register'>
          <Link to={`/login?redirect=${redirect}`}>Login</Link>
        </span>
      </p>
    </StyledRegister>
  )
}

const StyledRegister = styled.div`
  .eye2 {
    transform: translate(-50%, -16%) !important;
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
    transform: translate(-50%, -20%);
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
    margin-top: clamp(20px, 14vh, 80px);
    margin-bottom: 2.5rem;
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
    .registerBtn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.45rem 1.1rem;
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
  .desktop,
  .mobile {
    font-size: calc(0.9rem + 0.2vw);
    margin-top: 1.2rem;
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
    margin-top: 0.1rem;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  @media screen and (max-width: 1050px) {
    form {
      margin-bottom: 1rem;
    }
    .message {
      padding: 0.5rem 0.7rem !important;
    }
    .eye {
      position: absolute;
      right: 0%;
      top: 50%;
      cursor: pointer;
      transform: translate(-53%, -31%);
      width: calc(1.4rem + 1vw);
    }
    .eye2 {
      transform: translate(-53%, -28%) !important;
    }
    .xSign2 {
      transform: translate(-46%, -26%) !important;
      width: calc(1.2rem + 1vw);
      cursor: pointer;
    }
    justify-content: space-around;
    form {
      margin-top: 1.1rem;
      margin-bottom: 0;
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
        padding: 0.5rem 1.1rem;
        border-radius: 6px;
      }
      #email,
      #password {
        margin-bottom: 1.3rem;
      }
    }
    .mobile {
      margin: 1.8rem 0;
      display: block;
      font-size: calc(1.1rem + 0.2vw);
    }
    .desktop {
      display: none;
    }
    .filepond--drop-label.filepond--drop-label label {
      font-size: calc(0.9rem + 1vw) !important;
    }
    .filepond--wrapper {
      align-self: center;
      width: 12rem;
      margin-bottom: 0.65rem;
    }
    .filepond--root.filepond--hopper {
      height: 12rem !important;
    }
  }
  .filepond--drop-label.filepond--drop-label label {
    font-size: 1.2rem;
  }
`

export default Register
