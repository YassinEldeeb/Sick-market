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

const DashboardCustomers = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const searchUser = location.search.split("=")[1]

  const { users, loading, count, error } = useSelector(
    (state) => state.dashboardUsers
  )

  const {
    users: searchedUsers,
    loading: searchLoading,
    count: searchedCount,
    error: searchedError,
  } = useSelector((state) => state.dashboardSearchUsers)
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

  useEffect(() => {
    if (!searchUser) {
      dispatch(getDashboardUsersAction())
    } else {
      console.log("SearchUser", searchUser)

      dispatch(SearchDashboardCustomers(searchUser))
    }
  }, [dispatch, searchUser])

  const searchHandler = (e) => {
    e.preventDefault()
    if (searchValue.length)
      history.push(`/dashboard/customers?search=${searchValue}`)
  }
  const returnHandler = () => {
    history.push(`/dashboard/customers`)
    setSearchValue("")
  }

  return (
    <StyledOrders>
      {(loading && !error && !searchUser) ||
      (searchLoading && !searchedError && searchUser) ? (
        <Loader />
      ) : !error && !searchedError ? (
        <>
          <div className='title'>
            <h1>Users</h1>
            <p>{isSearch ? searchedCount : count} Users Found</p>
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
          {!isSearch
            ? users.length !== 0
            : searchedUsers.length !== 0 && (
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
              )}
          <motion.div variants={hide} initial='hidden' animate='show'>
            {!isSearch
              ? users.map((each) => <UserDashboard user={each} />)
              : searchedUsers.map((each) => <UserDashboard user={each} />)}
          </motion.div>
        </>
      ) : (
        <DashboardError error={error} />
      )}
    </StyledOrders>
  )
}

const StyledOrders = styled.div`
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
