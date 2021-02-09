import React from "react"
import styled from "styled-components"
import Message from "../components/message"
import Goback from "../components/Goback"
import { useSelector } from "react-redux"
import CartProduct from "../components/CartProduct"
import { Link } from "react-router-dom"

const Cart = ({ cartCount, setCartCount }) => {
  const { cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.userInfo)
  const pricesArr = cartItems.map((each) => each.price * each.qty)
  const qtyArr = cartItems.map((each) => each.qty)

  const redirect = user.name ? "/shipping" : "/login?redirect=shipping"
  return (
    <StyledCart>
      <Goback />
      <h1 className='title'>Shopping Cart</h1>
      {cartItems.length !== 0 && (
        <>
          <div className='subtotal-mobile'>
            <h3>
              Subtotal ({qtyArr.reduce((acc, item) => acc + item)} items):
            </h3>
            <h4>
              {pricesArr.reduce((acc, price) => acc + price).toFixed(2)}
              <span className='currency'>EGP</span>
            </h4>
          </div>
          <Link to={redirect} className='proceed-btn-mobile'>
            <h3>Proceed to checkout</h3>
          </Link>
          <div className='line'></div>
        </>
      )}
      <div className='cart-container'>
        <div
          className='products'
          style={{ flexGrow: `${cartItems.length ? 3 : "unset"}` }}
        >
          {cartItems.length ? (
            cartItems.map((product) => (
              <CartProduct
                product={product}
                key={product._id}
                cartCount={cartCount}
                setCartCount={setCartCount}
              />
            ))
          ) : (
            <Message msg='Your cart is empty' />
          )}
        </div>
        {cartItems.length !== 0 && (
          <div className='table-total'>
            <div className='container'>
              <div className='subtotal'>
                <h3>
                  Subtotal ({qtyArr.reduce((acc, item) => acc + item)} items)
                </h3>
                <h4>
                  {pricesArr.reduce((acc, price) => acc + price).toFixed(2)}
                  <span className='currency'>EGP</span>
                </h4>
              </div>
              <Link to={redirect} className='proceed-btn'>
                <h3>Proceed to checkout</h3>
              </Link>
            </div>
          </div>
        )}
      </div>
    </StyledCart>
  )
}
const StyledCart = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .goBackBtn {
    margin-top: 0.7rem;
  }
  .title {
    margin-top: 0.7rem;
    color: #1a1a1a;
    font-weight: 500;
    font-size: calc(1.5rem + 1vw);
    margin-bottom: 0.5rem;
    width: 60%;
  }
  .products {
    display: flex;
    flex-direction: column;
  }
  .subtotal-mobile {
    padding-bottom: calc(0.25rem + 0.3vw);
    width: 100%;
    display: none;
    align-items: center;
    justify-content: space-between;
    h3,
    h4 {
      color: #1a1a1a;
    }
    h3 {
      font-weight: 400;
      font-size: calc(1.05rem + 0.3vw);
    }
    h4 {
      font-weight: 400;
      margin: 0.5rem 0;
      font-size: calc(1.05rem + 0.3vw);
      .currency {
        margin-left: 0.15rem;
        display: inline-block;
        font-size: calc(0.8rem + 0.4vw);
      }
    }
  }
  .table-total {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    .container {
      border: 1px solid rgba(0, 0, 0, 12.5%);
      align-self: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      border-radius: 7px;
      border: 1px solid rgba(0, 0, 0, 12.5%);
      .subtotal {
        border-bottom: 1px solid rgba(0, 0, 0, 12.5%);
        padding: calc(1rem + 0.3vw);
        padding-bottom: calc(0.25rem + 0.3vw);
        width: 100%;
        display: flex;
        flex-direction: column;
        h3,
        h4 {
          color: #1a1a1a;
        }
        h3 {
          font-weight: 400;
          font-size: calc(1.5rem + 0.3vw);
        }
        h4 {
          font-weight: 200;
          margin: 0.5rem 0;
          font-size: calc(1.3rem + 0.3vw);
          .currency {
            display: inline-block;
            font-size: calc(0.8rem + 0.4vw);
            margin-left: 0.2rem;
          }
        }
      }
      .proceed-btn {
        align-self: stretch;
        cursor: pointer;
        margin: calc(0.85rem + 0.3vw) calc(1rem + 0.3vw);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: calc(0.6rem + 0.1vw) calc(1.2rem + 0.1vw);
        background: #00b2d8;
        color: white;
        border-radius: 7px;
        h3 {
          font-size: calc(1rem + 0.3vw);
          font-weight: 400;
        }
      }
    }
  }
  .proceed-btn-mobile {
    margin-bottom: calc(0.25rem + 0.3vw);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-self: stretch;
    padding: calc(0.7rem + 0.1vw) calc(1.2rem + 0.1vw);
    background: #00b2d8;
    color: white;
    border-radius: 7px;

    display: none;
    h3 {
      font-size: calc(1.2rem + 0.3vw);
      font-weight: 400;
    }
  }
  .cart-container {
    display: flex;
    width: 100%;
    gap: calc(1rem + 0.3vw);
    margin-bottom: 0.5rem;
  }
  .removeAndQty {
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
  .removeBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.75rem;
    background: rgba(26, 26, 26, 0.5);
    color: white;
    border-radius: 5px;
    margin-left: 1rem;
    cursor: pointer;
    &:hover {
      background: rgba(26, 26, 26, 0.6);
    }
  }
  @media screen and (max-width: 1105px) {
    .table-total {
      .container {
        .subtotal {
          h3 {
            font-size: calc(1.2rem + 0.3vw);
          }
          h4 {
            font-size: calc(1.1rem + 0.3vw);
          }
        }
        .proceed-btn {
          h3 {
            font-size: calc(0.8rem + 0.3vw);
          }
        }
      }
    }
  }
  @media screen and (max-width: 1050px) {
    .line {
      border-radius: 1px;
      width: 45%;
      height: 2px;
      background: rgba(0, 176, 216, 62%);
      margin: 0.8rem auto;
    }
    .subtotal-mobile,
    .proceed-btn-mobile {
      display: flex;
    }
    .table-total {
      display: none;
    }
    .title {
      font-size: calc(1.5rem + 1vw) !important;
      width: 100%;
    }
  }
`

export default Cart
