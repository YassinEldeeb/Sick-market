import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Rating from '../components/Rating'
import QtySelector from '../components/QtySelector'
import { removeAction } from '../actions/cart'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import SmoothImg from './smoothImgLoading'
import notAllowed from '../img/notAllowed.svg'

const CartProduct = ({ product, cartCount, setCartCount, check }) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(product.qty)
  const { cartItems } = useSelector((state) => state.cart)

  function truncate(str) {
    return str.length > 30 ? str.substr(0, 30 - 1) + '...' : str
  }
  const [soldOut, setSoldOut] = useState(null)
  const [removed, setRemoved] = useState(null)

  useEffect(() => {
    if (check) {
      setRemoved(check.removed.find((e) => e === product._id))
      setSoldOut(check.soldOut.find((e) => e === product._id))
    }
  }, [check])

  return (
    <StyledProduct>
      {removed && <div className='wrapper'> </div>}
      {soldOut && <div className='wrapper2'> </div>}
      <Link
        className='imgLink'
        to={`/products/${product._id}?redirect=cart`}
        onClick={() => dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })}
      >
        <SmoothImg
          tiny={`/api/products/${product._id}/tiny`}
          contWidth={'10vw'}
          contWidthMobile={'20vw'}
          width={'100%'}
          height={'120%'}
          className='productImg'
          src={product.image}
          alt='product'
          imgId='productImg'
          loaderId='productImgLoader'
        />
      </Link>
      <div className='desc'>
        <p>Brand: {product.brand}</p>
        <Link
          className='descLink'
          to={`/products/${product._id}?redirect=cart`}
          onClick={() => dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })}
        >
          {truncate(product.name)}
        </Link>
        <Rating
          ratingValue={product.rating}
          numOfReviews={product.numReviews}
        />
      </div>
      <div className='priceQtyAndRemove'>
        {!removed && !soldOut ? (
          <h1>
            {product.price}
            <span className='currency'>EGP</span>
          </h1>
        ) : (
          <div className='removed'>
            <img src={notAllowed} />
            <h1>{removed ? 'Not Available' : soldOut ? 'Sold Out' : ''}</h1>
          </div>
        )}
        <div className='removeAndQty'>
          <QtySelector
            className={removed || soldOut ? 'qtySelect' : null}
            qty={qty}
            setQty={setQty}
            product={product}
            cartItems={cartItems}
            cartCount={cartCount}
            setCartCount={setCartCount}
          />
          <div
            className='removeBtn'
            onClick={() => {
              dispatch(removeAction(product))
              setCartCount(Number(cartCount) - Number(qty))
            }}
          >
            <i className='fas fa-trash'></i>
          </div>
        </div>
      </div>
    </StyledProduct>
  )
}
const StyledProduct = styled.div`
  .wrapper,
  .wrapper2 {
    z-index: 2;
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .wrapper2 {
    pointer-events: none;
  }

  position: relative;

  .qtySelect {
    pointer-events: none;
    opacity: 0;
  }
  .imgLink {
    height: calc(10vw * 0.796875) !important;
  }
  .removed {
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      pointer-events: none;
      font-size: calc(0.7rem + 0.3vw) !important;
      color: white !important;
      font-weight: 500 !important;
      user-select: none;
    }

    padding: 0.55rem 0.75rem;
    background: #ff6969;
    border-radius: 5px;
    img {
      width: 18px;
      height: 18px;
      margin-right: 0.25rem;
      pointer-events: none;
      user-select: none;
    }
  }
  .ratingCount {
    display: none !important;
  }
  .imgLink,
  .descLink {
    width: max-content;
    display: flex;
  }
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 12.5%);
  &:last-child {
    border-bottom: unset;
  }
  #productImg,
  #productImgLoader {
    border-radius: 5px;
    max-width: 10vw;
    object-fit: cover;
  }
  display: flex;
  #productImg,
  #productImgLoader,
  .desc {
    flex-grow: 1;
  }
  .desc {
    padding: 0 calc(1rem + 0.3vw);
    p {
      color: #00667b;
      font-size: calc(0.7rem + 0.4vw);
    }
    a {
      display: block;
      font-size: calc(1rem + 0.4vw);
      font-weight: 400;
      color: #1a1a1a;
      &:hover {
        text-decoration: underline;
      }
    }
    .starsRating {
      margin-top: 0.35rem;
    }
  }
  .priceQtyAndRemove {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    h1 {
      font-size: calc(1rem + 0.4vw);
      font-weight: 400;
      color: #1a1a1a;
      .currency {
        margin-left: 0.15rem;
        font-size: calc(0.7rem + 0.4vw);
      }
    }
    .removeAndQty .select .drop-menu {
      top: 0;
      bottom: unset;
      max-height: 130px;
      transform: translate(-17%, -100%);
    }
  }

  @media screen and (max-width: 1050px) {
    .imgLink {
      height: calc(20vw * 0.796875) !important;
    }
    .removed {
      padding: 0.25rem 0.3rem;
      border-radius: 4px;
      h1 {
        font-size: calc(0.4rem + 0.3vw) !important;
      }
      img {
        width: 8px;
        height: 8px;
        margin-right: 0.15rem;
      }
    }
    .starsRating {
      margin: 0 !important;
      margin-top: 0.2rem !important;
      .far,
      .fas {
        font-size: calc(0.7rem + 0.3vw) !important;
      }
    }
    #productImg,
    #productImgLoader {
      max-width: 13vw;
    }
    .priceQtyAndRemove {
      justify-content: space-between !important;
      h1 {
        font-size: calc(0.8rem + 0.4vw);
      }
      .currency {
        margin-left: 0.15rem;
        font-size: calc(0.6rem + 0.4vw) !important;
      }
      .removeAndQty {
        .removeBtn {
          padding: 0 0.62rem;
          i {
            font-size: calc(0.8rem + 0.3vw);
          }
        }
      }
    }
    .desc {
      padding-right: 0;
      padding-left: calc(0.7rem + 0.2vw);
      p {
        font-size: calc(0.6rem + 0.4vw);
      }
      a {
        font-size: calc(0.55rem + 1vw);
      }
      .starsRating {
        display: none;
      }
    }
    .select {
      padding: 0.3rem 0.9rem;
      h1 {
        font-size: calc(0.8rem + 0.3vw) !important;
        margin-right: 0.45rem;
      }
      img {
        width: 5px !important;
      }
      .drop-menu {
        max-height: 110px !important;
        width: 150% !important;
        transform: translate(-34%, -100%) !important;
        p {
          font-size: calc(0.8rem + 0.3vw) !important;
        }
      }
    }
    .removeBtn {
      margin-left: 0.7rem;
    }
  }
  .priceQtyAndRemove {
    z-index: 2 !important;
  }
  @media screen and (max-width: 550px) {
    #productImg,
    #productImgLoader {
      max-width: 20vw;
    }
  }
  @media screen and (max-width: 339px) {
    .desc {
      p {
        font-size: calc(0.45rem + 0.4vw);
      }
      a {
        font-size: calc(0.45rem + 1vw);
      }
    }
    .priceQtyAndRemove {
      h1 {
        font-size: calc(0.65rem + 0.4vw);
      }
    }
  }
`

export default CartProduct
