import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import getDashboardUsersAction from '../actions/getDashboardUsers'
import SearchDashboardCustomers from '../actions/searchUser'
import Loader from '../components/loader'
import UserDashboard from '../components/userDashboard'
import DashboardError from '../components/DashboardError'
import { motion } from 'framer-motion'
import { hide } from '../animations'
import { useHistory, useLocation } from 'react-router-dom'
import DashboardUserAction from './DashboardUserAction'
import { useLastLocation } from 'react-router-last-location'
import { throttle } from 'underscore'
import infiniteScrollUsersAction from '../actions/infiniteScrollUsers'
import infiniteScrollSearchUsersAction from '../actions/infiniteScrollSearchedUsers'
import ConfirmPopup from '../components/confirmPopup'
import { ReactComponent as SmallX } from '../img/smallX.svg'
import { ReactComponent as Search } from '../img/searchIcon.svg'
import { ReactComponent as Sort } from '../img/sort.svg'
import { v4 as uuid } from 'uuid'
import { useRef } from 'react'
import qs from 'qs'
import { useInView } from 'react-intersection-observer'
import ReactTooltip from 'react-tooltip'

const DashboardCustomers = () => {
  const filterStoredValue = localStorage.getItem('filterUsers')
    ? localStorage.getItem('filterUsers')
    : 'newest'
  const [filterValue, setFilterValue] = useState(filterStoredValue)
  const [changed, setChanged] = useState(false)

  const [skip, setSkip] = useState(1)
  const [skip2, setSkip2] = useState(1)

  const lastLocation = useLastLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const searchUser = location.search.split('=')[1]

  const { users, loading, count, error } = useSelector(
    (state: any) => state.dashboardUsers
  )

  const {
    users: searchedUsers,
    loading: searchLoading,
    count: searchedCount,
    error: searchedError,
    infiniteLoading: infiniteLoading2,
    end: end2,
    success: success2,
  } = useSelector((state: any) => state.dashboardSearchUsers)
  const dashboardSearchUsers = useSelector(
    (state: any) => state.dashboardSearchUsers
  )
  const [searchValue, setSearchValue] = useState('')
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
    ? !lastLocation.pathname.split('/')[3]
    : true

  const [lastSearch, setLastSearch] = useState<null | string>(null)

  useEffect(() => {
    if (lastLocation && lastLocation.search.split('=')[1]) {
      setLastSearch(lastLocation.search.split('=')[1])
    } else {
      setLastSearch(null)
    }
  }, [lastLocation])

  useEffect(() => {
    if (lastSearch !== searchUser) {
      if (!searchUser && !location.pathname.split('/')[3]) {
        if (!users || lastLocationValue) {
          dispatch(getDashboardUsersAction(filterValue))
          setSkip(1)
        }
      } else if (lastLocationValue && !location.pathname.split('/')[3]) {
        if (searchUser || !searchedUsers) {
          dispatch(SearchDashboardCustomers(searchUser))
          setSkip2(1)
        }
      }
    }
  }, [dispatch, searchUser, lastLocation])

  useEffect(() => {
    if (changed) {
      dispatch(getDashboardUsersAction(filterValue))
    }
  }, [filterValue, changed])

  const searchHandler = (e: any) => {
    e.preventDefault()
    if (searchValue.length)
      history.push(`/dashboard/customers?search=${searchValue}`)
  }
  const returnHandler = () => {
    history.push(`/dashboard/customers`)
    setSearchValue('')
  }
  const headerCondition = () => {
    if (!isSearch) {
      if (location.pathname.split('/')[3]) return true
      if (users && users.length > 0) return true
      else return false
    } else {
      if (searchedUsers.length > 0) return true
      else return false
    }
  }
  const condition = () => {
    if (
      loading &&
      !users &&
      !error &&
      !searchUser &&
      !location.pathname.split('/')[3]
    ) {
      return true
    } else if (
      searchLoading &&
      !searchedError &&
      searchUser &&
      !location.pathname.split('/')[3]
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

  const { loading: userLoading } = useSelector(
    (state: any) => state.userActions
  )
  const userActions = useSelector((state: any) => state.userActions)

  useEffect(() => {
    if (userActions.user) {
      userActions.user = null
    }
  }, [location.pathname])
  useEffect(() => {
    if (
      location &&
      location.pathname.split('/')[2] === 'customers' &&
      !location.pathname.split('/')[3] &&
      !searchValue
    ) {
      dashboardSearchUsers.users = null
      dashboardSearchUsers.count = null
    }
  }, [lastLocation, location])

  const [scrolled, setScrolled] = useState(0)

  useEffect(() => {
    const container = document.querySelector('.view')
    if (container)
      container.addEventListener(
        'scroll',
        throttle(() => {
          setScrolled(container.scrollTop)
        }, 100)
      )
  }, [])

  useEffect(() => {
    const container = document.querySelector('.view')
    if (location.pathname.split('/')[3] && container)
      container.classList.add('preventScrolling')
    else if (container) container.classList.remove('preventScrolling')
  }, [location.pathname])

  useEffect(() => {
    const cardCont = document.querySelector('.cardCont') as HTMLDivElement
    const popups = document.querySelectorAll('.confirmationPopup')!

    popups.forEach((e: any) => (e.style.top = `${scrolled}px`))
    cardCont.style.top = `${scrolled}px`
  }, [scrolled])

  const infiniteScrollingMoreData = () => {
    if (!searchedUsers) {
      dispatch(infiniteScrollUsersAction(skip, filterValue))
      setSkip(skip + 1)
    }
  }

  const infiniteScrollingMoreDataSearched = () => {
    if (searchedUsers) {
      dispatch(infiniteScrollSearchUsersAction(searchUser, skip2))
      setSkip2(skip2 + 1)
    }
  }

  const [rankValue, setRankValue] = useState('')
  const { asking } = useSelector((state: any) => state.editRank)
  const { asking: deleteAsking } = useSelector((state: any) => state.deleteUser)

  const changeFilterHandler = (e: any) => {
    const value = e.target.innerText

    if (value !== filterValue) {
      setChanged(true)
      localStorage.setItem('filterUsers', value)
      setFilterValue(value)
    }
  }
  const filter = ['newest', 'top paid']

  const [openFilter, setOpenFilter] = useState(false)

  const lastSearchValue = lastLocation
    ? lastLocation.search.split('=')[1]
    : false

  const condition5 = () =>
    (!location.search.split('=')[1] && !location.pathname.split('/')[3]) ||
    (location.pathname.split('/')[3] && !lastSearchValue)

  const useOutsideAlerter = (ref: any, reset: any) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          reset()
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  const sortRef = useRef(null)
  useOutsideAlerter(sortRef, () => setOpenFilter(false))

  const searches = qs.parse(location.search, { ignoreQueryPrefix: true })

  useEffect(() => {
    if (location.pathname === '/dashboard/customers' && !searches.search) {
      setSearchValue('')
    }
  }, [location.search, location.pathname])
  const [element, inView] = useInView()

  useEffect(() => {
    if (inView && !loading && !searches.search) {
      infiniteScrollingMoreData()
    } else if (inView && !searchLoading && searches.search) {
      infiniteScrollingMoreDataSearched()
    }
  }, [inView])

  const lastLocationCondition = () => {
    if (lastLocation) {
      return lastLocation.search.split('=')[1]
    } else {
      return true
    }
  }

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [users, searchedUsers])

  return (
    <StyledCustomers>
      <DashboardUserAction rankValue={rankValue} setRankValue={setRankValue} />
      <ConfirmPopup
        resetValue={setRankValue}
        condition={asking}
        type='rank'
        action={`move ${
          userActions.user ? userActions.user.name : ''
        } to employed ${rankValue + '(s)'}`}
      />
      <ConfirmPopup
        type='delete'
        condition={deleteAsking}
        action={`Delete ${
          userActions.user ? userActions.user.name : ''
        }'s account`}
      />
      {(error || searchedError) && (
        <DashboardError error={searches.search ? searchedError : error} />
      )}
      {condition() ? (
        <Loader />
      ) : !error &&
        !searchedError &&
        ((!loading && !searches.search) ||
          (!searchLoading && searches.search)) ? (
        <>
          {condition2() && (
            <div
              className='cont'
              id={`${location.pathname.split('/')[3] ? 'blur' : ''}`}
            >
              <div className='title'>
                <h1>Customers</h1>
                <p>
                  {(searchUser && searchedUsers) ||
                  (location.pathname.split('/')[3] && searchedUsers) ||
                  (location.pathname.split('/')[3] &&
                    lastSearch &&
                    searchedUsers)
                    ? searchedCount
                    : count}{' '}
                  Customers Found
                </p>
              </div>
              <form className='search' onSubmit={searchHandler}>
                {(location.search.split('=')[1] && <div></div>) ||
                  (lastSearchValue && location.pathname.split('/')[3] && (
                    <div></div>
                  ))}
                {condition5() && (
                  <div
                    ref={sortRef}
                    className={`filter ${openFilter ? 'activeFilter' : ''}`}
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    <p className='value'>{filterValue}</p>
                    <Sort
                      className={`${openFilter ? 'activeFilterImg' : ''}`}
                    />

                    {openFilter && (
                      <div className='filterDropDown'>
                        {filter.map((e) => (
                          <p key={uuid()} onClick={changeFilterHandler}>
                            {e}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className='searchContainer'>
                  <div className='inputCont'>
                    <input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder='Search'
                      type='text'
                    />
                    {searchUser && <SmallX onClick={returnHandler} />}
                  </div>
                  <button type='submit'>
                    <Search />
                  </button>
                </div>
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

              {(searches.search && searchedUsers) ||
              (searchedUsers &&
                lastLocationCondition() &&
                location.pathname.split('/')[3]) ? (
                <motion.div
                  variants={hide}
                  initial='hidden'
                  animate='show'
                  exit='exit'
                >
                  <ReactTooltip
                    id='user-tooltip'
                    effect='solid'
                    delayHide={100}
                    delayShow={400}
                  />
                  {searchedUsers.map((each: any) => (
                    <UserDashboard key={each._id} user={each} />
                  ))}
                </motion.div>
              ) : (
                ''
              )}
              {(users &&
                !searches.search &&
                (lastLocation ? !lastLocation.search.split('=')[1] : true)) ||
              (users &&
                !searches.search &&
                location.pathname === '/dashboard/customers') ? (
                <motion.div
                  variants={hide}
                  initial='hidden'
                  animate='show'
                  exit='exit'
                >
                  <ReactTooltip
                    id='user-tooltip'
                    effect='solid'
                    delayHide={100}
                    delayShow={400}
                  />

                  {users.map((each: any) => (
                    <UserDashboard key={each._id} user={each} />
                  ))}
                </motion.div>
              ) : (
                ''
              )}
            </div>
          )}
          {(users && users.length < count && !searches.search) ||
          (searchedUsers &&
            searchedUsers.length < searchedCount &&
            searches.search) ? (
            <Loader providedClassName='infiniteLoader' reference={element} />
          ) : (
            ((searchedUsers &&
              searchedCount !== 0 &&
              searches.search &&
              searchedUsers.length === searchedCount) ||
              (users &&
                count !== 0 &&
                !searches.search &&
                users.length === count)) && (
              <p className='end'>Yay! You have seen it all</p>
            )
          )}
        </>
      ) : (
        ''
      )}
      {!condition() && userLoading && !users && !searchedUsers && <Loader />}
    </StyledCustomers>
  )
}

const StyledCustomers = styled(motion.div)`
  .cont {
    transition: 0.2s ease;
  }
  overflow-x: hidden;
  overflow-y: hidden;
  height: max-content;
  min-height: 100%;
  .__react_component_tooltip {
    background: #1e203e;
    border-radius: 5px;
    &::after {
      border-top-color: #1e203e !important;
    }
  }
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
    margin-bottom: 0.9rem;
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
  .inputCont svg {
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
  .searchContainer {
    display: flex;
  }
  .activeFilter {
    cursor: auto !important;
    background: #42447a !important;
  }
  .filter {
    padding: 0.6rem 1rem;
    background: rgb(48, 49, 89);
    color: white;
    font-size: calc(0.85rem + 0.3vw);
    border-radius: 10px;
    transition: 0.13s ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
      filter: brightness(1000);
      margin-left: 0.4rem;
      transition: 0.08s ease;
      width: 16px;
      height: 16px;
    }
    .value {
      color: rgba(255, 255, 255, 1) !important;
      pointer-events: none;
    }
    .filterDropDown {
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translate(0, 107%);
      background: rgb(61, 62, 112);
      box-shadow: rgba(29, 32, 62, 0.42) 0px 2px 10px;
      border-radius: 6px;
      width: 90%;
      min-width: max-content;
      font-size: calc(0.85rem + 0.3vw);
      z-index: 4;
      overflow: hidden;
      p {
        cursor: pointer;
        color: rgba(255, 255, 255, 0.9) !important;
        margin-top: 0.3rem;
        transition: 0.2s ease;
        padding: 0.5rem 0.7rem !important;
        &:first-child {
          margin-top: 0rem;
          padding-bottom: 0.35rem !important;
        }
        &:last-child {
          padding-top: 0.35rem !important;
          margin-top: 0rem;
        }
        &:hover {
          background: rgb(58, 59, 107);
          color: rgba(255, 255, 255, 1) !important;
        }
      }
    }
  }
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 0.8rem;
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
      svg {
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
    margin-bottom: 1rem;
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
