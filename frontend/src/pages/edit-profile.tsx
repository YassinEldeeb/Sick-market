import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FilePondUpload from '../components/filePondUpload'
import styled from 'styled-components'
import { ReactComponent as XSign } from '../img/xSign.svg'
import { ReactComponent as ClosedEye } from '../img/closedEye.svg'
import { ReactComponent as Eye } from '../img/eye.svg'
import userProfileAction from '../actions/getProfile'
import Message from '../components/message'
import Loader from '../components/loader'
import userUpdateAction from '../actions/update'
import deleteProfilePicAction from '../actions/deleteProfilePic'
import { useLocation, useHistory } from 'react-router-dom'
import PopupMessage from '../components/PopupMessage'
import { Link } from 'react-router-dom'

const EditProfile = () => {
  const inputRef = useRef(null)
  const {
    token,
    user,
    profileLoading,
    updateError,
    updateLoading,
    updated,
    deleteProfilePicLoading,
    success,
  } = useSelector((state: any) => state.userInfo)
  const userInfo = useSelector((state: any) => state.userInfo)
  const [emailValue, setEmailValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [show, setShow] = useState(false)

  function truncate(str = '') {
    return str.length > 15 ? str.substr(0, 15 - 1) + '..' : str
  }

  const location = useLocation()
  const history = useHistory()

  const dispatch = useDispatch()
  const [error, setError] = useState<any>('')

  useEffect(() => {
    if (token) {
      dispatch(userProfileAction())
    } else {
      history.push('/login')
    }
  }, [dispatch, history])

  useEffect(() => {
    if (user) {
      setNameValue(user.name)
      setEmailValue(user.email)
    }
  }, [user])
  const submitHandler = (e: any) => {
    e.preventDefault()
    setError(null)
    setWarning(true)
    if (!isNaN(nameValue as any)) {
      setError('Name must be alphabetical letters!')
    } else {
      dispatch(
        userUpdateAction(
          nameValue,
          emailValue !== user.email ? emailValue : null,
          passwordValue.length ? passwordValue : null
        )
      )
    }
  }

  useEffect(() => {
    if (updateError || updated || error) {
      document.querySelector('.content')!.scroll({
        top: 0,
        left: 0,
        behavior: `${updated ? 'smooth' : 'auto'}`,
      })
    }
  }, [updateError, updated, error])

  const removePictureHandler = () => {
    dispatch(deleteProfilePicAction())
  }
  const imgSrcCondition = () => {
    if (
      userInfo.user.profilePicLink &&
      userInfo.user.profilePicLink !== 'cleared'
    ) {
      return userInfo.user.profilePicLink
    } else {
      return (
        `/api/users/profilePic/${userInfo.user._id}?` + new Date().getTime()
      )
    }
  }
  useEffect(() => {
    if (!deleteProfilePicLoading) {
      const img1 = document.querySelector('#profileIMG') as HTMLImageElement
      if (img1) {
        img1.src = imgSrcCondition()
      }
      const img2 = document.querySelector(
        '.profile-mobile-pic img'
      ) as HTMLImageElement
      if (img2) {
        img2.src = imgSrcCondition()
      }
    }
  }, [deleteProfilePicLoading, user._id, user.profilePicLink])

  const [warning, setWarning] = useState(true)

  return (
    <StyledEdit>
      {updated && warning && (
        <PopupMessage
          setWarning={setWarning}
          title='Updated'
          type='ok'
          desc='Your Profile Info has been updated Successfully!'
          timer={5}
          oneTime={false}
        />
      )}
      <div className='content'>
        {profileLoading && <Loader />}
        {!profileLoading && (
          <div className='wrapper'>
            <div className='profile-section'>
              <FilePondUpload />

              <div className='desc'>
                {user && <h1>{truncate(user.name)}</h1>}
                {user.availablePic && (
                  <button
                    onClick={removePictureHandler}
                    style={{
                      background: `${deleteProfilePicLoading ? '#ff5555' : ''}`,
                      color: `${deleteProfilePicLoading ? 'white' : ''}`,
                    }}
                  >
                    Default Avatar {deleteProfilePicLoading && <Loader />}
                  </button>
                )}
              </div>
            </div>
            <Message
              vibrating='true'
              visiblity={error ? error : updateError ? true : false}
              msg={error ? error : updateError}
              type='error'
            />
            <form onSubmit={submitHandler}>
              <div className='name'>
                <label htmlFor='name'>Name</label>
                <input
                  value={nameValue}
                  id='name'
                  type='text'
                  onChange={(e) => setNameValue(e.target.value)}
                />
                <XSign
                  onClick={() => setNameValue('')}
                  style={{ display: `${nameValue.length ? 'block' : 'none'}` }}
                  className='xSign1'
                />
              </div>
              {user.profilePicLink && (
                <>
                  <div className='email'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                      onChange={() => 's'}
                      value={emailValue}
                      id='email'
                      type='text'
                      disabled={true}
                      className='google-input'
                    />
                  </div>
                </>
              )}
              {!user.profilePicLink && (
                <>
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
                      style={{
                        display: `${emailValue.length ? 'block' : 'none'}`,
                      }}
                      className='xSign2'
                    />
                  </div>
                  {user.status !== 'Verified' && (
                    <div className='notVerified'>
                      <p>
                        Your Email isn't verified!, You can't order anything
                        unless you go to{' '}
                        <Link to={`/verify?redirect=/account/edit-profile`}>
                          Verify your Email.
                        </Link>
                      </p>
                    </div>
                  )}
                </>
              )}
              {!user.profilePicLink && (
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
              )}
              <button>Save Changes {updateLoading && <Loader />}</button>
            </form>
          </div>
        )}
      </div>
    </StyledEdit>
  )
}
const StyledEdit = styled.div`
  .notVerified {
    background: #f7dddc;
    padding: 0.8rem;
    border-radius: 6px;
    width: 100%;
    margin-bottom: 1rem;
    color: rgb(113, 43, 41);
    border: 1px solid rgba(56, 0, 0, 0.08);
    font-weight: 500;
    font-size: calc(0.78rem + 0.3vw);
    a {
      white-space: nowrap;
      color: #0084a0;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .google-input {
    color: #1a1a1a;
    cursor: not-allowed !important;
  }
  .message {
    padding: 0.55rem 0.9rem !important;
  }
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
    padding: 1rem 0.5rem;
    width: 49px;
    height: 49px;
    border-radius: 50%;
    span {
      width: 1.8rem !important;
      height: 0.18rem !important;
      margin: 0.18rem 0 !important;
      background: white;
      border-radius: 1px;
      transition: 0.3s ease;
    }
  }
  .message {
    height: max-content !important;
    margin-top: calc(0.5rem + 0.5vh);
  }
  .eye {
    position: absolute;
    right: 0%;
    top: 50%;
    cursor: pointer;
    transform: translate(-45%, -20%) !important;

    width: calc(1.3rem + 1vw);
  }
  .eye2 {
    transform: translate(-45%, -15%) !important;
  }
  .wrapper {
    width: 50%;
    max-width: 606px;
    min-width: max-content;
  }
  display: flex;
  flex: 1 1 auto;
  .content {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: auto;
    padding-top: 2.5rem;
  }
  .filepond--wrapper {
    width: calc(6rem + 7vw) !important;
    height: calc(6rem + 7vw) !important;
  }
  .filepond--list li {
    height: 100% !important;
  }
  .filepond--root.filepond--hopper {
    height: 100% !important;
  }
  .filepond--credits {
    display: none !important;
  }
  .profile-section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .desc {
      margin-left: calc(1.1rem + 0.2vw);
      h1 {
        font-weight: 500;
        color: #1a1a1a;
        margin-bottom: 0.45rem;
        font-size: calc(2.2rem + 0.5vw);
      }
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        #loader:first-child {
          width: calc(0.9rem + 0.5vw);
          height: calc(0.9rem + 0.5vw);
          margin-left: 0.45rem;
          #greybackground path {
            stroke: white;
          }
        }
      }
      button {
        padding: 0.45rem 0.75rem;
        border: none;
        font-size: calc(0.8rem + 0.3vw);
        border-radius: 7px;
        cursor: pointer;
        transition: 0.3s ease;
        font-weight: 500;
        color: #1a1a1a;
        &:hover {
          background: #ff5555;
          color: white;
        }
      }
    }
  }
  .xSign2,
  .xSign1 {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-50%, -12%);
    width: calc(0.75rem + 1vw);
    cursor: pointer;
    padding: 0.2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 606px;
    justify-content: center;
    margin-bottom: calc(2rem + 0.5vh);
    margin-top: calc(0.5rem + 0.5vh);

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
    .name,
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
        display: block;
      }
    }
    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.62rem 0.8rem;
      border: none;
      background: #00b2d8;
      color: white;
      border-radius: 6px;
      font-size: calc(0.9rem + 0.3vw);
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
    #name,
    #email,
    #password {
      margin-bottom: 1rem;
      margin-top: 0.3rem;
      padding-right: 2.8rem;
    }
  }
  .slider-Burger {
    display: none;
    cursor: pointer;
  }
  .slider-shadow {
    display: none;
  }
  @media screen and (max-width: 1050px) {
    .notVerified {
      padding: 0.7rem;
      font-size: calc(0.7rem + 0.3vw);
    }
    .slider-shadow {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      transition: 0.3s ease 0.15s;
    }
    .slider-Burger {
      display: flex;
    }
    .message {
      padding: 0.5rem 0.7rem !important;
    }
    .eye {
      position: absolute;
      right: 0%;
      top: 50%;
      cursor: pointer;
      transform: translate(-45%, -35%) !important;
      width: calc(1.5rem + 1vw);
    }
    .eye2 {
      transform: translate(-45%, -32%) !important;
    }
    .xSign2,
    .xSign1 {
      width: calc(1.2rem + 1vw);
      cursor: pointer;
      transform: translate(-50%, -30%) !important;
    }

    justify-content: space-around;
    form {
      max-width: unset;
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
        font-size: calc(0.95rem + 0.3vw);
        padding: 0.6rem 0.8rem;
        border-radius: 6px;
      }
      #email,
      #password {
        margin-bottom: 1.3rem;
      }
    }
    .wrapper {
      width: 90%;
      min-width: unset;
      max-width: unset;
      margin-top: unset;
    }
    .content {
      margin-left: unset !important;
      justify-content: flex-start;
      margin-top: calc(0.85rem + 0.4vw);
      padding-top: unset;
    }
    form {
      margin-top: unset !important;
    }
    .desc {
      h1 {
        font-size: calc(1.3rem + 0.5vw) !important;
      }
      button {
        font-size: calc(0.75rem + 0.3vw) !important;
        padding: 0.45rem 0.7rem !important;
      }
    }
    flex-direction: column;
  }
`

export default EditProfile
