import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { productListAction } from "../actions/products"
import Loader from "../components/loader"
import DashboardError from "../components/DashboardError"
import { motion } from "framer-motion"
import { hide } from "../animations"
import search from "../img/searchIcon.svg"
import { useHistory, useLocation } from "react-router-dom"
import smallX from "../img/smallX.svg"
import { useLastLocation } from "react-router-last-location"
import { throttle } from "underscore"
import socket from "../clientSocket/socket"
import { useInView } from "react-intersection-observer"
import infiniteScrollUsersAction from "../actions/infiniteScrollUsers"
import infiniteScrollSearchUsersAction from "../actions/infiniteScrollSearchedUsers"
import ConfirmPopup from "../components/confirmPopup"
import ProductDashboard from "../components/ProductDashboard"
import { useDispatch, useSelector } from "react-redux"
import deleteProduct from "../actions/deleteProduct"
import DashboardNewProduct from "./DashboardNewProduct"
import DashboardEditProduct from "./DashboardEditProduct"

const DashboardProducts = () => {
  const { products, error, loading, count } = useSelector(
    (state) => state.productList
  )

  const [skip, setSkip] = useState(1)
  const [skip2, setSkip2] = useState(1)

  const lastLocation = useLastLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (lastLocation) {
      if (
        location.pathname.split("/")[3] === "add" ||
        (lastLocation.pathname.split("/")[2] &&
          lastLocation.pathname.split("/")[1] === "products" &&
          !lastLocation.pathname.split("/")[3]) ||
        (lastLocation.pathname.split("/")[3] === "add" && products) ||
        (lastLocation.pathname === "/dashboard/products" &&
          location.pathname === "/dashboard/products/add") ||
        (location.pathname === "/dashboard/products/add" &&
          lastLocation.pathname === "/dashboard/products/add") ||
        (lastLocation.pathname.split("/")[3] === "edit" && products) ||
        (location.pathname.split("/")[3] === "edit" && products)
      ) {
        return
      }
      dispatch(productListAction())
    } else {
      if (
        location.pathname.split("/")[3] !== "add" &&
        location.pathname.split("/")[3] !== "edit"
      )
        dispatch(productListAction())
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
    const popups = document.querySelectorAll(".confirmationPopup")

    popups.forEach((e) => (e.style.top = `${scrolled}px`))
    cardCont.style.top = `${scrolled}px`
  }, [scrolled])

  const { user: userInfo } = useSelector((state) => state.userInfo)

  useEffect(() => {
    if (userInfo.rank === "admin") {
      //?Stock update Realtime
      //   socket.on("NewUser", () => {
      //     dispatch({
      //       type: "NEW_DASHBOARD_USERS",
      //     })
      //   })
    }
  }, [])
  const [searchValue, setSearchValue] = useState("")

  const animCondition = () => {
    if (lastLocation) {
      if (
        lastLocation.pathname.split("/")[2] &&
        lastLocation.pathname.split("/")[1].toLowerCase() === "products" &&
        !lastLocation.pathname.split("/")[3]
      ) {
        return ""
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
  const [clickedForDelete, setClickedForDelete] = useState("")

  useEffect(() => {
    if (confirm) {
      dispatch(deleteProduct(clickedForDelete._id))
    }
  }, [confirm])

  const lastCondition = () =>
    lastLocation
      ? lastLocation.pathname.split("/")[3] !== "add" ||
        lastLocation.pathname.split("/")[3] !== "edit"
      : true
  const lastCondition2 = () =>
    lastLocation
      ? lastLocation.pathname.split("/")[3] === "add" ||
        lastLocation.pathname.split("/")[3] === "edit"
      : true

  const condition4 = () => {
    if (lastLocation) {
      if (lastLocation.pathname.split("/")[3] !== "edit") {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  return (
    <StyledOrders>
      <DashboardNewProduct />
      <DashboardEditProduct />
      <ConfirmPopup
        condition={deleteAsking}
        type='deleteProduct'
        action={`Delete "${clickedForDelete.name}"`}
      />
      {loading && <Loader />}
      {error && <DashboardError error={error} />}
      {!loading && (
        <>
          {(products && lastLocation
            ? lastLocation.pathname.split("/")[1] === "products"
            : false && lastLocation
            ? !lastLocation.pathname.split("/")[3]
            : false) ||
          (products && !loading && lastCondition()) ||
          (products && lastCondition2()) ||
          ((location.pathname.split("/")[3] === "add" || condition4()) &&
            products) ? (
            <div
              id={`${location.pathname.split("/")[3] === "add" ? "blur" : ""}`}
              className='cont'
            >
              <div className='head'>
                <div className='title'>
                  <h1>Products</h1>
                  <p>{count} Products Found</p>
                </div>
                <button
                  onClick={() => history.push("/dashboard/products/add")}
                  className='addProduct'
                >
                  Add new Product
                </button>
              </div>
              <form className='search' onSubmit={searchHandler}>
                <div className='searchContainer'>
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
                </div>
              </form>

              {products.length > 0 ? (
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
                    <p>Actions</p>
                  </div>
                </div>
              ) : (
                <p className='center'>No products was found!</p>
              )}
              {products && (
                <motion.div
                  variants={animCondition()}
                  initial='hidden'
                  animate='show'
                  exit='exit'
                >
                  {products.map((each) => (
                    <ProductDashboard
                      setClickedForDelete={setClickedForDelete}
                      clickedForDelete={clickedForDelete}
                      key={each._id}
                      product={each}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </StyledOrders>
  )
}

const StyledOrders = styled(motion.div)`
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
    transition: 0.2s ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      filter: brightness(1000);
      margin-left: 0.4rem;
      transition: 0.08s ease;
    }
    .activeFilterImg {
      transform: rotate(180deg);
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
          background: #3f4175;
          color: rgba(255, 255, 255, 1) !important;
        }
      }
    }
  }
  .search {
    display: flex;
    //!Space-between
    justify-content: flex-end;
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
`

export default DashboardProducts
