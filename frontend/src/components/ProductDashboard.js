import React, { useState } from 'react'
import styled from 'styled-components'
import { parseISO, format } from 'date-fns'
import pen from '../img/pen.svg'
import trash from '../img/trash.svg'
import eye from '../img/eyeSee.svg'
import ReactTooltip from 'react-tooltip'
import { motion } from 'framer-motion'
import { popup } from '../animations'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/loader'
import { useSelector, useDispatch } from 'react-redux'
import { useLastLocation } from 'react-router-last-location'
import SmoothImg from '../components/smoothImgLoading'

const ProductDashboard = ({
  product,
  setClickedForDelete,
  actionsInfo,
  search,
}) => {
  const location = useLocation()
  const { loading: deleteLoading, success, asking, confirm } = useSelector(
    (state) => state.deleteProduct
  )
  const dispatch = useDispatch()
  const lastLocation = useLastLocation()

  const animCondition = () => {
    if (lastLocation) {
      if (
        lastLocation.pathname.split('/')[2] &&
        lastLocation.pathname.split('/')[1].toLowerCase() === 'products' &&
        !lastLocation.pathname.split('/')[3]
      ) {
        return ''
      } else {
        return popup
      }
    } else {
      return popup
    }
  }
  const [clicked, setClicked] = useState(false)

  return (
    <StyledUser variants={animCondition()}>
      <ReactTooltip
        id='product-card-tooltip'
        effect='solid'
        delayHide={100}
        delayShow={100}
      />
      {actionsInfo && (
        <ReactTooltip
          delayHide={100}
          delayShow={700}
          effect='solid'
          id='action-info-tooltip'
        />
      )}
      <div className='id'>
        <p data-for='product-card-tooltip' data-tip={'#' + product._id}>
          #{product._id.substr(product._id.length - 4)}
        </p>
      </div>
      <div className='name'>
        <SmoothImg
          width={'52px'}
          height={'41.5px'}
          loaderId='loaderImg'
          contWidth={`max-content`}
          src={product.image}
          alt=''
        />
        <p data-for='product-card-tooltip' data-tip={product.name}>
          {product.name}
        </p>
      </div>
      <div className='Price'>
        <p data-for='product-card-tooltip' data-tip={product.price}>
          {product.price}
        </p>
      </div>
      <div className='Category'>
        <p data-for='product-card-tooltip' data-tip={product.category}>
          {product.category}
        </p>
      </div>
      <div className='Brand'>
        <p data-for='product-card-tooltip' data-tip={product.brand}>
          {product.brand}
        </p>
      </div>
      <div className='Stock'>
        <p data-for='product-card-tooltip' data-tip={product.countInStock}>
          {product.countInStock}
        </p>
      </div>
      <div className='Actions'>
        <div
          data-tip='Edit Product'
          data-for='action-info-tooltip'
          className='ActionCont'
        >
          <Link
            to={`${
              search
                ? `/dashboard/products/edit/${product._id}?search=${search}`
                : `/dashboard/products/edit/${product._id}`
            }`}
            className='actionOption'
          >
            <img className='gearImg' src={pen} alt='' />
          </Link>
        </div>
        <div
          data-tip='See Product'
          data-for='action-info-tooltip'
          className='ActionCont'
        >
          <Link to={`/products/${product._id}`} className='actionOption'>
            <img className='gearImg' src={eye} alt='' />
          </Link>
        </div>
        <div
          data-tip='Delete Product'
          data-for='action-info-tooltip'
          className='ActionCont'
        >
          <div
            onClick={() => {
              if (!deleteLoading) {
                setClicked(true)
                setClickedForDelete(product)
                dispatch({ type: 'CONFIRM_DELETE_PRODUCT_REQUEST' })
              }
            }}
            id={`${deleteLoading ? 'deleting' : ''}`}
            className='actionOption trash'
          >
            {!deleteLoading ? (
              <img className='gearImg' src={trash} alt='' />
            ) : clicked ? (
              <Loader />
            ) : (
              <img className='gearImg' src={trash} alt='' />
            )}
          </div>
        </div>
      </div>
    </StyledUser>
  )
}

const StyledUser = styled(motion.div)`
  #deleting {
    cursor: not-allowed !important;
  }
  #loaderImg {
    border-radius: 10px;
  }
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
