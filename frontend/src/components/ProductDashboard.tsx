import React, { useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import { parseISO, format } from 'date-fns'
import { ReactComponent as Pen } from '../img/pen.svg'
import { ReactComponent as Trash } from '../img/trash.svg'
import { ReactComponent as Eye } from '../img/eyeSee.svg'

import { motion, AnimatePresence } from 'framer-motion'
import { popup, realtimeStockCounter } from '../animations'
import { Link, useLocation } from 'react-router-dom'
import Loader from './loader'
import { useSelector, useDispatch } from 'react-redux'
import { useLastLocation } from 'react-router-last-location'
import SmoothImg from './smoothImgLoading'
import qs from 'qs'

interface Props {
  product: any
  setClickedForDelete?: any
  search?: any
  data: any
  setDashboardScrollPosition: any
}

const ProductDashboard: FC<Props> = ({
  product,
  setClickedForDelete,
  search,
  data,
  setDashboardScrollPosition,
}) => {
  const location = useLocation()
  const searches = qs.parse(location.search, { ignoreQueryPrefix: true })

  const { loading: deleteLoading, product: productId } = useSelector(
    (state: any) => state.deleteProduct
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
  const [changed, setChanged] = useState(0)

  useEffect(() => {
    if (data) {
      const newStock = data.find((e: any) => {
        return e._id === product._id
      })

      if (newStock) setChanged(changed + newStock.countInStock)
    }
  }, [data])

  const editURL = (id: any) => {
    let baseURL = `/dashboard/products/edit/${id}?`
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

    return baseURL
  }
  return (
    <StyledUser variants={animCondition()}>
      <div className='id'>
        <p data-for='product-card-tooltip' data-tip={'#' + product._id}>
          #{product._id.substr(product._id.length - 4)}
        </p>
      </div>
      <div className='name'>
        <SmoothImg
          key={product._id}
          providedClassName='imgCont'
          width={'52px'}
          height={'41.5px'}
          loaderId='loaderImg'
          contWidth={`max-content`}
          src={`/api/products/${product._id}/image?w=80&h=64`}
          alt=''
          tiny={`/api/products/${product._id}/tiny`}
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
        <div className='stockCont'>
          <p data-for='product-card-tooltip' data-tip={product.countInStock}>
            {product.countInStock}
          </p>
          <AnimatePresence>
            {changed && (
              <motion.span
                key={changed}
                variants={realtimeStockCounter}
                animate='show'
                initial='hidden'
                exit='exit'
                className='change'
              >
                -{changed}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
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
                : editURL(product._id)
            }`}
            className='actionOption'
          >
            <Pen className='gearImg' />
          </Link>
        </div>
        <div
          data-tip='See Product'
          data-for='action-info-tooltip'
          className='ActionCont'
        >
          <Link
            onClick={() => {
              const view = document.querySelector('.view')
              if (setDashboardScrollPosition && view) {
                setDashboardScrollPosition(view.scrollTop)
              }
            }}
            to={`/products/${product._id}`}
            className='actionOption'
          >
            <Eye className='gearImg' />
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
              <Trash className='gearImg' />
            ) : product._id === productId ? (
              <Loader />
            ) : (
              <Trash className='gearImg' />
            )}
          </div>
        </div>
      </div>
    </StyledUser>
  )
}

const StyledUser = styled<any>(motion.div)`
  #loaderImg {
    filter: blur(2px);
  }
  &.hide {
    opacity: 0;
  }
  .imgCont {
    min-width: 52px !important;
  }
  .stockCont {
    position: relative;
  }
  .change {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(100%, -30%);
    font-size: calc(0.65rem + 0.3vw);
    color: #25da8e;
    font-weight: 500;
  }
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
