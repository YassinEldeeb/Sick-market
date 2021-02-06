import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const CheckoutSteps = ({ step1, step2, step3, step4, current }) => {
  return (
    <StyledSteps>
      <div className='journeyLine'>
        <Link
          className={`circle circle1 ${step1 ? "active" : ""} ${
            current === "step1" ? "current" : ""
          }`}
        >
          <h1>
            <Link>Sign In</Link>
          </h1>
        </Link>
        <div className={`line ${step2 ? "active" : ""}`}></div>
        <Link
          to='/shipping'
          className={`circle circle2 ${step2 ? "active" : ""} ${
            current === "step2" ? "current" : ""
          }`}
        >
          <h1>
            <Link to='/shipping'>Shipping</Link>
          </h1>
        </Link>
        <div className={`line ${step3 ? "active" : ""}`}></div>
        <Link
          to='/payment'
          className={`circle circle3 ${step3 ? "active" : ""} ${
            current === "step3" ? "current" : ""
          }`}
        >
          <h1>
            <Link to='/payment'>Payment</Link>
          </h1>
        </Link>
        <div
          className={`line ${step4 ? "active" : ""} ${
            current === "step4" ? "current" : ""
          }`}
        ></div>
        <Link
          to='/place-order'
          className={`circle circle4 ${step4 ? "active" : ""}`}
        >
          <h1>
            <Link to='/place-order'>Place Order</Link>
          </h1>
        </Link>
      </div>
    </StyledSteps>
  )
}
const StyledSteps = styled.div`
  h1 {
    font-weight: 300;
    font-size: calc(0.9rem + 0.2vw);
    position: absolute;
    top: 50%;
    left: 50%;
    white-space: nowrap;
    transform: translate(-50%, -154%);
    a {
      color: #343a40;
    }
  }
  margin-top: 3.3rem;
  .journeyLine {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .line {
    width: calc(4rem + 4vw);
    height: 4px;
    background: #e4e4e4;
    &.active {
      background: #00b2d8;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .circle {
    position: relative;
    border-radius: 50%;
    width: 21px;
    height: 21px;
    background: #e4e4e4;
    pointer-events: none;
    h1 a {
      color: #b4b4b4;
    }
    &.active {
      background: #00b2d8;
      pointer-events: all;
      h1 a {
        font-weight: 400;
        color: #343a40;
      }
    }
  }
  .current {
    border: 2.7px solid #00b2d8;
    background: transparent !important;
    animation: pulse-blue 1s ease infinite;
  }

  @keyframes pulse-blue {
    0% {
      box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);
    }

    70% {
      box-shadow: 0 0 0 8px rgba(52, 172, 224, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);
    }
  }
  @media screen and (max-width: 1050px) {
    margin-top: 2.7rem;
    .circle {
      width: 17px;
      height: 17px;
    }
    h1 {
      font-size: calc(0.78rem + 0.2vw);
      transform: translate(-50%, -157%);
    }
    .line {
      width: calc(3.2rem + 4vw);
      height: 2.5px;
    }
    .current {
      border: 1.7px solid #00b2d8;
    }
    @keyframes pulse-blue {
      0% {
        box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);
      }

      70% {
        box-shadow: 0 0 0 6px rgba(52, 172, 224, 0);
      }

      100% {
        box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);
      }
    }
  }
`

export default CheckoutSteps
