import React, { useState, useEffect } from "react"
import { useLocation, Link, useHistory } from "react-router-dom"
import Goback from "../components/Goback"
import Rating from "../components/Rating"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { productDetailAction } from "../actions/products"
import Message from "../components/message"
import Loader from "../components/loader"
import { cartAction, removeAction } from "../actions/cart"
import QtySelector from "../components/QtySelector"
import { buyNowAction } from "../actions/buyNow"
import { useLastLocation } from "react-router-last-location"
import SmoothImg from "../components/smoothImgLoading"

const ProductDetail = ({ cartCount, setCartCount }) => {
  const lastLocation = useLastLocation()

  const location = useLocation()
  const isBuyNow = location.search.split("=")[1] === "buyNow"
  const id = location.pathname.split("/")[2]

  const savedCart = localStorage.getItem("sickCartProducts")
    ? JSON.parse(localStorage.getItem("sickCartProducts"))
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
        ? lastLocation.pathname.split("/")[1] !== "product-description"
        : true
    ) {
      dispatch(productDetailAction(id))
    }
  }, [dispatch, id])

  const buyNowHandler = () => {
    if (!isBuyNow) {
      dispatch(buyNowAction(qty))
      history.push("/shipping?order=buyNow")
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
            error.includes("timed out")
              ? "Network Error"
              : error.includes("mongo")
              ? "Server Error"
              : error
          }
        />
      ) : (
        <div className='details'>
          <div className='productImg'>
            <SmoothImg
              width={"640px"}
              height={"510px"}
              src={product.image}
              alt='product'
            />
            <div className='bottomInfo'>
              <h3>
                {product.price}
                <span className='currency'>EGP</span>
              </h3>

              <div className='selectMobile'>
                <h1>
                  {product.countInStock !== 0 ? "In Stock" : "Out Of Stock"}
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
                    background: `${matched ? "#474f57 " : "#0084a0"}`,
                  }}
                >
                  <h1>{matched ? "Remove" : "Add to Cart"}</h1>
                </div>
                <div className='buy mobile-btn' onClick={buyNowHandler}>
                  <h1>{isBuyNow ? "Buying Process" : "Buy Now"}</h1>
                </div>
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
                to={`/product-description/${location.pathname.split("/")[2]}`}
              >
                description
              </Link>
            </div>
            <Rating
              ratingValue={product.rating}
              numOfReviews={product.numReviews}
            />
            <h3>{product.description}</h3>
          </div>
          <div className='table'>
            <div className='price'>
              <h1>Price:</h1>
              <h3>
                {product.price}
                <span className='currency'>EGP</span>
              </h3>
            </div>
            <div className='status'>
              <h1>Status:</h1>
              <h3>
                {product.countInStock === 0 ? "Out Of Stock" : "In Stock"}
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

                <div
                  className='add'
                  onClick={addToCart}
                  style={{
                    background: `${matched ? "#474f57 " : "#0084a0"}`,
                  }}
                >
                  <h1>{matched ? "Remove" : "Add to Cart"}</h1>
                </div>
                <div className='buy' onClick={buyNowHandler}>
                  <h1>{isBuyNow ? "Buying Process" : "Buy Now"}</h1>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </StyledDetail>
  )
}
const StyledDetail = styled.div`
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
      .select img {
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

    .price h1 {
      padding-right: calc(5.5rem + 1vw);
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
  @media screen and (max-width: 1050px) {
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

    .price h1 {
      padding-right: calc(5.5rem + 1vw);
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
      display: none;
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
        display: block;
        margin: 0 !important;
        margin-right: 0.9rem !important;
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
