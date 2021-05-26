import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader'
import DashboardError from '../components/DashboardError'
import { AnimatePresence, motion } from 'framer-motion'
import { hide, popupLeft } from '../animations'
import { useHistory, useLocation } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import { throttle } from 'underscore'
import ConfirmPopup from '../components/confirmPopup'
import { ReactComponent as SmallX } from '../img/smallX.svg'
import { ReactComponent as Search } from '../img/searchIcon.svg'
import { ReactComponent as Sort } from '../img/sort.svg'
import { v4 as uuid } from 'uuid'
import { useRef } from 'react'
import qs from 'qs'
import { useInView } from 'react-intersection-observer'
import getDashboardOrdersAction from '../actions/getDashboardOrders'
import OrderDashboard from '../components/dashboardOrder'
import DashboardOrderActions from './DashboardOrderActions'
import socket from '../clientSocket/socket'
import { ReactComponent as Arrow } from '../img/arrow3.svg'
import { ReactComponent as Connect } from '../img/connect.svg'
import Input from '../components/DashboardInput'
import Select from 'react-select'

const defaultSelectValues = [
  { value: 'Paid', label: 'Paid' },
  { value: 'Not Paid', label: 'Not Paid' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Not Delivered', label: 'Not Delivered' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Not Approved', label: 'Not Approved' },
  { value: 'Packed', label: 'Packed' },
  { value: 'Not Packed', label: 'Not Packed' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Not Rejected', label: 'Not Rejected' },
]
const DashboardOrders = () => {
  Object.size = function (obj) {
    var size = 0,
      key
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++
    }
    return size
  }

  const useOutsideAlerter = (ref, reset) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
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

  const dispatch = useDispatch()
  const lastLocation = useLastLocation()
  const [scrolled, setScrolled] = useState(0)
  const location = useLocation()
  const history = useHistory()

  const searches = qs.parse(location.search, { ignoreQueryPrefix: true })
  const filterRef = useRef(null)
  useOutsideAlerter(filterRef, () => setOpenFilter(false))
  const valueRef = useRef(null)
  useOutsideAlerter(valueRef, () => setOpenValue(false))
  const typeRef = useRef(null)
  useOutsideAlerter(typeRef, () => setOpenType(false))

  const [openFilter, setOpenFilter] = useState(false)
  const [openType, setOpenType] = useState(false)
  const [openValue, setOpenValue] = useState(false)

  useEffect(() => {
    const container = document.querySelector('.view')
    if (container) {
      container.addEventListener(
        'scroll',
        throttle(() => {
          setScrolled(container.scrollTop)
        }, 100)
      )
    }
    if (!location.pathname.split('/')[3] && Object.size(searches) === 0) {
      dispatch(getDashboardOrdersAction())
    }
  }, [])
  useEffect(() => {
    if (
      !location.pathname.split('/')[3] &&
      !orders &&
      lastLocation &&
      lastLocation.pathname.split('/')[3] &&
      Object.size(searches) === 0
    ) {
      dispatch(getDashboardOrdersAction())
    }
    const container = document.querySelector('#view')

    if (container) {
      if (location.pathname.split('/')[3]) {
        container.classList.add('preventScrolling')
      } else {
        container.classList.remove('preventScrolling')
      }
    }
  }, [location.pathname])

  const { orders, loading, count, error, filtering } = useSelector(
    (state) => state.dashboardOrders
  )
  const { order, loading: orderLoading } = useSelector(
    (state) => state.orderActions
  )

  useEffect(() => {
    socket.on('orderPaid', (data) => {
      dispatch({
        type: 'PAID_DASHBOARD_ORDER',
        payload: data,
      })
    })

    socket.on('orderDelivered', (data) => {
      dispatch({
        type: 'DELIVERED_DASHBOARD_ORDER',
        payload: data,
      })
    })

    socket.on('orderApproved', (data) => {
      dispatch({
        type: 'APPROVED_DASHBOARD_ORDER',
        payload: data,
      })
    })

    socket.on('orderRejected', (data) => {
      dispatch({
        type: 'REJECTED_DASHBOARD_ORDER',
        payload: data,
      })
    })

    socket.on('orderPacked', (data) => {
      dispatch({
        type: 'PACKED_DASHBOARD_ORDER',
        payload: data,
      })
    })
  }, [])

  const filterHandler = (reset) => {
    if (
      (sortValue && sortType) ||
      governorate.length !== 0 ||
      user.length !== 0 ||
      filter.length !== 0
    ) {
      let baseURL = `?${sortValue}=${sortType}`
      if (reset !== 'all') {
        if (user && reset !== 'user') baseURL += `&user=${user}`
        if (governorate && reset !== 'governorate')
          baseURL += `&governorate=${governorate}`
        if (filter.length) baseURL += `&filter=${JSON.stringify(filter)}`
      } else {
        baseURL = '/dashboard/orders'
        dispatch(getDashboardOrdersAction())
      }
      // setSkip(1)
      history.push(baseURL)
    }
    setOpenFilter(false)
  }

  const sortValueFromSearch = Object.keys(searches)[0]
    ? Object.keys(searches)[0]
    : 'Date'
  const sortTypeFromSearch = searches[Object.keys(searches)[0]]
    ? searches[Object.keys(searches)[0]].charAt(0).toUpperCase() +
      searches[Object.keys(searches)[0]].slice(1)
    : 'Newest'
  const [sortValue, setSortValue] = useState(sortValueFromSearch)
  const [sortType, setSortType] = useState(sortTypeFromSearch)

  const [user, setUser] = useState('')
  const [governorate, setGovernorate] = useState('')

  const [sortValues] = useState(['Date', 'Total Price'])
  const [sortValueTypes, setSortValueTypes] = useState(['Newest', 'Oldest'])
  const [changedValue, setChangedValue] = useState(false)

  useEffect(() => {
    const sortTypeFromSearch = searches[Object.keys(searches)[0]]
      ? searches[Object.keys(searches)[0]].charAt(0).toUpperCase() +
        searches[Object.keys(searches)[0]].slice(1)
      : null

    switch (sortValue) {
      case 'Date':
        setSortValueTypes(['Newest', 'Oldest'])
        setSortType(
          sortTypeFromSearch && !changedValue ? sortTypeFromSearch : 'Newest'
        )
        break
      case 'Total Price':
        setSortValueTypes(['Highest', 'Lowest'])
        setSortType(
          sortTypeFromSearch && !changedValue ? sortTypeFromSearch : 'Highest'
        )
        break
      default:
        break
    }

    setChangedValue(false)
  }, [sortValue])

  useEffect(() => {
    if (!openFilter) {
      const governorate = searches.governorate
      const user = searches.user
      const filterValues = searches.filter
      if (governorate) {
        setGovernorate(governorate)
      } else {
        setGovernorate('')
      }
      if (user) {
        setUser(user)
      } else {
        setUser('')
      }
      if (filterValues) {
        const filterParsed = JSON.parse(filterValues)
        selectHandler(filterParsed, true)
      } else {
        selectHandler([])
      }
      if (sortValueFromSearch) {
        setSortValue(sortValueFromSearch)
      } else {
        setSortValue('Date')
      }
      if (sortTypeFromSearch) {
        setSortType(sortTypeFromSearch)
      } else {
        setSortValue('Newest')
      }
    }
  }, [openFilter])

  const [filter, setFilter] = useState([])

  const [filterOptions, setFilterOptions] = useState(defaultSelectValues)
  const customStyles = {
    control: () => ({
      display: 'flex',
      padding: '0.25rem 0.6rem !important',
      background: '#4b4d8b',
      color: '#ffffff',
      borderRadius: '10px',
      paddingRight: '0.4rem !important',
    }),
    singleValue: () => ({
      color: 'white',
      fontSize: 'calc(1rem + 0.3vw)',
      whiteSpace: 'nowrap',
      width: 'max-content',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxWidth: '96%',
    }),
    placeholder: () => ({
      marginLeft: '2px',
      marginRight: '2px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255, 255, 255, 0.6)',
    }),
    menuList: (provided) => ({
      ...provided,
      background: '#4b4d8b',
      borderRadius: '7px',
      maxHeight: '180px',
      scrollbarColor: '#32335dcc transparent',
    }),
    menu: (_) => ({
      boxShadow: 'rgba(29,32,62,0.42) 0px 2px 10px',
      borderRadius: '7px',
      position: 'absolute',
      bottom: 0,
      transform: 'translate(0, 104%)',
      width: '100%',
      zIndex: 2,
    }),
    input: (provided) => ({
      ...provided,
    }),
    option: (_, state) => ({
      ..._,
      background: state.isFocused ? '#40427a' : '#4b4d8b',
    }),
    input: (_) => ({
      ..._,
      color: 'white',
    }),
    indicatorsContainer: (_) => ({
      ..._,
      color: 'white !important',
    }),
    multiValue: (_) => ({
      ..._,
      fontSize: '12px',
      background: '#373864',
    }),
    multiValueLabel: (_) => ({
      ..._,
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    multiValueRemove: (_) => ({
      padding: '0.35rem',
      paddingLeft: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
      '&:hover': {
        background: '#3f4072',
      },
    }),
  }

  const selectHandler = (e, bunch) => {
    const copy = [...filterOptions]
    if (!bunch) {
      if (e.length > 0) {
        if (e.length > filter.length) {
          const value = e[e.length - 1].value.includes('Not ')
            ? e[e.length - 1].value.replace('Not ', '')
            : `Not ${e[e.length - 1].value}`

          const index = copy.findIndex((e) => e.value === value)

          if (index > -1) {
            copy.splice(index, 1)
          }
        } else if (e.length < filter.length) {
          const removed = filter.filter((x) => !e.includes(x))[0]

          const value = removed.value.includes('Not ')
            ? removed.value.replace('Not ', '')
            : `Not ${removed.value}`
          const position = removed.value.includes('Not ') ? -1 : 1

          const index = copy.findIndex((e) => removed.value == e.value)

          Array.prototype.insert = function (index, item) {
            this.splice(index, 0, item)
          }

          copy.insert(position === 1 ? index + 1 : position, {
            label: value,
            value,
          })
        }

        setFilterOptions(copy)
      } else {
        setFilterOptions(defaultSelectValues)
      }
    } else {
      e.forEach((each) => {
        const value = each.value.includes('Not ')
          ? each.value.replace('Not ', '')
          : `Not ${each.value}`
        const index = copy.findIndex((e) => e.value === value)

        if (index > -1) {
          copy.splice(index, 1)
          console.log(copy)
        }
      })

      setFilterOptions(copy)
    }
    setFilter(e)
  }

  useEffect(() => {
    if (Object.size(searches) > 0 && !location.pathname.split('/')[3]) {
      dispatch(
        getDashboardOrdersAction(
          Object.keys(searches)[0] === 'Date' ? 'createdAt' : 'total',
          searches[Object.keys(searches)[0]],
          searches.governorate ? searches.governorate : null,
          searches.user ? searches.user : null,
          searches.filter ? JSON.parse(searches.filter) : null
        )
      )
    }
  }, [location.search])

  return (
    <StyledOrders>
      <DashboardOrderActions scrolled={scrolled} setScrolled={setScrolled} />

      {error ? (
        <DashboardError error={error} />
      ) : ((loading && !location.pathname.split('/')[3]) ||
          (orderLoading && location.pathname.split('/')[3] && !orders)) &&
        filtering !== true ? (
        <Loader />
      ) : (
        <>
          <div className='title'>
            <h1>Orders</h1>
            <p>{count !== undefined ? count : '..'} Orders Found</p>
          </div>
          <div className='search'>
            {searches.search && <div></div>}
            {!searches.search && (
              <div
                ref={filterRef}
                onClick={(e) => {
                  if (e.target.classList.contains('filter')) {
                    setOpenFilter(!openFilter)
                    setOpenType(false)
                    setOpenValue(false)
                  }
                }}
                className={`filter ${openFilter ? 'activeFilter' : ''}`}
              >
                <p className='filterTitle'>Fitler</p>
                <svg
                  className='filterSVG'
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clip-path='url(#clip0)'>
                    <path
                      d='M5.33335 6.61553C5.48026 6.77541 5.56092 6.98426 5.56092 7.20031V13.5667C5.56092 13.9498 6.02327 14.1443 6.29694 13.8749L8.07289 11.8397C8.31055 11.5545 8.44162 11.4133 8.44162 11.131V7.20175C8.44162 6.9857 8.52372 6.77685 8.6692 6.61695L13.7651 1.08746C14.1468 0.672643 13.853 0 13.2884 0H0.714129C0.149512 0 -0.145759 0.671203 0.237374 1.08746L5.33335 6.61553Z'
                      fill='white'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0'>
                      <rect width='14' height='14' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
                <AnimatePresence>
                  {openFilter && (
                    <motion.div
                      variants={popupLeft}
                      animate='show'
                      initial='hidden'
                      exit='exit'
                      className='filterDropDown'
                    >
                      <div className='sort'>
                        <p>
                          <span className='sortText'>Sort</span>
                          <Sort />
                        </p>
                        <div className='sortDiv'>
                          <div
                            ref={typeRef}
                            onClick={() => {
                              setOpenType(!openType)
                            }}
                            className='sortValue'
                          >
                            <p>{sortValue}</p>
                            <Arrow />
                            {openType && (
                              <div className='sortValueDropDown selectDropDown first'>
                                {sortValues.map((e) => (
                                  <h3
                                    className={`${
                                      sortValue === e ? 'active' : ''
                                    }`}
                                    onClick={(e) => {
                                      setSortValue(e.target.innerText)
                                      setChangedValue(true)
                                    }}
                                  >
                                    {e}
                                  </h3>
                                ))}
                              </div>
                            )}
                          </div>
                          <Connect />
                          <div
                            ref={valueRef}
                            onClick={() => {
                              setOpenValue(!openValue)
                            }}
                            className='sortType'
                          >
                            <p>{sortType}</p>
                            <Arrow />
                            {openValue && (
                              <div className='sortTypeDropDown selectDropDown'>
                                {sortValueTypes.map((e) => (
                                  <h3
                                    className={`${
                                      sortType === e ? 'active' : ''
                                    }`}
                                    onClick={(e) => {
                                      setSortType(e.target.innerText)
                                    }}
                                  >
                                    {e}
                                  </h3>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='filterCont'>
                        <p>Filter</p>
                        <div className='inputDiv filterDiv'>
                          <Select
                            styles={customStyles}
                            isMulti
                            options={filterOptions}
                            value={filter}
                            onChange={(e) => selectHandler(e)}
                            closeMenuOnSelect={false}
                          />
                        </div>
                      </div>
                      <div className='brand'>
                        <p>Governorate</p>
                        <div className='inputDiv'>
                          <Input
                            value={governorate}
                            setValue={setGovernorate}
                          />
                          {searches.governorate && (
                            <SmallX
                              className='clearFilter'
                              onClick={() => {
                                filterHandler('governorate')
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className='category'>
                        <p>User (Email)</p>
                        <div className='inputDiv'>
                          <Input value={user} setValue={setUser} />
                          {searches.user && (
                            <SmallX
                              onClick={() => {
                                filterHandler('user')
                              }}
                              className='clearFilter'
                            />
                          )}
                        </div>
                      </div>
                      <div className='btnDiv'>
                        {Object.size(searches) > 0 &&
                          (Object.keys(searches)[0] !== 'Date' ||
                            searches[Object.keys(searches)[0]]
                              .charAt(0)
                              .toUpperCase() +
                              searches[Object.keys(searches)[0]].slice(1) !==
                              'Newest' ||
                            searches.user ||
                            searches.governorate ||
                            searches.filter) && (
                            <button
                              onClick={() => filterHandler('all')}
                              type='button'
                              className='resetBtnSubmit'
                            >
                              Reset All
                            </button>
                          )}
                        <button
                          type='button'
                          onClick={() => filterHandler()}
                          className='filterBtnSubmit'
                        >
                          Filter & Sort
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
          <div className='headers'>
            <div className='id'>
              <p>Id</p>
            </div>
            <div className='user'>
              <p>User</p>
            </div>

            <div className='total'>
              <p>Total</p>
            </div>
            <div className='paid'>
              <p>Paid</p>
            </div>
            <div className='delivered'>
              <p>Delivered</p>
            </div>
            <div className='date'>
              <p>Date</p>
            </div>
            <div className='actions'>
              <p>Actions</p>
            </div>
          </div>
          {filtering && <Loader providedClassName='filterLoading' />}
          {orders && orders.length && !filtering ? (
            <motion.div
              variants={hide}
              initial='hidden'
              animate='show'
              exit='exit'
            >
              {orders.map((each) => (
                <OrderDashboard order={each} />
              ))}
            </motion.div>
          ) : count === 0 && !loading ? (
            <p className='sorry'>Sorry nothing found!</p>
          ) : (
            ''
          )}
        </>
      )}
    </StyledOrders>
  )
}

const StyledOrders = styled(motion.div)`
  .filterSVG {
    pointer-events: none;
  }
  .inputDiv {
    position: relative;
  }
  .clearFilter {
    position: absolute;
    top: 50%;
    right: 7%;
    transform: translate(0, -50%);
    cursor: pointer;
    transition: 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
  }
  .sorry {
    text-align: center;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7) !important;
  }
  .filterLoading #loader {
    width: calc(2rem + 1vw) !important;
    height: calc(2rem + 1vw) !important;
  }
  .sortIcon {
    margin: 0 0.25rem !important;
  }
  .sort p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .filterDiv {
    width: calc(15.5rem + 5vw) !important;
  }
  .sortType,
  .sortValue {
    width: calc((7.75rem + 5vw) - (0.75rem + 10px)) !important;
    p {
      display: block !important;
      justify-content: flex-start !important;
      overflow: hidden !important;
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      justify-content: flex-start !important;
    }
  }
  .filterBtnSubmit {
    color: white;
    padding: 0.6rem 1.2rem;
    background: #56589e;
    font-size: calc(0.85rem + 0.3vw);
    &:hover {
      background: #4c4e8b;
    }
  }
  .btnDiv {
    display: flex;
    justify-content: flex-end;
    padding-top: 0.8rem;
    button {
      display: flex;
      align-items: center;
    }
    .resetBtnSubmit {
      color: white;
      padding: 0.6rem 1rem;
      border: 2px solid rgba(255, 255, 255, 0.8);
      font-size: calc(0.72rem + 0.3vw);
      transition: 0.2s ease;
      background: transparent !important;
      margin-right: 0.5rem;
      &:hover {
        opacity: 0.85;
      }
    }
    .filterBtnSubmit {
      color: white;
      padding: 0.6rem 1.2rem;
      background: #56589e;
      font-size: calc(0.85rem + 0.3vw);
      &:hover {
        background: #4c4e8b;
      }
    }
  }
  .sortValue,
  .sortType {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .selectDropDown {
      display: grid;
      z-index: 1;
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translate(0, 105%);
      background: #4b4d8b;
      box-shadow: rgba(29, 32, 62, 0.42) 0px 2px 10px;
      border-radius: 7px;
      overflow: hidden;
      overflow-y: auto;
      padding: 0.3rem;
      cursor: auto;
      width: max-content;
      min-height: 4rem;

      h3 {
        padding: 0.4rem 0.6rem;
        font-weight: 400;
        font-size: calc(0.8rem + 0.3vw);
        color: rgba(255, 255, 255, 0.9) !important;
        transition: 0.1s ease;
        background: #4b4d8b;
        border-radius: 5px;
        margin-bottom: 0.15rem;
        cursor: pointer;

        &:last-child {
          margin-bottom: 0;
        }
        &:hover:not(.active) {
          background: #43457e;
        }
        &.active {
          background: #40427a;
        }
      }
    }
    svg {
      margin: 0 0 0 0.35rem !important;
      min-width: 12px !important;
      height: 12px !important;
    }
  }

  .sortType {
    display: flex;
    height: max-content;
    padding: 0.6rem 1.1rem;
    background: #373864;
    border-radius: 10px;
    cursor: pointer;
  }
  .sortType p {
    margin-right: 0 !important;
    height: max-content;
    font-size: calc(0.8rem + 0.3vw) !important;
    pointer-events: none;
    user-select: none;
  }
  .sortDiv {
    display: flex;
    justify-content: flex-start;
    width: max-content;
    align-items: center;
    width: calc(15.5rem + 5vw) !important;
  }
  .search {
    display: flex;
    //!Space-between
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 0.8rem;

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
  .activeFilter {
    background: #373864 !important;
  }
  .filter {
    padding: 0.6rem 1.3rem;
    background: rgb(48, 49, 89);
    font-size: calc(0.85rem + 0.3vw);
    border-radius: 10px;
    transition: 0.13s ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .filterTitle {
      pointer-events: none;
      user-select: none;
      color: rgba(255, 255, 255, 0.9) !important;
    }

    svg {
      margin-left: 0.35rem;
      transition: 0.08s ease;
      width: 13px;
      height: 13px;
    }
    .value {
      color: rgba(255, 255, 255, 1) !important;
      pointer-events: none;
    }
    .filterDropDown {
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translate(0, 104%);
      background: rgb(61, 62, 112);
      box-shadow: rgba(29, 32, 62, 0.42) 0px 2px 10px;
      border-radius: 10px;
      width: 90%;
      min-width: max-content;
      font-size: calc(0.85rem + 0.3vw);
      z-index: 4;
      cursor: auto;
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex-direction: column;
      padding: 1.35rem 1.75rem;

      .sortValue {
        display: flex;
        padding: 0.6rem 1.1rem;
        background: #373864;
        border-radius: 10px;
        cursor: pointer;
        height: max-content;
        p {
          font-size: calc(0.8rem + 0.3vw) !important;
          pointer-events: none;
          user-select: none;
          margin-right: 0 !important;
          height: max-content;
        }
      }
      .sortText {
        margin-right: 0.45rem;
      }
      .sort svg {
        min-width: 20px;
        min-height: 20px;
        pointer-events: none;
        user-select: none;
        margin: 0 0.75rem;
      }

      .sort,
      .brand,
      .category {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.9rem;
        p {
          margin-right: 3.5rem;
          font-size: calc(1rem + 0.3vw);
        }
        input {
          padding: 0.6rem 1rem;
          background: #373864;
          color: white;
          font-size: calc(0.85rem + 0.3vw);
          border: none;
          border-radius: 10px;
          margin-right: 0.5rem;
          width: calc(15.5rem + 5vw);
          transition: 0.2s ease;
          &:focus {
            background: #33355f;
          }

          margin-bottom: 0;
          margin-right: 0;
          background: rgba(77, 79, 142, 90%) !important;
          transition: 0.2s ease;
          &:focus {
            background: rgb(71, 73, 131) !important;
          }
        }
      }
      .filterCont {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.9rem;
        p {
          margin-right: 3.5rem;
          font-size: calc(1rem + 0.3vw);
        }
        svg {
          path {
            color: white !important;
            transition: 0.2s ease;
          }
          &:hover {
            opacity: 0.7;
          }
        }
      }
      .category {
        padding-bottom: 0rem;
      }
      p {
        color: rgba(255, 255, 255, 1) !important;
      }
    }
  }
  overflow-x: hidden;
  overflow-y: hidden;
  height: max-content;
  min-height: 100%;
  padding: calc(3rem + 0.5vh) calc(2.5rem + 0.5vh);
  padding-bottom: 1rem;
  p {
    padding: 0 !important;
  }

  #greybackground path {
    stroke: #363761 !important;
  }
  .headers {
    background: rgba(51, 52, 92, 31%);
    padding: 0.5rem 2.1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .id,
    .user,
    .address,
    .date,
    .total,
    .paid,
    .delivered,
    .actions {
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
      padding-right: 2vw;
    }
    .user {
      min-width: 20%;
      padding-right: 2vw;
    }
    .date {
      min-width: 18%;
      padding-right: 2vw;
    }
    .total {
      min-width: 14%;
      padding-right: 2vw;
    }
    .paid,
    .delivered {
      min-width: 10%;
      padding-right: 2vw;
    }
    .delivered {
      min-width: 12%;
    }
    .actions {
      min-width: 14%;
      padding-right: 2vw;
    }
  }
  .title {
    margin-bottom: 1rem;
    h1 {
      font-weight: 500;
      font-size: calc(2.1rem + 0.3vw);
    }
    p {
      color: rgba(255, 255, 255, 0.7) !important;
      font-weight: 400;
    }
  }
`

export default DashboardOrders
