import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SmoothImg from './smoothImgLoading'
import { ReactComponent as NotAllowed } from '../img/notAllowed.svg'
import { ReactComponent as Close } from '../img/close.svg'
import { removeAction } from '../actions/cart'

const PlaceOrderItem = ({
  img,
  productName,
  qty,
  price,
  id,
  isBuyNow,
  soldOut,
  removed,
  setCartCount,
  cartCount,
}) => {
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    if (removed || soldOut) {
      const productInCart = cart.cartItems.find((e) => e._id === id)
      if (productInCart) productInCart.removed2 = true
    }
  }, [removed, soldOut])

  const dispatch = useDispatch()

  return (
    <StyledItem>
      {(soldOut || removed) && (
        <div
          onClick={() => {
            dispatch(removeAction({ _id: id }))
            setCartCount(Number(cartCount) - Number(qty))
          }}
          className='removeIt'
        >
          <Close />
        </div>
      )}
      <div className='firstDiv'>
        <Link
          className='imgLink'
          onClick={() => dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })}
          to={`/products/${id}${isBuyNow ? '?order=buyNow' : ''}`}
        >
          {(soldOut || removed) && (
            <div className={`removed ${removed || soldOut ? '' : 'hide'}`}>
              <p>{removed ? 'Removed' : soldOut ? 'SoldOut' : ''}</p>
              <NotAllowed />
            </div>
          )}
          <SmoothImg
            key={id}
            preLoaderId='preLoader'
            loaderId='preloader2'
            src={'https://sickmarket.ml' + img}
            alt='product'
            tiny={`https://sickmarket.ml/api/products/${id}/tiny`}
          />
        </Link>
        <h1>
          <Link
            onClick={() => dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })}
            to={`/products/${id}${isBuyNow ? '?order=buyNow' : ''}`}
          >
            {productName}
          </Link>
        </h1>
      </div>
      <div className='secondDiv'>
        <p>
          {qty} x {price}
          <span className='currency1'>EGP</span> = {(qty * price).toFixed(2)}
          <span className='currency2'>EGP</span>
        </p>
      </div>
    </StyledItem>
  )
}

const StyledItem = styled.div`
  .currency1,
  .currency2 {
    margin-left: 0.15rem;
    font-size: calc(0.6rem + 0.3vw) !important;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 12.5%);
  width: 95%;
  position: relative;
  .removeIt {
    display: flex;
    position: absolute;
    right: 0%;
    top: 3%;
    opacity: 0.7;
    transition: 0.2s ease;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
  &:last-child {
    border-bottom: unset;
  }
  .imgLink {
    min-width: 5vw;
    height: calc(5vw * 0.796875);
    position: relative;
  }

  .firstDiv a {
    display: flex;
  }
  .firstDiv {
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 5vw;
      max-width: 100%;
      object-fit: cover;
      border-radius: 5px;
      border: 0.5px solid rgba(0, 0, 0, 0.1);
    }
    h1 {
      font-weight: 400 !important;
      font-size: calc(0.9rem + 0.3vw) !important;
      margin-left: 0.8rem !important;
      padding-bottom: 0 !important;
      padding-top: 0 !important;
      a {
        color: #1a1a1a;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .secondDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: calc(1.5rem + 1vw);
    width: min-content;
    p {
      color: #343a40;
      font-size: calc(0.75rem + 0.3vw) !important;
      font-weight: 400 !important;
      padding-bottom: 0 !important;
      width: max-content;
    }
  }
  .removed {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 63, 63, 0.5);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    flex-direction: column;
    transition: 0.3s ease;
    &.hide {
      opacity: 0;
      pointer-events: none;
    }
    p {
      color: white !important;
      font-size: 0.72rem !important;
      padding-bottom: 0rem !important;
      font-weight: 500 !important;
    }
    svg {
      width: 17px !important;
      height: 17px !important;
    }
  }
  @media screen and (max-width: 1050px) {
    .imgLink {
      min-width: calc(3vw + 3rem) !important;
      height: calc((3vw + 3rem) * 0.796875) !important;
    }
    width: 100%;
    .firstDiv {
      flex: 1 1 67%;
      img {
        width: calc(3vw + 3rem) !important;
        max-width: 100%;
      }
      h1 {
        font-size: calc(0.53rem + 1vw) !important;
      }
    }
    .secondDiv {
      flex: 1 1 auto;
      margin-left: calc(0.75rem + 1vw);
      p {
        white-space: normal;
        width: unset;
        font-size: calc(0.4rem + 1vw) !important;
      }
    }
    .currency1,
    .currency2 {
      margin-left: 0.15rem;
      font-size: calc(0.4rem + 0.3vw) !important;
    }

    .removed {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 63, 63, 0.5);
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      flex-direction: column;
      transition: 0.3s ease;
      &.hide {
        opacity: 0;
        pointer-events: none;
      }
      p {
        color: white !important;
        font-size: 0.6rem !important;
        padding-bottom: 0rem !important;
        font-weight: 500 !important;
      }
      svg {
        width: 12px !important;
        height: 12px !important;
      }
    }
  }
`

export default PlaceOrderItem
