import React, { useState } from 'react'
import styled from 'styled-components'
import Rating from '../components/Rating'
import QtySelector from '../components/QtySelector'
import { removeAction } from '../actions/cart'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import SmoothImg from './smoothImgLoading'

const CartProduct = ({ product, cartCount, setCartCount }) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(product.qty)
  const { cartItems } = useSelector((state) => state.cart)

  function truncate(str) {
    return str.length > 30 ? str.substr(0, 30 - 1) + '...' : str
  }
  return (
    <StyledProduct>
      <Link
        className='imgLink'
        to={`/products/${product._id}?redirect=cart`}
        onClick={() => dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })}
      >
        <SmoothImg
          contWidth={'10vw'}
          width={'100%'}
          height={'100%'}
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
        <h1>
          {product.price}
          <span className='currency'>EGP</span>
        </h1>
        <div className='removeAndQty'>
          <QtySelector
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
  .imgLink,
  .descLink {
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
      padding: 0 calc(1rem + 0.3vw);
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
