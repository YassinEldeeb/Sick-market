import React, { useState, useEffect } from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import Goback from '../components/Goback'
import Rating from '../components/Rating'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { productDetailAction } from '../actions/products'
import Message from '../components/message'
import Loader from '../components/loader'
import { cartAction, removeAction } from '../actions/cart'
import QtySelector from '../components/QtySelector'
import { buyNowAction } from '../actions/buyNow'
import { useLastLocation } from 'react-router-last-location'
import SmoothImg from '../components/smoothImgLoading'
import Meta from '../components/Meta'
import { ReactComponent as Free } from '../img/free.svg'
import { ReactComponent as Discount } from '../img/discount.svg'

const ProductDetail = ({ cartCount, setCartCount }) => {
  const lastLocation = useLastLocation()

  const location = useLocation()
  const isBuyNow = location.search.split('=')[1] === 'buyNow'
  const id = location.pathname.split('/')[2]

  const savedCart = localStorage.getItem('sickCartProducts')
    ? JSON.parse(localStorage.getItem('sickCartProducts'))
    : []
  let matched = savedCart
    ? savedCart.find((each) => each._id === id)
    : undefined

  const [qty, setQty] = useState(matched ? matched.qty : 1)
  const history = useHistory()

  const dispatch = useDispatch()
  const { product, error, loading } = useSelector((state) => state.product)
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {
    if (
      lastLocation
        ? lastLocation.pathname.split('/')[1] !== 'product-description'
        : true
    ) {
      dispatch(productDetailAction(id))
    }
  }, [dispatch, id])

  const buyNowHandler = () => {
    if (!isBuyNow) {
      dispatch(buyNowAction(qty))
      history.push('/shipping?order=buyNow')
    }
  }
  const addToCart = () => {
    const match = cartItems ? cartItems.find((each) => each._id === id) : false

    if (!match) {
      dispatch(cartAction(id, qty))
      setCartCount(Number(cartCount) + Number(qty))
    } else if (match) {
      dispatch(removeAction(match))
      setCartCount(Number(cartCount) - Number(qty))
    }
  }

  return (
    <StyledDetail>
      <Goback />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message
          type='error'
          msg={
            error.includes('timed out')
              ? 'Network Error'
              : error.includes('mongo')
              ? 'Server Error'
              : error
          }
        />
      ) : product ? (
        <>
          <div className='details'>
            <div className='productImg'>
              <SmoothImg
                key={product._id}
                providedClassName='smoothImgDetails'
                width={'640px'}
                height={'510px'}
                src={'https://sickmarket.ml' + product.image}
                alt='product'
                tiny={`https://sickmarket.ml/api/products/${product._id}/tiny`}
              />
              {product.oldPrice && (
                <div className='discount'>
                  <Discount />
                  <h6>
                    {(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                      100
                    ).toFixed(0)}
                    % off
                  </h6>
                </div>
              )}
              <div className='bottomInfo'>
                <div className='priceList-mobile'>
                  <h3>
                    {product.price}
                    <span className='currency'>EGP</span>
                  </h3>
                  {product.oldPrice && (
                    <h3 className='oldPrice'>
                      {product.oldPrice}
                      <span className='currency'>EGP</span>
                    </h3>
                  )}
                </div>
                <div className='selectMobile'>
                  <h1>
                    {product.countInStock !== 0 ? 'In Stock' : 'Out Of Stock'}
                  </h1>
                  {product.countInStock !== 0 && (
                    <QtySelector
                      cartCount={cartCount}
                      setCartCount={setCartCount}
                      qty={qty}
                      setQty={setQty}
                      product={product}
                      cartItems={cartItems}
                    />
                  )}
                </div>
              </div>
              {product.countInStock !== 0 && (
                <>
                  <div
                    className='add mobile-btn'
                    onClick={addToCart}
                    style={{
                      background: `${matched ? '#474f57 ' : '#0084a0'}`,
                    }}
                  >
                    <h1>{matched ? 'Remove' : 'Add to Cart'}</h1>
                  </div>
                  <div className='buy mobile-btn' onClick={buyNowHandler}>
                    <h1>{isBuyNow ? 'Buying Process' : 'Buy Now'}</h1>
                  </div>
                  {product.countInStock <= 6 && (
                    <span class='onlyStock mobile'>
                      Only {product.countInStock} left in stock!
                    </span>
                  )}
                </>
              )}
            </div>
            <div className='description'>
              <div className='mobile'>
                <p className='brand'>Brand: {product.brand}</p>
                <Rating
                  ratingValue={product.rating}
                  numOfReviews={product.numReviews}
                />
              </div>
              <h4>{product.name}</h4>
              <div className='mobile2'>
                <p className='category'>Category: {product.category}</p>
                <Link
                  to={`/product-description/${location.pathname.split('/')[2]}`}
                >
                  description
                </Link>
              </div>
              <Rating
                ratingValue={product.rating}
                numOfReviews={product.numReviews}
              />
              {product.freeShipping && (
                <div className='freeShipping'>
                  <Free />

                  <p>Free Shipping</p>
                </div>
              )}
              <h3>{product.description}</h3>
            </div>
            <div
              className={`table ${
                product.countInStock <= 3 ? 'removingSomePadding' : ''
              }`}
            >
              <div className='price'>
                <h1>Price:</h1>
                <div className='priceList'>
                  {product.oldPrice && (
                    <h3 className='oldPrice'>
                      {product.oldPrice}
                      <span className='currency'>EGP</span>
                    </h3>
                  )}

                  <h3>
                    {product.price}
                    <span className='currency'>EGP</span>
                  </h3>
                </div>
              </div>
              <div className='status'>
                <h1>Status:</h1>
                <h3>
                  {product.countInStock === 0 ? 'Out Of Stock' : 'In Stock'}
                </h3>
              </div>
              {product.countInStock !== 0 && (
                <>
                  <div className='quantity'>
                    <h1>Qty:</h1>
                    <QtySelector
                      cartCount={cartCount}
                      setCartCount={setCartCount}
                      qty={qty}
                      setQty={setQty}
                      product={product}
                      cartItems={cartItems}
                    />
                  </div>
                  {product.countInStock <= 6 && (
                    <li class='onlyStock'>
                      Only {product.countInStock} left in stock!
                    </li>
                  )}
                  <div
                    className='add'
                    onClick={addToCart}
                    style={{
                      background: `${matched ? '#474f57 ' : '#0084a0'}`,
                    }}
                  >
                    <h1>{matched ? 'Remove' : 'Add to Cart'}</h1>
                  </div>
                  <div className='buy' onClick={buyNowHandler}>
                    <h1>{isBuyNow ? 'Buying Process' : 'Buy Now'}</h1>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        ''
      )}
      {product && (
        <Meta
          ogImage={'https://sickmarket.ml' + product.image}
          ogTitle={product.name}
          ogDescription={product.description}
          title={product.name}
          description={product.description}
          url={`https://sickmarket.ml/products/${product._id}`}
          product={true}
        />
      )}
    </StyledDetail>
  )
}

const StyledDetail = styled.div`
  .freeShipping {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: #00b2d8 !important;
      font-size: calc(0.55rem + 0.5vw) !important;
      font-weight: 500;
    }
    svg {
      margin-right: 0.2rem;
      width: 17px;
      height: 17px;
    }
  }
  .priceList {
    display: flex;
    align-items: center;
    justify-content: center;
    .oldPrice {
      padding-left: 0.6rem;
      font-size: calc(0.2rem + 1vw);
      margin-right: 0.4rem;
      text-decoration: line-through;
      filter: grayscale(0.7);
      font-size: calc(0.15rem + 1vw) !important;
      .currency {
        font-size: calc(0.02rem + 1vw);
      }
    }
  }
  .discount {
    position: absolute;
    right: 0;
    top: 0;
    background: #00b2d8;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    padding: 0.4rem 0.65rem;
    border-radius: 7px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 0px;

    svg {
      margin-right: 0.25rem;
      width: 18px !important;
      height: 18px !important;
    }
    h6 {
      font-weight: 500;
      font-size: calc(0.6rem + 0.5vw) !important;
      color: white !important;
    }
  }
  .lazyImgLoader,
  .lazyImgLoaderDiv {
    width: 640px !important;
    height: auto !important;
    min-width: 100% !important;
    min-height: 100% !important;
  }
  .removingSomePadding .quantity {
    margin-bottom: calc(0.65rem + 0.15vw) !important;
  }
  .mobile {
    display: none;
  }
  .table {
    position: relative;
  }
  .onlyStock {
    list-style: none;
    padding-bottom: calc(0.5rem + 0.15vw);
    color: #ec5840;
    font-weight: 500;
    font-size: calc(0.7rem + 0.3vw);
    list-style-position: inside;
  }
  .currency {
    font-size: calc(0.2rem + 1vw);
    margin-left: 0.15rem;
  }
  .mobile .starsRating,
  .bottomInfo,
  .mobile2 a {
    display: none;
  }
  .bottomInfo {
    width: 100%;
    display: none;
    justify-content: space-between;
    align-items: center;
    margin: calc(0.5rem + 0.3vh) 0;
    h3 {
      font-size: calc(1.25rem + 1vw);
    }
    .selectMobile {
      display: flex;
      align-items: center;
      h1 {
        font-size: calc(0.9rem + 1vw);
        margin-right: 0.5rem;
      }
      .select svg {
        height: 12px;
      }
    }
  }
  width: 90%;
  margin: 0 auto;
  .details {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: calc(1rem + 0.5vw);
    .category {
      font-size: calc(0.3rem + 1vw) !important;
    }
    .productImg {
      width: 42%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
      max-width: 640px;
      position: relative;
      img {
        border-radius: 10px;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .description,
    .productImg {
      flex: 1 1 12rem;
    }

    .description,
    .table {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }
    .description {
      .brand {
        color: #00667b;
      }
      h4 {
        font-weight: 500;
        font-size: calc(1.1rem + 1vw);
        color: #1a1a1a;
      }
      p {
        color: #343a40;
        margin: calc(0.1rem + 0.3vw) 0;
        font-size: calc(0.4rem + 1vw);
      }
      p:first-child {
        margin: unset;
      }
      h3 {
        font-weight: 400;
        color: #373737;
        font-size: calc(0.35rem + 1vw);
      }
      .starsRating {
        margin-top: calc(0.3rem + 0.2vw);
        i {
          font-size: calc(1.3rem + 0.3vw);
        }
      }
    }
  }
  .mobile-btn,
  .mobile-btn {
    display: none !important;
  }
  .table {
    padding: calc(1rem + 0.3vw);
    box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    align-items: stretch !important;
    min-width: 23%;
    h1,
    h3 {
      font-weight: 400;
      color: #1a1a1a;
    }
    .price,
    .quantity,
    .status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: calc(0.7rem + 0.3vw);

      h1 {
        font-size: calc(0.6rem + 1vw);
      }
      h3 {
        font-size: calc(0.45rem + 1vw);
      }
    }

    .status h1 {
      padding-right: calc(1.5rem + 1vw);
    }

    .add,
    .buy {
      display: grid;
      place-items: center;
      padding: 0.8rem 2.8rem;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.2s ease;

      &:hover {
        background: #007e9b;
      }
      h1 {
        color: white;
        font-weight: 400;
        font-size: calc(0.9rem + 0.3vw);
      }
    }
    .buy {
      margin-top: 0.5rem;
      background: #00b2d8;
      &:hover {
        background: #00add4;
      }
    }
    div:last-child {
      margin-bottom: 0 !important;
    }
  }

  @media screen and (min-width: 2000px) {
    .table {
      min-width: 18.6%;
    }
  }
  @media screen and (max-width: 1050px) {
    .priceList-mobile {
      display: flex;
      align-items: center;
      justify-content: center;
      .oldPrice {
        position: relative;
        transform: translate(0, 10%);
        margin-left: 0.4rem;
        text-decoration: line-through;
        filter: grayscale(0.7);
        font-size: calc(0.7rem + 1vw) !important;
        .currency {
          font-size: calc(0.45rem + 1vw) !important;
        }
      }
    }
    .discount {
      padding: 0.4rem 0.65rem;

      svg {
        width: 15px !important;
        height: 15px !important;
      }
      h6 {
        font-size: calc(0.7rem + 0.5vw) !important;
      }
    }
    .smoothImgDetails {
      min-height: calc(90vw * 0.796875);
    }
    .mobile {
      display: block;
    }
    .onlyStock {
      list-style: none;
      padding-top: calc(0.5rem + 0.15vw);
      color: #ec5840;
      font-weight: 500;
      font-size: calc(0.85rem + 0.3vw);
    }
    .currency {
      font-size: calc(0.7rem + 1vw);
      margin-left: 0.15rem;
    }
    .mobile-btn,
    .mobile-btn {
      display: grid !important;
    }
    .select {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.32rem 1.4rem;
      background: #f4f4f4;
      position: relative;
      border-radius: 5px;

      cursor: pointer;
      .drop-menu {
        padding-top: 0.2rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(52, 58, 64, 0.2);
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(-20%, -100%);
        display: none;
        background: #ffff;
        width: 120%;
        max-height: 140px;
        overflow-y: scroll;
        border-radius: 5px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        &.active {
          display: block;
        }
        p {
          font-size: calc(0.9rem + 0.3vw);
          padding: 0.35rem 0;
          padding-left: 1rem;
          margin-bottom: 0.2rem;
          border-bottom: 0.2px solid rgba(0, 0, 0, 0.15);
          &:last-child {
            margin-bottom: 0;
            margin-bottom: 0.2rem;
            border-bottom: unset;
          }
          &:hover {
            background: #f5f5f5;
          }
        }
      }
      img {
        transform: rotate(270deg);
        width: 6px !important;
        height: unset !important;
      }
      h1 {
        margin-right: 0.7rem;
        font-size: calc(1rem + 0.3vw) !important;
      }
    }
    h1,
    h3 {
      font-weight: 400;
      color: #1a1a1a;
    }
    .price,
    .quantity,
    .status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: calc(0.7rem + 0.3vw);

      h1 {
        font-size: calc(0.6rem + 1vw);
      }
      h3 {
        font-size: calc(0.45rem + 1vw);
      }
    }

    .add,
    .buy {
      display: grid;
      place-items: center;
      padding: 0.8rem 2.8rem;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.2s ease;
      &:hover {
        background: #007e9b;
      }
      h1 {
        color: white;
        font-weight: 400;
        font-size: calc(1rem + 0.3vw);
      }
    }
    .buy {
      margin-top: 0.5rem;
      background: #00b2d8;
      &:hover {
        background: #00add4;
      }
    }
    /* / */
    .bottomInfo {
      display: flex;
      h3 {
        display: block !important;
      }
    }
    .starsRating {
      display: none !important;
    }
    .mobile2 {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        display: block;
        color: #1a1a1a;
        text-decoration: underline;
        text-underline-offset: 1px;
      }
    }
    .mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .brand {
        font-size: calc(0.85rem + 0.3vw) !important;
      }
      .starsRating {
        display: flex !important;
        margin: 0 !important;
        i {
          font-size: calc(1rem + 0.3vw) !important;
        }
      }
    }
    .description {
      h4 {
        font-size: calc(1.2rem + 1vw) !important;
      }
    }
    .details {
      margin: 0.7rem 0 !important;
      flex-wrap: wrap;
      gap: calc(0.7rem + 0.5vw);
      .category {
        font-size: calc(0.85rem + 0.3vw) !important;
        margin: 0 !important;
        margin-top: calc(0.1rem + 0.3vw) !important;
      }
      h3 {
        display: none;
      }
      .productImg {
        order: 2;
        min-width: unset;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        max-width: unset;
      }
      .productImg,
      .description {
        flex: 1 1 500rem !important;
      }
      .table {
        display: none;
      }
    }
  }
  .details {
    margin: 0.7rem 0 !important;
  }
`

export default ProductDetail
