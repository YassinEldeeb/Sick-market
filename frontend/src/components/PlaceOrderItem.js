import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

const PlaceOrderItem = ({ img, productName, qty, price, id, isBuyNow }) => {
  const dispatch = useDispatch()

  return (
    <StyledItem>
      <div className='firstDiv'>
        <Link
          onClick={() => dispatch({ type: "PRODUCT_DETAIL_REQUEST" })}
          to={`/products/${id}${isBuyNow ? "?order=buyNow" : ""}`}
        >
          <img src={img} alt='product' />
        </Link>
        <h1>
          <Link
            onClick={() => dispatch({ type: "PRODUCT_DETAIL_REQUEST" })}
            to={`/products/${id}${isBuyNow ? "?order=buyNow" : ""}`}
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
  &:last-child {
    border-bottom: unset;
  }
  .firstDiv a {
    display: flex;
  }
  .firstDiv {
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: max-content;
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
  @media screen and (max-width: 1050px) {
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
  }
`

export default PlaceOrderItem
