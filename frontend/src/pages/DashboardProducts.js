import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { productListAction } from '../actions/products'
import Loader from '../components/loader'
import DashboardError from '../components/DashboardError'
import { AnimatePresence, motion } from 'framer-motion'
import { hide, popupLeft } from '../animations'
import search from '../img/searchIcon.svg'
import { useHistory, useLocation } from 'react-router-dom'
import smallX from '../img/smallX.svg'
import { useLastLocation } from 'react-router-last-location'
import { throttle } from 'underscore'
import socket from '../clientSocket/socket'
import { useInView } from 'react-intersection-observer'
import ConfirmPopup from '../components/confirmPopup'
import ProductDashboard from '../components/ProductDashboard'
import { useDispatch, useSelector } from 'react-redux'
import deleteProduct from '../actions/deleteProduct'
import DashboardNewProduct from './DashboardNewProduct'
import DashboardEditProduct from './DashboardEditProduct'
import filter from '../img/filter.svg'
import sort from '../img/sort.svg'
import connect from '../img/connect.svg'
import Input from '../components/DashboardInput'
import arrow from '../img/arrow3.svg'
import info from '../img/info.svg'
import add from '../img/addIcon.svg'
import { useRef } from 'react'
import { underline } from 'colors'
import qs from 'qs'

const DashboardProducts = () => {
  Object.size = function (obj) {
    var size = 0,
      key
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++
    }
    return size
  }

  const { products, error, loading, count, filtering } = useSelector(
    (state) => state.productList
  )

  const [skip, setSkip] = useState(1)
  const [skip2, setSkip2] = useState(1)

  const lastLocation = useLastLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (!location.search) {
      if (lastLocation) {
        if (
          location.pathname.split('/')[3] === 'add' ||
          (lastLocation.pathname.split('/')[2] &&
            lastLocation.pathname.split('/')[1] === 'products' &&
            !lastLocation.pathname.split('/')[3]) ||
          (lastLocation.pathname.split('/')[3] === 'add' && products) ||
          (lastLocation.pathname === '/dashboard/products' &&
            location.pathname === '/dashboard/products/add') ||
          (location.pathname === '/dashboard/products/add' &&
            lastLocation.pathname === '/dashboard/products/add') ||
          (lastLocation.pathname.split('/')[3] === 'edit' && products) ||
          location.pathname.split('/')[3] === 'edit'
        ) {
          return
        }
        dispatch(productListAction())
      } else {
        if (
          location.pathname.split('/')[3] !== 'add' &&
          location.pathname.split('/')[3] !== 'edit'
        )
          dispatch(productListAction())
      }
    }
  }, [dispatch, lastLocation])

  const searchHandler = (e) => {
    //?Search Products
  }
  const returnHandler = () => {
    //?Clear search and redirect
  }

  const [scrolled, setScrolled] = useState(0)

  useEffect(() => {
    const container = document.querySelector(
      '.large-scrollable-content div:first-child'
    )
    container.addEventListener(
      'scroll',
      throttle(() => {
        setScrolled(container.scrollTop)
      }, 100)
    )
  }, [])

  useEffect(() => {
    const container = document.querySelector(
      '.large-scrollable-content div:first-child'
    )
    if (location.pathname.split('/')[3]) container.style.overflowY = 'hidden'
    else container.style.overflowY = 'scroll'
  }, [location.pathname])

  useEffect(() => {
    const cardCont = document.querySelectorAll('.cardCont')
    const popups = document.querySelectorAll('.confirmationPopup')

    popups.forEach((e) => (e.style.top = `${scrolled}px`))
    cardCont.forEach((e) => (e.style.top = `${scrolled}px`))
  }, [scrolled])

  const { user: userInfo } = useSelector((state) => state.userInfo)

  useEffect(() => {
    if (userInfo.rank === 'admin') {
      //?Stock update Realtime
      //   socket.on("NewUser", () => {
      //     dispatch({
      //       type: "NEW_DASHBOARD_USERS",
      //     })
      //   })
    }
  }, [])
  const [searchValue, setSearchValue] = useState('')

  const animCondition = () => {
    if (lastLocation) {
      if (
        lastLocation.pathname.split('/')[2] &&
        lastLocation.pathname.split('/')[1].toLowerCase() === 'products' &&
        !lastLocation.pathname.split('/')[3]
      ) {
        return ''
      } else {
        return hide
      }
    } else {
      return hide
    }
  }

  const { asking: deleteAsking, confirm } = useSelector(
    (state) => state.deleteProduct
  )
  const [clickedForDelete, setClickedForDelete] = useState('')

  useEffect(() => {
    if (confirm) {
      dispatch(deleteProduct(clickedForDelete._id))
    }
  }, [confirm])

  const lastCondition = () =>
    lastLocation
      ? lastLocation.pathname.split('/')[3] !== 'add' ||
        lastLocation.pathname.split('/')[3] !== 'edit'
      : true
  const lastCondition2 = () =>
    lastLocation
      ? lastLocation.pathname.split('/')[3] === 'add' ||
        lastLocation.pathname.split('/')[3] === 'edit'
      : true

  const condition4 = () => {
    if (lastLocation) {
      if (lastLocation.pathname.split('/')[3] !== 'edit') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  const [openFilter, setOpenFilter] = useState(false)

  const searches = qs.parse(location.search, { ignoreQueryPrefix: true })

  const [brand, setBrand] = useState(searches.brand ? searches.brand : '')
  const [category, setCategory] = useState(
    searches.category ? searches.category : ''
  )
  const sortValueFromSearch = Object.keys(searches)[0]
    ? Object.keys(searches)[0]
    : 'Date'
  const sortTypeFromSearch = searches[Object.keys(searches)[0]]
    ? searches[Object.keys(searches)[0]]
    : 'Newest'
  const [sortValue, setSortValue] = useState(sortValueFromSearch)
  const [sortType, setSortType] = useState(sortTypeFromSearch)
  const [sortValues] = useState([
    'Date',
    'Price',
    'Rating',
    'Selling by qty',
    'Selling by value',
  ])
  const [sortValueTypes, setSortValueTypes] = useState(['Newest', 'Oldest'])

  const [openType, setOpenType] = useState(false)
  const [openValue, setOpenValue] = useState(false)

  useEffect(() => {
    switch (sortValue) {
      case 'Date':
        setSortValueTypes(['Newest', 'Oldest'])
        setSortType('Newest')
        break
      case 'Price':
        setSortValueTypes(['Highest', 'Lowest'])
        setSortType('Highest')
        break
      case 'Rating':
        setSortValueTypes(['Top Rated', 'Underrated'])
        setSortType('Top Rated')
        break
      case 'Selling by qty':
        setSortValueTypes(['Highest', 'Lowest'])
        setSortType('Highest')
        break
      case 'Selling by value':
        setSortValueTypes(['Highest', 'Lowest'])
        setSortType('Highest')
        break
      default:
        break
    }
  }, [sortValue])

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
  const filterRef = useRef(null)
  useOutsideAlerter(filterRef, () => setOpenFilter(false))
  const valueRef = useRef(null)
  useOutsideAlerter(valueRef, () => setOpenValue(false))
  const typeRef = useRef(null)
  useOutsideAlerter(typeRef, () => setOpenType(false))

  const [cardScrolled, setCardScrolled] = useState(0)
  const [cardScrolled2, setCardScrolled2] = useState(0)

  useEffect(() => {
    if (
      location.pathname.split('/')[3] !== 'add' &&
      location.pathname.split('/')[4] !== 'image'
    ) {
      setCardScrolled(0)

      const firstChild = document.querySelector(
        '.card-large-scrollable-content div:first-child'
      )
      if (firstChild) {
        setTimeout(() => {
          firstChild.scroll({
            top: 0,
            left: 0,
          })
        }, 250)
      }
    }
    if (
      location.pathname.split('/')[3] !== 'edit' &&
      location.pathname.split('/')[5] !== 'image'
    ) {
      setCardScrolled2(0)

      const firstChild = document.querySelector(
        '.card-big-large-scrollable-content div:first-child'
      )
      if (firstChild) {
        setTimeout(() => {
          firstChild.scroll({
            top: 0,
            left: 0,
          })
        }, 250)
      }
    }
  }, [location.pathname])

  const actionsInfoStorage = localStorage.getItem('actionsInfo')
  const [actionsInfo, setActionsInfo] = useState(
    actionsInfoStorage !== null ? JSON.parse(actionsInfoStorage) : true
  )
  useEffect(() => {
    const container = document.querySelector(
      '.large-scrollable-content div:first-child'
    )
    if (
      deleteAsking ||
      location.pathname.split('/')[3] === 'add' ||
      location.pathname.split('/')[3] === 'edit'
    )
      container.classList.add('preventScrolling')
    else container.classList.remove('preventScrolling')
  }, [deleteAsking, location.pathname])

  const filterHandler = (e) => {
    e.preventDefault()
    console.log('Submited')
    const acutalSortType = () => {
      switch (sortValue) {
        case 'Date':
          return 'createdAt'
        case 'Price':
          return 'price'
        case 'Rating':
          return 'topRated'
        case 'Selling by qty':
          return 'topSoldStocks'
        case 'Selling by value':
          return 'topSelling'
      }
    }
    let baseURL = `?${acutalSortType()}=${sortType.toLowerCase()}`
    if (brand) baseURL += `&brand=${brand}`
    if (category) baseURL += `&category=${category}`

    history.push(baseURL)

    setOpenFilter(false)
  }
  useEffect(() => {
    const searches = qs.parse(location.search, { ignoreQueryPrefix: true })

    if (Object.size(searches)) {
      const sortValue = Object.keys(searches)[0]
        ? Object.keys(searches)[0]
        : null
      const sortType = searches[Object.keys(searches)[0]]
        ? searches[Object.keys(searches)[0]]
        : null

      const brandValue = searches.brand ? searches.brand : null
      const categoryValue = searches.category ? searches.category : null
      dispatch(
        productListAction(sortValue, sortType, brandValue, categoryValue)
      )
    }
  }, [location.search])
  return (
    <StyledOrders>
      <DashboardNewProduct
        scrolled={cardScrolled}
        setScrolled={setCardScrolled}
      />
      <DashboardEditProduct
        scrolled={cardScrolled2}
        setScrolled={setCardScrolled2}
      />
      <ConfirmPopup
        condition={deleteAsking}
        type='deleteProduct'
        action={`Delete "${clickedForDelete.name}"`}
      />
      {loading && !filtering && <Loader />}
      {error && <DashboardError error={error} />}
      {(!loading || filtering) && (
        <>
          {(products && lastLocation
            ? lastLocation.pathname.split('/')[1] === 'products'
            : false && lastLocation
            ? !lastLocation.pathname.split('/')[3]
            : false) ||
          (products && !loading && lastCondition()) ||
          (products && lastCondition2()) ||
          ((location.pathname.split('/')[3] === 'add' || condition4()) &&
            products) ||
          filtering ? (
            <div
              id={`${location.pathname.split('/')[3] === 'add' ? 'blur' : ''}`}
              className='cont'
            >
              <div className='head'>
                <div className='title'>
                  <h1>Products</h1>
                  <p>{count} Products Found</p>
                </div>
                <button
                  onClick={() => history.push('/dashboard/products/add')}
                  className='addProduct'
                >
                  <img src={add} /> New Product
                </button>
              </div>
              <div className='search' onSubmit={searchHandler}>
                <form
                  onSubmit={filterHandler}
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
                            <img src={sort} />
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
                              <img src={arrow} />
                              {openType && (
                                <div className='sortValueDropDown selectDropDown'>
                                  {sortValues.map((e) => (
                                    <h3
                                      className={`${
                                        sortValue === e ? 'active' : ''
                                      }`}
                                      onClick={(e) => {
                                        setSortValue(e.target.innerText)
                                      }}
                                    >
                                      {e}
                                    </h3>
                                  ))}
                                </div>
                              )}
                            </div>
                            <img src={connect} />
                            <div
                              ref={valueRef}
                              onClick={() => {
                                setOpenValue(!openValue)
                              }}
                              className='sortType'
                            >
                              <p>{sortType}</p>
                              <img src={arrow} />
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
                        <div className='brand'>
                          <p>Brand</p>
                          <Input value={brand} setValue={setBrand} />
                        </div>
                        <div className='category'>
                          <p>Category</p>
                          <Input value={category} setValue={setCategory} />
                        </div>
                        <div className='btnDiv'>
                          <button type='submit' className='filterBtnSubmit'>
                            Filter & Sort
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
                <form className='searchContainer'>
                  <div className='inputCont'>
                    <input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder='Search'
                      type='text'
                    />
                    {/* {searchUser && (
                  <img onClick={returnHandler} src={smallX} alt='' />
                )} */}
                  </div>
                  <button type='submit'>
                    <img src={search} />
                  </button>
                </form>
              </div>

              {(products && products.length > 0) || filtering ? (
                <div className='headers'>
                  <div className='id'>
                    <p>Id</p>
                  </div>
                  <div className='name'>
                    <p>Name</p>
                  </div>
                  <div className='Price'>
                    <p>Price</p>
                  </div>
                  <div className='Category'>
                    <p>Category</p>
                  </div>
                  <div className='Brand'>
                    <p>Brand</p>
                  </div>
                  <div className='Stock'>
                    <p>Stock</p>
                  </div>
                  <div className='Actions'>
                    <p>
                      Actions
                      <img
                        id='actionImgInfo'
                        className={`${actionsInfo ? 'active' : 'notActive'}`}
                        onClick={() => {
                          localStorage.setItem('actionsInfo', !actionsInfo)
                          setActionsInfo(!actionsInfo)
                        }}
                        src={info}
                      />
                    </p>
                  </div>
                </div>
              ) : !filtering ? (
                <p className='center'>No products was found!</p>
              ) : (
                ''
              )}
              {filtering && <Loader providedClassName='filterLoading' />}
              {!filtering && (
                <>
                  {products && (
                    <motion.div
                      variants={animCondition()}
                      initial='hidden'
                      animate='show'
                      exit='exit'
                    >
                      {products.map((each) => (
                        <ProductDashboard
                          actionsInfo={actionsInfo}
                          setClickedForDelete={setClickedForDelete}
                          clickedForDelete={clickedForDelete}
                          key={each._id}
                          product={each}
                        />
                      ))}
                    </motion.div>
                  )}
                </>
              )}
            </div>
          ) : (
            ''
          )}
        </>
      )}
    </StyledOrders>
  )
}

const StyledOrders = styled(motion.div)`
  .filterLoading #loader {
    width: calc(2rem + 1vw) !important;
    height: calc(2rem + 1vw) !important;
  }
  .addProduct {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-right: 0.4rem;
      width: 19px;
      height: 19px;
    }
  }
  .btnDiv {
    display: flex;
    justify-content: flex-end;
    padding-top: 0.8rem;
    .filterBtnSubmit {
      color: white;
      padding: 0.6rem 1.3rem;
      background: #56589e;
      font-size: calc(0.85rem + 0.3vw);
      &:hover {
        background: #4c4e8b;
      }
    }
  }
  #action-info-tooltip {
    padding: 8px 18px !important;
  }
  .Actions {
    p {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    #actionImgInfo {
      transition: 0.2s ease;
      width: 20px;
      height: 20px;
      margin-left: 0.55rem;
      cursor: pointer;
      &.active {
        opacity: 1;
      }
      &.notActive {
        opacity: 0.5;
      }
    }
  }
  overflow-x: hidden;
  overflow-y: hidden;
  height: max-content;
  min-height: 100%;
  .sortValue,
  .sortType {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .selectDropDown {
      position: absolute;
      left: 0;
      bottom: 0;
      width: max-content;
      height: max-content;
      transform: translate(0, 105%);
      background: #4b4d8b;
      box-shadow: rgba(29, 32, 62, 0.42) 0px 2px 10px;
      border-radius: 7px;
      overflow: hidden;
      padding: 0.3rem;
      cursor: auto;
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
    img {
      margin: 0 0 0 0.35rem !important;
      width: 12px !important;
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
    width: calc(13.5rem + 3vw) !important;
  }
  &#blur {
    filter: blur(2px);
  }
  .addProduct {
    background: #373864;
    color: white;
    padding: 0.7rem 1.2rem;
    font-size: calc(0.78rem + 0.3vw);
    border: none;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s ease;
    &:hover {
      background: #31335a;
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .center {
    text-align: center;
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
  .searchContainer {
    display: flex;
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
      pointer-events: none;
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
      .sort img {
        width: 20px;
        height: 20px;
        pointer-events: none;
        user-select: none;
        margin: 0 0.5rem;
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
          margin-bottom: 0;
          margin-right: 0;
          width: calc(13.5rem + 3vw) !important;
          background: rgba(77, 79, 142, 90%) !important;
          transition: 0.2s ease;
          &:focus {
            background: rgb(71, 73, 131) !important;
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
  .sort p {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin: 0rem !important;
    }
  }
  .search {
    display: flex;
    //!Space-between
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
      padding-right: 2vw;
    }
    .name {
      min-width: 23%;
      padding-right: 2vw;
    }
    .Price {
      min-width: 10%;
      padding-right: 2vw;
    }
    .Category {
      min-width: 14%;
      padding-right: 2vw;
    }
    .Brand {
      padding-right: 2vw;
      min-width: 14%;
    }
    .Stock {
      padding-right: 2vw;
      min-width: 9%;
    }
    .Actions {
      min-width: 18%;
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
  .sort p img {
    width: 16px !important;
    height: 16px !important;
  }
  .sortType,
  .sortValue {
    width: calc((6.75rem + 1.5vw) - (0.5rem + 10px)) !important;
    p {
      display: block !important;
      justify-content: flex-start !important;
      overflow: hidden !important;
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      justify-content: flex-start !important;
    }
  }
`

export default DashboardProducts
