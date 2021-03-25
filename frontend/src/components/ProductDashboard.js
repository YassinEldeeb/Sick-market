import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { parseISO, format } from "date-fns"
import pen from "../img/pen.svg"
import trash from "../img/trash.svg"
import eye from "../img/eyeSee.svg"
import ReactTooltip from "react-tooltip"
import { motion } from "framer-motion"
import { popup, hide2 } from "../animations"
import { Link, useLocation } from "react-router-dom"
import reactStringReplace from "react-string-replace"
import Loader from "../components/loader"
import { useSelector, useDispatch } from "react-redux"
import { useLastLocation } from "react-router-last-location"
import deleteProduct from "../actions/deleteProduct"
import ConfirmPopup from "../components/confirmPopup"

const ProductDashboard = ({ product, setClickedForDelete }) => {
  const { products, error, loading, count } = useSelector(
    (state) => state.productList
  )
  const { loading: deleteLoading, success, asking, confirm } = useSelector(
    (state) => state.deleteProduct
  )
  const dispatch = useDispatch()
  const location = useLocation()
  const lastLocation = useLastLocation()

  const animCondition = () => {
    if (lastLocation) {
      if (
        lastLocation.pathname.split("/")[2] &&
        lastLocation.pathname.split("/")[1].toLowerCase() === "products" &&
        !lastLocation.pathname.split("/")[3]
      ) {
        return ""
      } else {
        return popup
      }
    } else {
      return popup
    }
  }
  const deleteHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  return (
    <StyledUser variants={animCondition()}>
      <ReactTooltip effect='solid' delayHide={100} delayShow={200} />
      <div className='id'>
        <p data-tip={"#" + product._id}>
          #{product._id.substr(product._id.length - 4)}
        </p>
      </div>
      <div className='name'>
        <img src={product.image} alt='' />
        <p data-tip={product.name}>{product.name}</p>
      </div>
      <div className='Price'>
        <p data-tip={product.price}>{product.price}</p>
      </div>
      <div className='Category'>
        <p data-tip={product.category}>{product.category}</p>
      </div>
      <div className='Brand'>
        <p data-tip={product.brand}>{product.brand}</p>
      </div>
      <div className='Stock'>
        <p data-tip={product.countInStock}>{product.countInStock}</p>
      </div>
      <div className='Actions'>
        <div className='ActionCont'>
          <div
            to={`/dashboard/customers/${product._id}`}
            className='actionOption'
          >
            <img className='gearImg' src={pen} alt='' />
          </div>
        </div>
        <div className='ActionCont'>
          <Link to={`/products/${product._id}`} className='actionOption'>
            <img className='gearImg' src={eye} alt='' />
          </Link>
        </div>
        <div className='ActionCont'>
          <div
            onClick={() => {
              setClickedForDelete(product)
              dispatch({ type: "CONFIRM_DELETE_PRODUCT_REQUEST" })
            }}
            className='actionOption trash'
          >
            {!deleteLoading ? (
              <img className='gearImg' src={trash} alt='' />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </StyledUser>
  )
}

const StyledUser = styled(motion.div)`
  .ActionCont {
    min-width: 6%;
    display: flex;
    justify-content: flex-start;
    margin-left: calc(0.2rem + 0.35vw);
    &:first-child {
      margin-left: 0;
    }
  }
  .actionOption {
    width: 100%;
    padding: 0.65rem;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: 0.2s ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44.8px;
    height: 44.8px;
    &:hover {
      background: rgba(254, 254, 254, 0.07);
    }
    .providedLoader {
      #greybackground path {
        stroke: white !important;
      }
    }
  }
  .trash {
    background: #ff6969;
    &:hover {
      background: rgba(255, 105, 105, 0.8) !important;
    }
  }
  #loader {
    width: 24px;
    height: 24px;
  }
  .highlightSearch {
    background: #232647a1;
  }
  .__react_component_tooltip {
    background: #1e203e;
    border-radius: 5px;
    &::after {
      border-top-color: #1e203e !important;
    }
  }
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #373864;
  padding: 0.85rem 2.1rem;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 1rem;
  }
  border-radius: 10px;
  overflow-x: auto;
  width: 100%;
  .name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 23%;
    p {
      color: white !important;
      margin-left: 0.7rem;
    }
  }
  .gearCont {
    min-width: 6%;
    display: flex;
    justify-content: flex-start;
  }
  .gear {
    padding: 0.65rem;
    border-radius: 10px;
    background: rgba(254, 254, 254, 0.1);
    cursor: pointer;
    transition: 0.2s ease;
    position: relative;

    &:hover {
      background: rgba(254, 254, 254, 0.07);
    }
  }
  .id,
  .name,
  .Price,
  .Category,
  .Brand,
  .Stock {
    display: flex;
  }
  .gear {
    padding-right: 0.65rem !important;
  }
  .gearImg {
    min-height: 0px;
    width: 23px;
    height: 30px;
  }
  .trash .gearImg {
    width: 21px;
  }
  .id,
  .name,
  .Price,
  .Category,
  .Brand,
  .Stock {
    p {
      color: white !important;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: max-content;
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
    display: flex;
    justify-content: flex-start;
    min-width: 18%;
  }

  img {
    width: 52px;
    height: 41.5px;
    border-radius: 10px;
  }
`

export default ProductDashboard
