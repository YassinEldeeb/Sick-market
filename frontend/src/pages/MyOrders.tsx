import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Message from '../components/message'
import Loader from '../components/loader'
import getMyOrdersAction from '../actions/getMyOrders'
import { ReactComponent as FalseSVG } from '../img/false.svg'
import { ReactComponent as TrueSVG } from '../img/true.svg'
import { Link } from 'react-router-dom'

const MyOrders = () => {
  const dispatch = useDispatch()
  const { loadingOrders, orders, error } = useSelector(
    (state: any) => state.myOrders
  )

  useEffect(() => {
    dispatch(getMyOrdersAction())
  }, [])
  return (
    <StyledOrders>
      <div
        className='tableCont'
        style={{
          alignItems: `${
            error || (orders && !orders.length) ? 'flex-start' : 'center'
          }`,
        }}
      >
        <div className='content'>
          {loadingOrders && <Loader />}
          {error && <Message msg={error} type='error' />}
          {orders && !orders.length ? (
            <Message
              className='errorMessage'
              msg={"You didn't order anything yet"}
            />
          ) : (
            ''
          )}
          {orders && orders.length ? (
            <>
              <h1 className='title'>My Orders</h1>

              <div className='table'>
                <table>
                  <tr>
                    <th>Id</th>
                    <th className='date'>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Discount</th>
                    <th></th>
                  </tr>
                  {orders.map((each: any) => (
                    <tr>
                      <td>{each._id}</td>
                      <td>{each.createdAt.substring(0, 10)}</td>
                      <td>{each.totalPrice}</td>
                      <td>{each.isPaid ? <TrueSVG /> : <FalseSVG />}</td>
                      <td>{each.isDelivered ? <TrueSVG /> : <FalseSVG />}</td>
                      <td>
                        {!each.couponDiscount.discount ? (
                          <FalseSVG />
                        ) : (
                          <p className='discountAmount'>
                            {each.couponDiscount.discount}
                            <span>
                              {each.couponDiscount.isPercent
                                ? ''
                                : Math.round(
                                    100 /
                                      ((Math.round(each.totalPrice) +
                                        Math.round(
                                          each.couponDiscount.discount
                                        ) -
                                        Math.round(each.shippingPrice)) /
                                        Math.round(
                                          each.couponDiscount.discount
                                        ))
                                  )}
                              %
                            </span>
                          </p>
                        )}
                      </td>
                      <td>
                        <Link to={`/orders/${each._id}`}>Details</Link>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </StyledOrders>
  )
}

const StyledOrders = styled.div`
  .discountAmount {
    position: relative;
    display: inline-block;
    span {
      position: absolute;
      top: 0;
      right: -2px;
      color: #1eb174;
      font-size: 0.8rem;
      transform: translate(100%, 0);
    }
  }
  .slider-Burger {
    z-index: 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: max-content;
    margin-left: 5vw;
    margin-top: 5vw;
    background: #1a1a1a;
    padding: 1rem 0.5rem;
    width: 49px;
    height: 49px;
    border-radius: 50%;
    margin-bottom: calc(5vw);
    span {
      width: 1.8rem !important;
      height: 0.18rem !important;
      margin: 0.18rem 0 !important;
      background: white;
      border-radius: 1px;
      transition: 0.3s ease;
    }
  }
  .slider-Burger {
    display: none;
  }
  .message {
    height: max-content !important;
    padding: 0.65rem 0.9rem !important;
    span {
      font-size: calc(0.8rem + 0.3vw) !important;
    }
  }
  .table {
    display: block;
    overflow-x: auto;
    border-radius: 6px;
    border-style: hidden;
    box-shadow: 0 0 0 1px rgba(242, 242, 242, 0.3);
    margin-bottom: 1.2rem;
  }
  .content {
    width: 100%;
    overflow-x: auto;

    height: 100%;
    padding-right: 4vw;
    padding-left: 4vw;
    padding-top: 2.5rem;
    overflow-y: auto;
  }
  .title {
    font-weight: 500;
    margin-bottom: 1.1rem;
    font-size: calc(1.8rem + 0.3vw);
  }
  .gridjs.gridjs-container {
    flex: 1 1 !important;
  }
  .tableCont {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    table tr th {
      text-align: start !important;
    }

    table td {
      padding: 0.75rem;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    table th {
      padding: 0.75rem;
      font-weight: 500;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    table tr td {
      svg {
        width: calc(20px + 0.2vw);
        height: calc(17px + 0.2vw);
      }
    }
  }
  td a {
    border: none;
    outline: none;
    padding: 0.4rem 1rem;
    background: #f4f4f4;
    color: #1a1a1a;
    border-radius: 4px;
    cursor: pointer;
    font-size: calc(0.76rem + 0.2vw);
    transition: 0.1s ease;
    &:hover {
      background: rgba(244, 244, 244, 0.8);
    }
  }
  table {
    border-collapse: collapse;
    min-width: 100%;
  }
  tr:nth-child(even) {
    background-color: #fafafa;
  }
  display: flex;
  flex: 1 1 auto;
  .slider-shadow {
    display: none;
  }
  @media screen and (max-width: 1050px) {
    .content {
      padding-top: 0;
    }
    .slider-shadow {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      transition: 0.3s ease 0.15s;
    }
    position: relative;
    flex-direction: column;
    .title {
      font-size: calc(1.8rem + 1vw);
    }
    .slider-Burger {
      display: flex;
    }
    table th,
    table td {
      width: max-content !important;
    }
    .date {
      padding-right: calc(4rem + 0.3vw) !important;
    }
    .tableCont {
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
`

export default MyOrders
