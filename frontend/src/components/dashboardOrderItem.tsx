import React, { useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import SmoothImg from './smoothImgLoading'
import { hide } from '../animations'

interface Props {
  product: any
}

const OrderItemDashboard: FC<Props> = ({ product }) => {
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  return (
    <StyledUser>
      <ReactTooltip
        id='product-card-tooltip'
        effect='solid'
        delayHide={100}
        delayShow={400}
      />
      <div className='id'>
        <p data-for='product-card-tooltip' data-tip={'#' + product.product}>
          #{product.product.substr(product.product.length - 4)}
        </p>
      </div>
      <div className='name'>
        <a target='_blank' href={`/dashboard/products/edit/${product.product}`}>
          <SmoothImg
            key={product.product}
            providedClassName='imgCont'
            width={'52px'}
            height={'41.5px'}
            loaderId='loaderImg'
            contWidth={`max-content`}
            src={`/api/products/${product.product}/image?w=80&h=64`}
            alt=''
            tiny={`/api/products/${product.product}/tiny`}
          />
        </a>
        <a
          data-for='product-card-tooltip'
          data-tip={'#' + product.name}
          className='link-product'
          target='_blank'
          href={`/dashboard/products/edit/${product.product}`}
        >
          {product.name}
        </a>
      </div>
      <div className='Price'>
        <p
          data-for='product-card-tooltip'
          data-tip={parseFloat(product.price.toFixed(1))}
        >
          {parseFloat(product.price.toFixed(1))}
        </p>
      </div>
      <div className='Qty'>
        <p data-for='product-card-tooltip' data-tip={product.qty}>
          {product.qty}
        </p>
      </div>
      <div className='Total'>
        <p
          data-for='product-card-tooltip'
          data-tip={parseFloat((product.qty * product.price).toFixed(1))}
        >
          {parseFloat((product.qty * product.price).toFixed(1))}
        </p>
      </div>
    </StyledUser>
  )
}

const StyledUser = styled(motion.div)`
  .link-product {
    font-size: calc(0.85rem + 0.3vw);
    margin-left: 0.7rem;
    color: white !important;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: max-content;
  }
  .link-product:hover {
    text-decoration: underline;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
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
  background: #43447a;
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
  .Qty,
  .Total {
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
    min-width: 40%;
    padding-right: 2vw;
  }
  .Price {
    min-width: 16%;
    padding-right: 2vw;
  }
  .Qty {
    padding-right: 2vw;
    min-width: 16%;
  }
  .Total {
    min-width: 16%;
  }
  img {
    width: 52px;
    height: 41.5px;
    border-radius: 10px;
  }
`

export default OrderItemDashboard
