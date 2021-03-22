import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import DashboardError from "../components/DashboardError"
import { useHistory, useLocation } from "react-router-dom"
import userActions from "../actions/userActions"
import { parseISO, format } from "date-fns"
import Switch from "react-switch"
import { useLastLocation } from "react-router-last-location"
import { motion, AnimatePresence } from "framer-motion"
import { popup2 } from "../animations"
import canOrderAction from "../actions/canOrder"
import canReviewAction from "../actions/canReview"
import deleteUserAction from "../actions/deleteUser"
import Loader from "../components/loader"
import verified from "../img/verified.svg"
import arrow from "../img/arrow2.svg"

const DashboardUserAction = () => {
  const lastLocation = useLastLocation()
  const dispatch = useDispatch()
  const location = useLocation()
  const { user, loading, error } = useSelector((state) => state.userActions)
  const userActionsInfo = useSelector((state) => state.userActions)

  const [review, setReview] = useState(true)
  const [ordering, setOrdering] = useState(true)

  useEffect(() => {
    if (location.pathname.split("/")[3]) {
      dispatch(
        userActions(
          location.pathname.split("/")[3],
          lastLocation ? lastLocation.search.split("=")[1] : true
        )
      )
    }
    setClicked(true)
    if (userActionsInfo.user) {
      userActionsInfo.user = null
      userActionsInfo.loading = true
    }
    if (error) {
      userActionsInfo.error = null
    }
    setTimeout(() => {
      setClicked(false)
    }, 300)
  }, [location.pathname])

  const imgSrcCondition = () => {
    if (user.profilePicLink && user.profilePicLink !== "cleared") {
      return user.profilePicLink
    } else {
      return `/api/users/profilePic/${user._id}`
    }
  }

  useEffect(() => {
    if (user) {
      setReview(user.canReview)
      setOrdering(user.canOrder)
      setRankValue(user.rank)
    }
  }, [user])
  const history = useHistory()

  const [clicked, setClicked] = useState(false)

  const reviewChange = (e) => {
    dispatch(
      canReviewAction(
        location.pathname.split("/")[3],
        e,
        location.search.split("=")[1]
      )
    )
  }
  const orderChange = (e) => {
    dispatch(
      canOrderAction(
        location.pathname.split("/")[3],
        e,
        location.search.split("=")[1]
      )
    )
  }

  const deleteHandler = () => {
    dispatch(
      deleteUserAction(
        location.pathname.split("/")[3],
        lastLocation.search.split("=")[1]
      )
    )
  }

  const { loading: orderingLoading, success: orderingSuccess } = useSelector(
    (state) => state.canOrder
  )
  const { loading: reviewLoading, success: reviewSuccess } = useSelector(
    (state) => state.canReview
  )
  const { loading: deleteLoading, success: deleteSuccess } = useSelector(
    (state) => state.deleteUser
  )
  const [e, setE] = useState(true)
  const [e2, setE2] = useState(true)

  useEffect(() => {
    if (!orderingLoading && orderingSuccess) {
      setOrdering(e2)
    }
  }, [orderingLoading, orderingSuccess])
  useEffect(() => {
    if (!reviewLoading && reviewSuccess) {
      setReview(e)
    }
  }, [reviewLoading, reviewSuccess])

  useEffect(() => {
    if (deleteSuccess) {
      if (lastLocation.pathname) {
        const add = lastLocation.search ? lastLocation.search : ""
        history.push(lastLocation.pathname + add)
      } else {
        history.push("/dashboard/customers")
      }
    }
  }, [deleteSuccess])

  const options = [
    { value: "admin", label: "admin" },
    { value: "delivery", label: "delivery" },
  ]

  const [rankValue, setRankValue] = useState("")
  const [selectOpen, setSelectOpen] = useState(false)
  return (
    <StyledUserAction
      className='cardCont'
      id={`${user ? "active" : ""}`}
      onClick={(e) => {
        if (e.target.classList.contains("cardCont") && !clicked) {
          history.push(lastLocation ? lastLocation : "/dashboard/customers")
        }
      }}
    >
      <AnimatePresence>
        {error && <DashboardError error={error} />}
        {!loading && user && location.pathname.split("/")[3] && (
          <motion.div
            variants={popup2}
            initial='hidden'
            animate='show'
            exit='exit'
            className='card'
          >
            <>
              <div className='info'>
                <img className='profilePic' src={imgSrcCondition()} />
                <div className='desc'>
                  <div className='descCont'>
                    <h1>
                      <p className='email'>
                        {user.email}{" "}
                        {user.status === "Verified" && (
                          <img id='verified' src={verified} alt='' />
                        )}
                      </p>
                      {user.name}
                    </h1>
                    <p className='date'>
                      {format(parseISO(user.joinedIn), "yyyy-MM-dd")}
                    </p>
                  </div>
                  <p>
                    Paid: {user.totalPaidOrders} <span>EGP</span>
                  </p>
                </div>
              </div>
              <div className='actions'>
                <p>Actions</p>
                <div className='line'></div>
              </div>
              <div className='allow allow1'>
                <h2>Edit Rank</h2>
                <div
                  className='select'
                  onClick={() => setSelectOpen(!selectOpen)}
                >
                  <p className='value'>{rankValue}</p>
                  <svg
                    className={`${selectOpen ? "active" : ""}`}
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M4.51605 7.548C4.95205 7.102 5.55905 7.067 6.09205 7.548L10.0001 11.295L13.9081 7.548C14.4411 7.067 15.0491 7.102 15.4821 7.548C15.9181 7.993 15.8901 8.745 15.4821 9.163C15.0761 9.581 10.787 13.665 10.787 13.665C10.57 13.888 10.2851 14 10.0001 14C9.71505 14 9.43005 13.888 9.21105 13.665C9.21105 13.665 4.92405 9.581 4.51605 9.163C4.10805 8.745 4.08005 7.993 4.51605 7.548V7.548Z'
                      fill='white'
                    />
                  </svg>

                  {selectOpen && (
                    <div className='dropDown'>
                      {options.map((e) => (
                        <p
                          className={`${e.value === rankValue ? "active" : ""}`}
                          onClick={() => setRankValue(e.value)}
                        >
                          {e.value}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className='allow allow2'>
                <h2>Allow Reviewing Products</h2>
                <Switch
                  className={`${reviewLoading ? "loading" : ""}`}
                  offColor='#FF6969'
                  onColor='#24CA84'
                  checked={review}
                  onChange={(e) => {
                    reviewChange(e)
                    setE(e)
                  }}
                />
              </div>
              <div className='allow allow3'>
                <h2>Allow Ordering Products</h2>
                <Switch
                  className={`${orderingLoading ? "loading" : ""}`}
                  offColor='#FF6969'
                  onColor='#24CA84'
                  checked={ordering}
                  onChange={(e) => {
                    orderChange(e)
                    setE2(e)
                  }}
                />
              </div>

              <div className='btnCont'>
                <button onClick={deleteHandler}>
                  Delete Account{deleteLoading && <Loader />}
                </button>
              </div>
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledUserAction>
  )
}

const StyledUserAction = styled(motion.div)`
  svg.active {
    transform: rotate(180deg) !important;
  }
  p.active {
    color: #2fa3e3 !important;
    background: #33335e;
  }
  .select {
    position: relative;
    padding: 0.45rem 0.7rem;
    background: #42426e;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    svg {
      margin-left: 0.4rem;
    }
    .value {
      color: rgba(255, 255, 255, 0.9) !important;
      font-size: calc(0.8rem + 0.3vw);
    }
  }
  .select .dropDown {
    box-shadow: 0 0 10px rgba(46, 46, 83, 0.5);
    background: #2e2e53;
    z-index: 2;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-width: max-content;
    height: max-content;
    transform: translate(0, 105%);
    border-radius: 5px;
    overflow: hidden;
    padding: 0.3rem;
    cursor: auto;

    p {
      padding: 0.38rem 0.5rem !important;
      transition: 0.2s ease;
      font-size: calc(0.7rem + 0.3vw);
      border-radius: 5px;
      margin: 0.25rem 0;
      cursor: pointer;
      padding-right: 0.7rem !important;
      &:last-child {
        margin-bottom: 0 !important;
      }
      &:first-child {
        margin-top: 0 !important;
      }
      &:hover {
        background: #33335e;
      }
    }
  }
  #verified {
    width: 15px !important;
    height: 15px !important;
  }
  .react-switch-bg {
    transition: filter 0.2s ease !important;
  }
  .loading .react-switch-bg {
    filter: grayscale(0.5);
    pointer-events: none;
  }
  .loading .react-switch-handle {
    pointer-events: none;
  }
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
  cursor: pointer;
  pointer-events: none;

  &#active {
    background: rgba(29, 33, 62, 0.6);
    pointer-events: all;
  }
  .btnCont {
    display: flex;
    justify-content: flex-end;
    margin-top: calc(2rem + 0.3vh);
  }
  button {
    background: #ff6969;
    border-radius: 10px;
    color: white;
    padding: 0.6rem 1rem;
    border: none;
    font-weight: 400;
    font-size: calc(0.8rem + 0.3vw);
    cursor: pointer;
    transition: 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #loader:first-child {
      width: calc(0.9rem + 0.5vw) !important;
      height: calc(0.9rem + 0.5vw) !important;
      margin-left: 0.45rem !important;
      #greybackground path {
        stroke: white !important;
      }
    }
    &:hover {
      background: #df5c5c;
    }
  }
  .descCont .email {
    font-size: calc(0.6rem + 0.3vw) !important;
    color: white !important;
  }
  .allow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .allow3 {
    margin-bottom: 0rem;
  }
  .allow h2 {
    font-weight: 400;
    color: white;
    font-size: calc(1rem + 0.3vw);
  }
  .react-switch-bg div svg {
    display: none !important;
  }
  .card {
    cursor: auto;
    background: #373864;
    padding: calc(2rem + 1vw);
    border-radius: 20px;
    width: calc(100% - (calc(2.5rem + 0.5vh) * 2));
    height: max-content;
    .actions {
      font-size: calc(1rem + 0.3vw);
      position: relative;
      display: inline-flex;
      margin-bottom: calc(2rem + 0.3vh);
      .line {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background: rgba(255, 255, 255, 0.7) !important;
        transform: translate(0, 120%);
        border-radius: 100rem;
      }
    }
    .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: calc(2rem + 0.3vh);
      img {
        width: 95px;
        height: 95px;
        border-radius: 50%;
      }
      .desc {
        margin-left: 0.8rem;
        width: 100%;
        h1 {
          font-size: calc(1.5rem + 0.3vw);
        }
        p {
          font-size: calc(0.75rem + 0.3vw);
          span {
            font-size: calc(0.4rem + 0.3vw);
          }
        }
        .descCont {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
      }
    }
  }
  #loader #greybackground path {
    stroke: #272b55 !important;
  }
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`

export default DashboardUserAction
