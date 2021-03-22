import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import getDashboardUsersAction from "../actions/getDashboardUsers"
import SearchDashboardCustomers from "../actions/searchUser"
import Loader from "../components/loader"
import UserDashboard from "../components/userDashboard"
import DashboardError from "../components/DashboardError"
import { motion } from "framer-motion"
import { hide } from "../animations"
import search from "../img/searchIcon.svg"
import { useHistory, useLocation } from "react-router-dom"
import smallX from "../img/smallX.svg"
import DashboardUserAction from "./DashboardUserAction"
import { useLastLocation } from "react-router-last-location"
import { throttle } from "underscore"
import socket from "../clientSocket/socket"
import { useInView } from "react-intersection-observer"
import infiniteScrollUsersAction from "../actions/infiniteScrollUsers"

const DashboardCustomers = () => {
  const [skip, setSkip] = useState(0)

  const lastLocation = useLastLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const searchUser = location.search.split("=")[1]

  const {
    success,
    users,
    loading,
    count,
    error,
    infiniteLoading,
    end,
  } = useSelector((state) => state.dashboardUsers)

  const {
    users: searchedUsers,
    loading: searchLoading,
    count: searchedCount,
    error: searchedError,
  } = useSelector((state) => state.dashboardSearchUsers)
  const dashboardSearchUsers = useSelector(
    (state) => state.dashboardSearchUsers
  )
  const [searchValue, setSearchValue] = useState("")
  const [isSearch, setIsSearch] = useState(false)

  useEffect(() => {
    if (searchUser) {
      setSearchValue(searchUser)
    }
  }, [searchUser])

  useEffect(() => {
    if (searchUser) setIsSearch(true)
    else setIsSearch(false)
  }, [searchUser])

  const lastLocationValue = lastLocation
    ? !lastLocation.pathname.split("/")[3]
    : true

  const [lastSearch, setLastSearch] = useState(null)

  useEffect(() => {
    if (lastLocation && lastLocation.search.split("=")[1]) {
      setLastSearch(lastLocation.search.split("=")[1])
    } else {
      setLastSearch(null)
    }
  }, [lastLocation])

  useEffect(() => {
    if (!searchUser && !location.pathname.split("/")[3]) {
      if (!users || lastLocationValue) {
        dispatch(getDashboardUsersAction(skip))
        setSkip(skip + 1)
      }
    } else if (lastLocationValue && !location.pathname.split("/")[3]) {
      if (searchUser || !searchedUsers) {
        dispatch(SearchDashboardCustomers(searchUser))
      }
    }
  }, [dispatch, searchUser, lastLocation])

  const searchHandler = (e) => {
    e.preventDefault()
    if (searchValue.length)
      history.push(`/dashboard/customers?search=${searchValue}`)
  }
  const returnHandler = () => {
    history.push(`/dashboard/customers`)
    setSearchValue("")
  }
  const headerCondition = () => {
    if (!isSearch) {
      if (location.pathname.split("/")[3]) return true
      if (users && users.length > 0) return true
      else return false
    } else {
      if (searchedUsers.length > 0) return true
      else return false
    }
  }
  const condition = () => {
    if (loading && !error && !searchUser && !location.pathname.split("/")[3]) {
      return true
    } else if (
      searchLoading &&
      !searchedError &&
      searchUser &&
      !location.pathname.split("/")[3]
    ) {
      return true
    } else {
      return false
    }
  }
  const condition2 = () => {
    if (users) {
      return true
    } else if (searchedUsers) {
      return true
    } else {
      return false
    }
  }
  const { user } = useSelector((state) => state.userActions)
  const userActions = useSelector((state) => state.userActions)

  useEffect(() => {
    if (userActions.user) {
      userActions.user = null
    }
  }, [location.pathname])
  useEffect(() => {
    if (
      location &&
      location.pathname.split("/")[2] === "customers" &&
      !location.pathname.split("/")[3] &&
      !searchValue
    ) {
      dashboardSearchUsers.users = null
      dashboardSearchUsers.count = null
    }
  }, [lastLocation, location])

  const [scrolled, setScrolled] = useState(0)

  useEffect(() => {
    const container = document.querySelector(
      ".large-scrollable-content div:first-child"
    )
    container.addEventListener("scroll", () => {
      setTimeout(
        throttle(() => {
          setScrolled(container.scrollTop)
        }),
        100
      )
    })
  }, [])

  useEffect(() => {
    const container = document.querySelector(
      ".large-scrollable-content div:first-child"
    )
    if (location.pathname.split("/")[3]) container.style.overflowY = "hidden"
    else container.style.overflowY = "scroll"
  }, [location.pathname])

  useEffect(() => {
    const cardCont = document.querySelector(".cardCont")
    cardCont.style.top = `${scrolled}px`
  }, [scrolled])

  const { user: userInfo } = useSelector((state) => state.userInfo)
  useEffect(() => {
    if (userInfo.rank === "admin") {
      socket.on("NewUser", () => {
        dispatch({
          type: "NEW_DASHBOARD_USERS",
        })
      })
    }
  }, [])

  const [element, inView] = useInView()

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        if (!infiniteLoading && !end && !loading && inView) {
          dispatch(infiniteScrollUsersAction(skip))
          setSkip(skip + 1)
        }
      }, 500)
    } else {
      if (!infiniteLoading && !end && !loading && inView) {
        dispatch(infiniteScrollUsersAction(skip))
        setSkip(skip + 1)
      }
    }
  }, [inView])

  return (
    <StyledOrders>
      <DashboardUserAction />

      {condition() ? (
        <Loader />
      ) : !error && !searchedError ? (
        <>
          {condition2() && (
            <div
              className='cont'
              id={`${location.pathname.split("/")[3] && user ? "blur" : ""}`}
            >
              <div className='title'>
                <h1>Users</h1>
                <p>
                  {(searchUser && searchedUsers) ||
                  (location.pathname.split("/")[3] && searchedUsers) ||
                  (location.pathname.split("/")[3] &&
                    lastSearch &&
                    searchedUsers)
                    ? searchedCount
                    : count}{" "}
                  Users Found
                </p>
              </div>
              <form className='search' onSubmit={searchHandler}>
                <div className='inputCont'>
                  <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder='Search'
                    type='text'
                  />
                  {searchUser && (
                    <img onClick={returnHandler} src={smallX} alt='' />
                  )}
                </div>
                <button type='submit'>
                  <img src={search} />
                </button>
              </form>
              {headerCondition() ? (
                <div className='headers'>
                  <div className='id'>
                    <p>Id</p>
                  </div>
                  <div className='name'>
                    <p>Name</p>
                  </div>
                  <div className='Email'>
                    <p>Email</p>
                  </div>
                  <div className='JoinedIn'>
                    <p>Joined In</p>
                  </div>
                  <div className='Action'>
                    <p>Action</p>
                  </div>
                </div>
              ) : (
                <p className='sorry'>Sorry nothing found!</p>
              )}

              <motion.div variants={hide} initial='hidden' animate='show'>
                {(lastSearch &&
                  location.pathname.split("/")[3] &&
                  searchedUsers) ||
                (searchUser && searchedUsers) ||
                (location.pathname.split("/")[3] && searchedUsers)
                  ? searchedUsers.map((each) => <UserDashboard user={each} />)
                  : users.map((each) => <UserDashboard user={each} />)}
              </motion.div>
              {!end ? (
                <Loader
                  providedClassName='infiniteLoader'
                  refElement={element}
                />
              ) : (
                <p className='end'>Yay! You have seen it all</p>
              )}
            </div>
          )}
        </>
      ) : (
        <DashboardError error={error} />
      )}
    </StyledOrders>
  )
}

const StyledOrders = styled(motion.div)`
  .infiniteLoader {
    margin-bottom: 0.6rem;
  }
  .infiniteLoader #loader:first-child {
    width: calc(2rem + 0.5vw) !important;
    height: calc(2rem + 0.5vw) !important;
  }

  .end {
    color: white;
    text-align: center;
    font-weight: 400 !important;
    font-size: 1rem !important;
    margin-bottom: 0.6rem;
  }
  .infinite-scroll-component {
    overflow-y: hidden !important;
  }
  input::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgba(255, 255, 255, 0.7) !important;
    opacity: 1; /* Firefox */
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, 0.7) !important;
  }

  input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: rgba(255, 255, 255, 0.7) !important;
  }
  height: max-content;
  position: relative;
  #blur {
    filter: blur(2px);
  }
  .sorry {
    text-align: center;
    font-weight: 300;
  }
  .inputCont {
    position: relative;
  }
  .inputCont img {
    cursor: pointer;
    position: absolute;
    right: 5.5%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
  }
  .search {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1rem;
    input {
      padding: 0.6rem 1rem;
      background: #373864;
      color: white;
      font-size: calc(0.85rem + 0.3vw);
      border: none;
      border-radius: 10px;
      margin-right: 0.5rem;
      width: calc(12rem + 5vw);
      transition: 0.2s ease;
      &:focus {
        background: #33355f;
      }
    }
    button {
      display: flex;
      padding: 0.725rem;
      background: #373864;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.2s ease;
      &:hover {
        background: #343660;
      }
      img {
        width: 23px;
        height: 23px;
      }
    }
  }
  .headers {
    background: rgba(51, 52, 92, 31%);
    padding: 0.5rem 2.1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .name,
    .id,
    .Email,
    .JoinedIn,
    .Action {
      p {
        color: rgba(255, 255, 255, 0.9) !important;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: calc(0.8rem + 0.3vw);
      }
    }
    .id {
      min-width: 12%;
      padding-right: 3vw;
    }
    .name {
      min-width: 23%;
      padding-right: 3vw;
    }
    .Email {
      min-width: 39%;
      padding-right: 3vw;
    }
    .JoinedIn {
      min-width: 20%;
      padding-right: 3vw;
    }
    .Action {
      min-width: 6%;
    }
  }

  .title {
    margin-bottom: 0.5rem;
  }
  padding: calc(3rem + 0.5vh) calc(2.5rem + 0.5vh);
  padding-bottom: 1rem;
  h1 {
    font-weight: 500;
    font-size: calc(2.1rem + 0.3vw);
  }
  p {
    padding: 0 !important;
    color: rgba(255, 255, 255, 0.7) !important;
    font-weight: 400;
  }
  #greybackground path {
    stroke: #363761 !important;
  }
`

export default DashboardCustomers
