import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { productListAction } from '../actions/products'
import Loader from '../components/loader'
import DashboardError from '../components/DashboardError'
import { AnimatePresence, motion } from 'framer-motion'
import { hide, popupLeft } from '../animations'
import { useHistory, useLocation } from 'react-router-dom'

import { ReactComponent as Search } from '../img/searchIcon.svg'
import { ReactComponent as SmallX } from '../img/smallX.svg'
import { ReactComponent as Sort } from '../img/sort.svg'
import { ReactComponent as Connect } from '../img/connect.svg'
import { ReactComponent as Arrow } from '../img/arrow3.svg'
import { ReactComponent as Info } from '../img/info.svg'
import { ReactComponent as Add } from '../img/addIcon.svg'
import { useLastLocation } from 'react-router-last-location'
import { throttle } from 'underscore'
import socket from '../clientSocket/socket'
import ConfirmPopup from '../components/confirmPopup'
import ProductDashboard from '../components/ProductDashboard'
import { useDispatch, useSelector } from 'react-redux'
import deleteProduct from '../actions/deleteProduct'
import DashboardNewProduct from './DashboardNewProduct'
import DashboardEditProduct from './DashboardEditProduct'
import Input from '../components/DashboardInput'
import { useRef } from 'react'
import qs from 'qs'
import searchProducts from '../actions/searchProduct'
import { Scrollbars } from 'react-custom-scrollbars'
import infiniteScrollProducts from '../actions/infiniteScrollProducts'
import infiniteScrollProductsSearched from '../actions/infiniteScrollSearchedProducts'
import { useInView } from 'react-intersection-observer'
import ReactTooltip from 'react-tooltip'

interface Props {
  setDashboardScrollPosition: any
  dashboardScrollPosition: any
  scrollRef: any
}

const DashboardProducts: FC<Props> = ({
  setDashboardScrollPosition,
  dashboardScrollPosition,
  scrollRef,
}) => {
  useEffect(() => {
    if (scrollRef.current) {
      const view = document.querySelector('.view')

      if (view)
        view.scroll({
          left: 0,
          top: dashboardScrollPosition,
          behavior: 'smooth',
        })
    }
  }, [scrollRef.current])
  const size = function (obj: any) {
    var size = 0,
      key
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++
    }
    return size
  }

  const { products, error, loading, count, filtering, infiniteLoading } =
    useSelector((state: any) => state.productList)

  const [skip, setSkip] = useState(1)
  const [skip2, setSkip2] = useState(1)

  const lastLocation = useLastLocation() as any
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
          location.pathname.split('/')[3] === 'edit' ||
          searches.search
        ) {
          return
        }

        dispatch(productListAction())
        setSkip(1)
      } else {
        if (
          location.pathname.split('/')[3] !== 'add' &&
          location.pathname.split('/')[3] !== 'edit' &&
          !searches.search
        ) {
          dispatch(productListAction())
          setSkip(1)
        }
      }
    }
  }, [dispatch, lastLocation])

  const searchHandler = (e: any) => {
    e.preventDefault()
    //?Search Products
    if (searchValue.length) history.push(`?search=${searchValue}`)
  }

  const returnHandler = () => {
    //?Clear search and redirect
    setSearchValue('')
    history.push('/dashboard/products')
  }

  const [scrolled, setScrolled] = useState(0)

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
  }, [])

  useEffect(() => {
    const container = document.querySelector('.view') as HTMLDivElement

    if (container) {
      if (location.pathname.split('/')[3]) container.style.overflowY = 'hidden'
      else container.style.overflowY = 'scroll'
    }
  }, [location.pathname])

  useEffect(() => {
    const cardCont = document.querySelectorAll('.cardCont')
    const popups = document.querySelectorAll('.confirmationPopup')

    popups.forEach((e: any) => (e.style.top = `${scrolled}px`))
    cardCont.forEach((e: any) => (e.style.top = `${scrolled}px`))
  }, [scrolled])

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
    (state: any) => state.deleteProduct
  )
  const [clickedForDelete, setClickedForDelete] = useState<any>('')

  useEffect(() => {
    if (confirm) {
      dispatch(deleteProduct(clickedForDelete._id, searches.search))
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

  const searches = qs.parse(location.search, { ignoreQueryPrefix: true }) as any

  const [brand, setBrand] = useState(searches.brand ? searches.brand : '')
  const [category, setCategory] = useState(
    searches.category ? searches.category : ''
  )
  const sortValueFromSearch = Object.keys(searches)[0]
    ? Object.keys(searches)[0]
    : 'Date'
  const sortTypeFromSearch = searches[Object.keys(searches)[0]]
    ? searches[Object.keys(searches)[0]].charAt(0).toUpperCase() +
      searches[Object.keys(searches)[0]].slice(1)
    : 'Newest'
  const [sortValue, setSortValue] = useState(sortValueFromSearch)
  const [sortType, setSortType] = useState(sortTypeFromSearch)
  const [sortValues] = useState([
    'Date',
    'Price',
    'Rating',
    'Selling by qty',
    'Selling by value',
    'Stock',
  ])
  const [sortValueTypes, setSortValueTypes] = useState(['Newest', 'Oldest'])

  const [openType, setOpenType] = useState(false)
  const [openValue, setOpenValue] = useState(false)

  const [changedValue, setChangedValue] = useState(false)

  useEffect(() => {
    if (!openFilter) {
      const brand = searches.brand
      const category = searches.category
      if (brand) {
        setBrand(brand)
      } else {
        setBrand('')
      }
      if (category) {
        setCategory(category)
      } else {
        setCategory('')
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
      case 'Price':
        setSortValueTypes(['Highest', 'Lowest'])
        setSortType(
          sortTypeFromSearch && !changedValue ? sortTypeFromSearch : 'Highest'
        )
        break
      case 'Rating':
        setSortValueTypes(['Top Rated', 'Underrated'])
        setSortType(
          sortTypeFromSearch && !changedValue ? sortTypeFromSearch : 'Top Rated'
        )
        break
      case 'Selling by qty':
        setSortValueTypes(['Highest', 'Lowest'])
        setSortType(
          sortTypeFromSearch && !changedValue ? sortTypeFromSearch : 'Highest'
        )
        break
      case 'Selling by value':
        setSortValueTypes(['Highest', 'Lowest'])
        setSortType(
          sortTypeFromSearch && !changedValue ? sortTypeFromSearch : 'Highest'
        )
        break
      case 'Stock':
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
  const [actionsInfo, setActionsInfo] = useState<any>(
    actionsInfoStorage !== null ? Boolean(JSON.parse(actionsInfoStorage)) : true
  )
  useEffect(() => {
    const container = document.querySelector('.view')
    if (container) {
      if (
        deleteAsking ||
        location.pathname.split('/')[3] === 'add' ||
        location.pathname.split('/')[3] === 'edit'
      )
        container.classList.add('preventScrolling')
      else container.classList.remove('preventScrolling')
    }
  }, [deleteAsking, location.pathname])

  const filterHandler = (e?: any, reset?: any) => {
    if (e) {
      e.preventDefault()
    }
    if (
      (sortValue && sortType) ||
      brand.length !== 0 ||
      category.length !== 0
    ) {
      let baseURL = `?${sortValue}=${sortType}`

      if (reset !== 'all') {
        if (brand && reset !== 'brand') baseURL += `&brand=${brand}`
        if (category && reset !== 'category') baseURL += `&category=${category}`
      } else {
        baseURL = '/dashboard/products'
      }
      setSkip(1)
      history.push(baseURL)
    }
    setOpenFilter(false)
  }
  function capitalizeFirstLetter(string: any) {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1)
  }
  useEffect(() => {
    if (location.pathname.split('/')[3] !== 'edit') {
      if (!size(searches)) {
        setSortValue('Date')
        setSortType('Newest')
        setBrand('')
        setCategory('')
      }

      if (location.pathname.split('/')[3] === 'add' && products) {
        return
      } else {
        if (
          size(searches) && !searches.search && lastLocation
            ? lastLocation.pathname.split('/')[1] !== 'products'
            : true
        ) {
          const acutalSortType = (sortValue: string) => {
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
              case 'Stock':
                return 'stock'
            }
          }

          const sortValue = Object.keys(searches)[0]
            ? acutalSortType(Object.keys(searches)[0])
            : null

          setSortValue(
            Object.keys(searches)[0]
              ? capitalizeFirstLetter(Object.keys(searches)[0])
              : 'Date'
          )
          const sortType = searches[Object.keys(searches)[0]]
            ? searches[Object.keys(searches)[0]]
            : null

          setSortType(
            searches[Object.keys(searches)[0]]
              ? capitalizeFirstLetter(searches[Object.keys(searches)[0]])
              : 'Newest'
          )

          const brandValue = searches.brand ? searches.brand : null
          const categoryValue = searches.category ? searches.category : null

          if (!searches.search && !loading && size(searches)) {
            dispatch(
              productListAction(
                sortValue,
                sortType.toLowerCase(),
                brandValue,
                categoryValue
              )
            )
          }
        }
      }
    }
  }, [location.search])
  useEffect(() => {
    if (
      (searches.search && location.pathname.split('/')[3] !== 'edit') ||
      (lastLocation
        ? lastLocation.pathname.split('/')[3] === 'edit' &&
          !searchedProducts &&
          searches.search
        : true)
    ) {
      if (
        lastLocation
          ? lastLocation.pathname.split('/')[3] !== 'edit' &&
            lastLocation.pathname.split('/')[1] !== 'products'
          : true && !searchedProducts
      ) {
        dispatch(searchProducts(searches.search))
        setSkip2(1)
      }
    }
  }, [location.search, location.pathname])
  const {
    products: searchedProducts,
    count: searchedCount,
    loading: searchLoading,
  } = useSelector((state: any) => state.productSearch)

  const [searchValue, setSearchValue] = useState(
    searches.search ? searches.search : ''
  )
  useEffect(() => {
    if (location.pathname === '/dashboard/products' && !searches.search) {
      setSearchValue('')
    }
  }, [location.search, location.pathname])

  const [data, setData] = useState<any>(null)
  useEffect(() => {
    socket.on('StockChanged', (data) => {
      setData(data)
    })
  }, [])
  useEffect(() => {
    if (data) {
      if (!searches.search) {
        data.forEach((e: any) =>
          dispatch({
            type: 'UPDATE_PRODUCT_STOCK',
            payload: {
              id: e._id,
              newStock: e.countInStock,
            },
          })
        )
      } else if (searchedProducts) {
        data.forEach((e: any) =>
          dispatch({
            type: 'UPDATE_SEARCH_PRODUCT_STOCK',
            payload: {
              id: e._id,
              newStock: e.countInStock,
            },
          })
        )
      }
    }
  }, [data])

  const [element, inView] = useInView()

  const infiniteScrollingMoreData = () => {
    const acutalSortType = (sortValue: string) => {
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
        case 'Stock':
          return 'stock'
      }
    }
    if (!searches.search && products && !loading && !infiniteLoading) {
      dispatch(
        infiniteScrollProducts(
          skip,
          acutalSortType(sortValue),
          sortType.toLowerCase(),
          searches.brand ? searches.brand : '',
          searches.category ? searches.category : ''
        )
      )
      setSkip(skip + 1)
    }
  }
  const infiniteScrollingMoreDataSearched = () => {
    if (
      searches.search &&
      searchedProducts &&
      !searchLoading &&
      !infiniteLoading
    ) {
      dispatch(infiniteScrollProductsSearched(skip2, searches.search))
      setSkip2(skip2 + 1)
    }
  }
  useEffect(() => {
    if (inView && !searches.search && !loading) {
      infiniteScrollingMoreData()
    } else if (inView && searches.search && !searchLoading) {
      infiniteScrollingMoreDataSearched()
    }
  }, [inView])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [products, searchedProducts])

  return (
    <StyledDashboardProducts>
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
      {((loading && !filtering) || (searchLoading && !filtering)) && <Loader />}
      {error && <DashboardError error={error} />}
      {(!loading || filtering || !searchLoading) && (
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
          filtering ||
          searchedProducts ? (
            <div
              id={`${location.pathname.split('/')[3] ? 'blur' : ''}`}
              className='cont'
            >
              {((!loading && !searches.search) ||
                (!searchLoading && searches.search) ||
                filtering) && (
                <>
                  <div className='head'>
                    <div className='title'>
                      <h1>Products</h1>
                      <p>
                        {!searches.search
                          ? count
                            ? count
                            : '..'
                          : searches.search
                          ? searchedCount
                            ? searchedCount
                            : '..'
                          : ''}{' '}
                        Products Found{' '}
                        {`${
                          searches.brand || searches.category
                            ? `(filtered)`
                            : ''
                        }`}
                        {`${
                          searches.search || searches.search ? `(search)` : ''
                        }`}
                      </p>
                    </div>
                    {!searches.search && (
                      <button
                        onClick={() => {
                          let baseURL = '/dashboard/products/add?'
                          if (searches[Object.keys(searches)[0]]) {
                            baseURL += `${Object.keys(searches)[0]}=${
                              searches[Object.keys(searches)[0]]
                            }&`
                          }
                          if (searches.brand) {
                            baseURL += `brand=${searches.brand}&`
                          }
                          if (searches.category) {
                            baseURL += `category=${searches.category}&`
                          }

                          history.push(baseURL)
                        }}
                        className='addProduct'
                      >
                        <Add />
                        New Product
                      </button>
                    )}
                  </div>
                  <div className='search' onSubmit={searchHandler}>
                    {searches.search && <div></div>}
                    {!searches.search && (
                      <div
                        ref={filterRef}
                        onClick={(e: any) => {
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
                                        <Scrollbars>
                                          {sortValues.map((e) => (
                                            <h3
                                              className={`${
                                                sortValue === e ? 'active' : ''
                                              }`}
                                              onClick={(e: any) => {
                                                setSortValue(e.target.innerText)
                                                setChangedValue(true)
                                              }}
                                            >
                                              {e}
                                            </h3>
                                          ))}
                                        </Scrollbars>
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
                                            onClick={(e: any) => {
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
                                <div className='inputDiv'>
                                  <Input value={brand} setValue={setBrand} />
                                  {searches.brand && (
                                    <SmallX
                                      className='clearFilter'
                                      onClick={() => {
                                        filterHandler(null, 'brand')
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className='category'>
                                <p>Category</p>
                                <div className='inputDiv'>
                                  <Input
                                    value={category}
                                    setValue={setCategory}
                                  />
                                  {searches.category && (
                                    <SmallX
                                      onClick={() => {
                                        filterHandler(null, 'category')
                                      }}
                                      className='clearFilter'
                                    />
                                  )}
                                </div>
                              </div>
                              <div className='btnDiv'>
                                {size(searches) > 0 &&
                                  (Object.keys(searches)[0] !== 'Date' ||
                                    searches[Object.keys(searches)[0]]
                                      .charAt(0)
                                      .toUpperCase() +
                                      searches[Object.keys(searches)[0]].slice(
                                        1
                                      ) !==
                                      'Newest' ||
                                    searches.brand ||
                                    searches.category) && (
                                    <button
                                      onClick={() => filterHandler(null, 'all')}
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
                    <form className='searchContainer'>
                      <div className='inputCont'>
                        <input
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          placeholder='Search'
                          type='text'
                        />
                        {searches.search && searchedProducts && (
                          <SmallX onClick={returnHandler} />
                        )}
                      </div>
                      <button type='submit'>
                        <Search />
                      </button>
                    </form>
                  </div>
                </>
              )}
              {(!loading &&
                products &&
                products.length > 0 &&
                !searches.search) ||
              (!searchLoading &&
                searches.search &&
                searchedProducts &&
                searchedProducts.length > 0) ||
              filtering ? (
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
                      <Info
                        id='actionImgInfo'
                        className={`${actionsInfo ? 'active' : 'notActive'}`}
                        onClick={() => {
                          localStorage.setItem(
                            'actionsInfo',
                            !actionsInfo as any
                          )
                          setActionsInfo(!actionsInfo)
                        }}
                      />
                    </p>
                  </div>
                </div>
              ) : !filtering &&
                products &&
                products.length === 0 &&
                !searches.search ? (
                <p className='center'>No products was found!</p>
              ) : !filtering &&
                searchedProducts &&
                searchedProducts.length === 0 &&
                searches.search ? (
                <p className='center'>No products was found!</p>
              ) : (
                ''
              )}
              {filtering && <Loader providedClassName='filterLoading' />}
              {!filtering && (
                <>
                  {!searches.search && products ? (
                    <motion.div
                      variants={animCondition() as any}
                      initial='hidden'
                      animate='show'
                      exit='exit'
                    >
                      {actionsInfo && (
                        <ReactTooltip
                          delayHide={100}
                          delayShow={400}
                          effect='solid'
                          id='action-info-tooltip'
                        />
                      )}
                      <ReactTooltip
                        id='product-card-tooltip'
                        effect='solid'
                        delayHide={100}
                        delayShow={400}
                      />

                      {products.map((each: any) => (
                        <ProductDashboard
                          setDashboardScrollPosition={
                            setDashboardScrollPosition
                          }
                          data={data}
                          setClickedForDelete={setClickedForDelete}
                          key={each._id}
                          product={each}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    ''
                  )}
                  {searches.search && searchedProducts ? (
                    <motion.div
                      variants={animCondition() as any}
                      initial='hidden'
                      animate='show'
                      exit='exit'
                    >
                      {actionsInfo && (
                        <ReactTooltip
                          delayHide={100}
                          delayShow={400}
                          effect='solid'
                          id='action-info-tooltip'
                        />
                      )}
                      <ReactTooltip
                        id='product-card-tooltip'
                        effect='solid'
                        delayHide={100}
                        delayShow={400}
                      />
                      {searchedProducts.map((each: any) => (
                        <ProductDashboard
                          setDashboardScrollPosition={
                            setDashboardScrollPosition
                          }
                          data={data}
                          search={searches.search}
                          setClickedForDelete={setClickedForDelete}
                          key={each._id}
                          product={each}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
          ) : (
            ''
          )}
          {(products && products.length < count && !searches.search) ||
          (searchedProducts &&
            searchedProducts.length < searchedCount &&
            searches.search) ? (
            <Loader providedClassName='infiniteLoader' reference={element} />
          ) : (
            !loading &&
            !searchLoading &&
            (products || searchedProducts) &&
            ((searchedCount !== 0 && searches.search) ||
              (count !== 0 && !searches.search)) && (
              <p className='end'>Yay! You have seen it all</p>
            )
          )}
        </>
      )}
    </StyledDashboardProducts>
  )
}

const StyledDashboardProducts = styled(motion.div)`
  .cont {
    transition: all 0.2s ease;
  }
  .__react_component_tooltip {
    background: #1e203e;
    border-radius: 5px;
    &::after {
      border-top-color: #1e203e !important;
    }
  }
  .clearSearch {
    position: absolute;
    right: 9%;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
    transition: 0.2s ease;
    &:hover {
      opacity: 0.7;
    }
  }
  &.hide {
    opacity: 0 !important;
  }
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
  .filterLoading #loader {
    width: calc(2rem + 1vw) !important;
    height: calc(2rem + 1vw) !important;
  }
  .addProduct {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      margin-right: 0.4rem;
      width: 19px;
      height: 19px;
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

      &.first {
        min-height: 5.5rem;
        width: 160%;

        height: 24vh;
        max-height: 200px;
      }
      div:first-child {
        align-self: stretch;
      }
      &.first h3 {
        margin-right: 12px;
      }
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
