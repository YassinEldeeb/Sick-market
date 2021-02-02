import React, { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import SlideBar from "../components/slidebar"
import FilePondUpload from "../components/filePondUpload"
import styled from "styled-components"
import xSign from "../img/xSign.svg"
import closedEye from "../img/closedEye.svg"
import eye from "../img/eye.svg"
import userProfileAction from "../actions/getProfile"
import Message from "../components/message"
import Loader from "../components/loader"
import userUpdateAction from "../actions/update"
import deleteProfilePicAction from "../actions/deleteProfilePic"

const EditProfile = () => {
  const inputRef = useRef(null)
  const {
    user,
    profileLoading,
    updateError,
    updateLoading,
    updated,
    deleteProfilePicLoading,
  } = useSelector((state) => state.userInfo)
  const [emailValue, setEmailValue] = useState("")
  const [nameValue, setNameValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [show, setShow] = useState(false)

  function truncate(str) {
    return str.length > 15 ? str.substr(0, 15 - 1) + ".." : str
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userProfileAction())
  }, [dispatch])
  useEffect(() => {
    if (user) {
      setNameValue(user.name)
      setEmailValue(user.email)
    }
  }, [user])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userUpdateAction(nameValue, emailValue, passwordValue))
  }
  useEffect(() => {
    if (updateError || updated) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: `${updated ? "smooth" : "auto"}`,
      })
    }
  }, [updateError, updated])

  const removePictureHandler = () => {
    dispatch(deleteProfilePicAction())
  }
  useEffect(() => {
    if (!deleteProfilePicLoading) {
      document.querySelector(".profilePic img").src =
        `/api/users/profilePic/${user._id}?` + new Date().getTime()
    }
  }, [deleteProfilePicLoading])

  const [slider, setSlider] = useState(false)
  return (
    <StyledEdit>
      <SlideBar setSlider={setSlider} slider={slider} />
      <div className='slider-Burger'>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='content'>
        {profileLoading && <Loader />}
        {!profileLoading && (
          <div className='wrapper'>
            <div className='profile-section'>
              <FilePondUpload />
              <div className='desc'>
                {user && <h1>{truncate(user.name)}</h1>}
                {user.availablePic && (
                  <button onClick={removePictureHandler}>
                    Remove {deleteProfilePicLoading && <Loader />}
                  </button>
                )}
              </div>
            </div>
            <Message
              vibrating='true'
              visiblity={updateError ? true : false}
              msg={updateError}
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
                <img
                  onClick={() => setNameValue("")}
                  style={{ display: `${nameValue.length ? "block" : "none"}` }}
                  className='xSign1'
                  src={xSign}
                  alt='X icon'
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
                <img
                  onClick={() => setEmailValue("")}
                  style={{ display: `${emailValue.length ? "block" : "none"}` }}
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

              <button>Save Changes {updateLoading && <Loader />}</button>
            </form>
          </div>
        )}
      </div>
    </StyledEdit>
  )
}
const StyledEdit = styled.div`
  .slider-Burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: max-content;
    margin-left: 5vw;
    margin-top: 5vw;
    background: #1a1a1a;
    padding: 0.5rem;
    width: 49px;
    height: 49px;
    border-radius: 50%;
    span {
      width: 1.8rem !important;
      height: 0.15rem !important;
      margin: 0.15rem 0 !important;
      background: white;
      border-radius: 1px;
    }
  }
  .message {
    height: max-content !important;
    margin-top: calc(0.5rem + 0.5vh);
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
  .wrapper {
    width: 50%;
    max-width: 606px;
    min-width: max-content;
    margin-top: 1.5rem;
  }
  display: flex;
  flex: 1 1 auto;
  .content {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: calc(14rem + 2vw);
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
        font-size: calc(2.4rem + 0.5vw);
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
      padding: 0.72rem 0.8rem;
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
  @media screen and (max-width: 1050px) {
    .message {
      padding: 0.5rem 0.7rem !important;
    }
    .eye {
      position: absolute;
      right: 0%;
      top: 50%;
      cursor: pointer;
      padding: 0.6rem;
      transform: translate(-18%, -36%);
      width: calc(2.8rem + 1vw);
    }
    .eye1 {
      transform: translate(-18%, -35%) !important;
    }

    .xSign2,
    .xSign1 {
      transform: translate(-50%, -24%) !important;
      width: calc(2rem + 1vw);
      cursor: pointer;
      padding: 0.6rem;
      transform: translate(-12%, -36%) !important;
    }
    .xSign1 {
      transform: translate(-12%, -28%) !important;
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
      margin-top: calc(1rem + 0.4vw);
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
