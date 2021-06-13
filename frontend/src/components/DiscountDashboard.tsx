import React, { FC } from 'react'
import styled from 'styled-components'
import { parseISO, format } from 'date-fns'
import { ReactComponent as Trash } from '../img/trash.svg'

import { motion } from 'framer-motion'
import { popup } from '../animations'
import Loader from './loader'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as Coupon } from '../img/coupon.svg'
import { ReactComponent as Voucher } from '../img/voucher.svg'

interface Props {
  discount: any
  setClickedForDelete: any
}

const ProductDashboard: FC<Props> = ({ discount, setClickedForDelete }) => {
  const { loading: deleteLoading, discount: code } = useSelector(
    (state: any) => state.deleteDiscount
  )
  const dispatch = useDispatch()

  return (
    <StyledUser variants={popup}>
      <div className='id'>
        <p data-for='discount-card-tooltip' data-tip={'#' + discount._id}>
          #{discount._id.substr(discount._id.length - 4)}
        </p>
      </div>
      <div className='code'>
        {discount.isPercent ? <Coupon /> : <Voucher />}
        <p data-for='discount-card-tooltip' data-tip={discount.code}>
          {discount.code}
        </p>
      </div>
      <div className='Amount'>
        <p
          data-for='discount-card-tooltip'
          data-tip={`${discount.amount}${discount.isPercent ? '%' : ''}`}
        >
          {discount.amount}
          {discount.isPercent ? '%' : ''}
        </p>
      </div>
      <div className='Limited'>
        <p
          data-for='discount-card-tooltip'
          data-tip={
            discount.limited + discount.limited ? discount.limited : 'N/A'
          }
        >
          {discount.limited ? discount.limited : 'N/A'}
        </p>
      </div>
      <div className='Used'>
        <p data-for='discount-card-tooltip' data-tip={discount.numOfUsedTimes}>
          {discount.numOfUsedTimes}
        </p>
      </div>
      <div className='Created'>
        <div className='stockCont'>
          <p
            data-for='discount-card-tooltip'
            data-tip={format(parseISO(discount.createdAt), 'yyyy-MM-dd')}
          >
            {format(parseISO(discount.createdAt), 'yyyy-MM-dd')}
          </p>
        </div>
      </div>
      <div className='Action'>
        <div className='ActionCont'>
          <div
            onClick={() => {
              if (!deleteLoading) {
                setClickedForDelete(discount.code)
                dispatch({ type: 'CONFIRM_DELETE_DISCOUNT_REQUEST' })
              }
            }}
            id={`${deleteLoading ? 'deleting' : ''}`}
            className='actionOption trash'
          >
            {!deleteLoading ? (
              <Trash className='gearImg' />
            ) : discount.code === code ? (
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

const StyledUser = styled(motion.div)`
  .couponIcon {
    width: 35px;
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
  .code {
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
  .code,
  .Amount,
  .Limited,
  .Used,
  .Created {
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
  .code,
  .Amount,
  .Limited,
  .Used,
  .Created {
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
  .code {
    min-width: 20%;

    padding-right: 2vw;
  }
  .Amount {
    min-width: 13%;
    padding-right: 2vw;
  }
  .Limited {
    min-width: 13%;
    padding-right: 2vw;
  }
  .Used {
    padding-right: 2vw;
    min-width: 13%;
  }
  .Created {
    padding-right: 2vw;
    min-width: 20%;
  }
  .Action {
    display: flex;
    justify-content: flex-start;
    min-width: 10%;
  }

  img {
    width: 52px;
    height: 41.5px;
    border-radius: 10px;
  }
`

export default ProductDashboard
