import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import { useDispatch } from "react-redux"

const Product = ({ data, setScrolled }) => {
  const dispatch = useDispatch()
  function truncate(str) {
    return str.length > 35 ? str.substr(0, 35 - 1) + "..." : str
  }

  return (
    <StyledProduct>
      <Link
        to={`/products/${data._id}`}
        onClick={() => {
          setScrolled(document.documentElement.scrollTop)
          dispatch({ type: "PRODUCT_DETAIL_REQUEST" })
        }}
      >
        <img src={data.image} alt='product' />
      </Link>
      <div className='product_description'>
        <p>Brand: {data.brand}</p>
        <Link
          to={`/products/${data._id}`}
          onClick={() => {
            setScrolled(document.documentElement.scrollTop)
            dispatch({ type: "PRODUCT_DETAIL_REQUEST" })
          }}
        >
          <h1>{truncate(data.name)}</h1>
        </Link>
        <Rating ratingValue={data.rating} numOfReviews={data.numReviews} />
        <h4>
          {data.price}
          <span className='currency'>EGP</span>
        </h4>
      </div>
    </StyledProduct>
  )
}
const StyledProduct = styled.div`
  a {
    display: flex;
    flex-direction: column;
  }
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  overflow: hidden;
  background: #f8f8f8;
  box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.08);

  .product_description {
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    padding: calc(0.8rem + 0.3vw);
    padding-top: calc(0.45rem + 0.3vw);
    padding-bottom: calc(0.45rem + 0.3vw);
    p {
      width: 100%;
      color: #1a1a1a;
      font-size: calc(0.6rem + 0.5vw);
    }
    p:first-child {
      color: #00667b;
    }
    h1 {
      color: #1a1a1a;
      font-weight: 400;
      font-size: calc(0.85rem + 0.4vw);
      padding: calc(0.1rem + 0.1vw) 0;
      &:hover {
        text-decoration: underline;
        text-decoration-color: rgba(26, 26, 26, 0.75);
        text-underline-offset: 3px;
        text-decoration-thickness: 1px;
      }
    }
    h4 {
      color: #005568;
      font-weight: 400;
      font-size: calc(1rem + 0.4vw);
      position: relative;
      .currency {
        font-size: calc(0.55rem + 0.4vw);
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(105%, 10%);
      }
    }
  }
  a:first-child {
    margin: calc(0.5rem + 0.4vw);
    margin-bottom: 0px;
    img {
      display: block;
      object-fit: cover;
      width: 100%;
      border-radius: 7px;
    }
  }

  @media screen and (max-width: 570px) {
    a:first-child {
      margin: calc(0.8rem + 0.4vw);
      margin-bottom: 0;
    }
    .product_description {
      padding-top: calc(0.65rem + 0.3vw);
      padding-bottom: calc(0.65rem + 0.3vw);
      p {
        font-size: calc(0.85rem + 0.5vw);
      }
      h1 {
        font-size: calc(1rem + 0.4vw);
        width: 95%;
      }
      h4 {
        font-size: calc(1.1rem + 0.4vw);
      }
    }
  }
`

export default Product
