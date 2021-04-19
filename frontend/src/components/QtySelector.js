import React, { useState, useEffect } from 'react'
import arrow from '../img/gobackArrow.svg'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { updateQtyAction } from '../actions/cart'

const QtySelector = ({
  product,
  cartItems,
  qty,
  setQty,
  cartCount,
  setCartCount,
  className,
}) => {
  const match = cartItems
    ? cartItems.find((each) => each._id === product._id)
    : false
  const dispatch = useDispatch()

  const [toggle, setToggle] = useState(false)
  document.body.addEventListener('click', (e) => {
    e.stopPropagation()
    if (
      !e.target.classList.contains('selectValue') &&
      !e.target.classList.contains('select') &&
      !e.target.classList.contains('arrowImg') &&
      !e.target.classList.contains('drop-menu') &&
      !e.target.classList.contains('option')
    ) {
      if (toggle) {
        setToggle(false)
      }
    }
  })
  const [chosenQtyValue, setChosenQtyValue] = useState(qty)

  let dropmenuArr
  const dropmenu = () => {
    dropmenuArr = []
    for (let i = 1; i < product.qtyPerUser + 1; i++) {
      if (product.countInStock >= i) {
        dropmenuArr.push(
          <p
            className={`option ${chosenQtyValue === i ? 'active' : ''}`}
            key={`selectOption${dropmenuArr.length}`}
            onClick={(e) => {
              setQty(e.target.innerText)
              setChosenQtyValue(Number(e.target.innerText))

              if (match) {
                const chosenQty = Number(e.target.innerText)
                if (chosenQty <= match.qty) {
                  setCartCount(cartCount - (match.qty - chosenQty))
                } else {
                  setCartCount(cartCount + (chosenQty - match.qty))
                }
              }
            }}
          >
            {i}
          </p>
        )
      } else {
        break
      }
    }
    return dropmenuArr
  }
  useEffect(() => {
    if (cartItems) {
      if (match) {
        dispatch(updateQtyAction(match, Number(qty)))
      }
    }
  }, [qty, cartItems, dispatch, match])

  return (
    <StyledSelect className={`${className ? className : ''}`}>
      <div className='select' onClick={() => setToggle(!toggle)}>
        <h1 className='selectValue'>{qty}</h1>
        <img className='arrowImg' src={arrow} alt='arrow' />
        <div className={`drop-menu ${toggle ? 'active' : ''}`}>
          {dropmenu()}
        </div>
      </div>
    </StyledSelect>
  )
}

const StyledSelect = styled.div`
  .select {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 1.3rem;
    background: #f4f4f4;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
    h1 {
      font-weight: 400;
      color: #1a1a1a;
    }
    .drop-menu {
      z-index: 2;
      padding-top: 0.2rem;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
      border: 1px solid rgba(52, 58, 64, 0.16);
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translate(0, 100%);
      display: none;
      background: #ffff;
      width: 120%;
      max-height: 140px;
      height: max-content !important;
      overflow-y: auto;
      border-radius: 5px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      &.active {
        display: block;
      }
      p {
        font-size: calc(0.9rem + 0.3vw);
        padding: 0.3rem 0;
        padding-left: 1rem;
        border-radius: 4px;
        margin: 0.2rem;
        color: #253858;
        border-bottom: unset !important;
        &:last-child {
          margin-bottom: 0;
          margin-bottom: 0.2rem;
        }
        &:hover {
          background: rgba(222, 235, 255, 0.5);
        }
        &.active {
          background: #00b2d8;
          color: white;
        }
      }
    }
    img {
      transform: rotate(270deg);
      height: 14px;
    }
    h1 {
      margin-right: 0.7rem;
      font-size: calc(1rem + 0.3vw) !important;
    }
  }
  @media screen and (max-width: 1050px) {
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
        height: max-content !important;
        overflow-y: auto;
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
  }
`

export default QtySelector
