import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'
import DiscountDashboard from '../components/DiscountDashboard'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import getDashboardDiscounts from '../actions/getDiscounts'
import ReactTooltip from 'react-tooltip'
import { hide } from '../animations'
import Loader from '../components/loader'
import DashboardError from '../components/DashboardError'

const DashboardDiscounts = () => {
  const history = useHistory()
  const location = useLocation()

  const [clickedForDelete, setClickedForDelete] = useState('')

  const { discounts, count, error, loading } = useSelector(
    (state) => state.discounts
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDashboardDiscounts())
  }, [])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [discounts])

  return (
    <StyledDiscounts>
      <div
        className='cont'
        id={`${location.pathname.split('/')[3] ? 'blur' : ''}`}
      >
        {loading ? (
          <Loader />
        ) : discounts ? (
          <>
            <div className='title'>
              <h1>Discounts</h1>
              <p>{count} Discounts Found</p>
            </div>
            <div className='headers'>
              <div className='id'>
                <p>Id</p>
              </div>
              <div className='code'>
                <p>Code</p>
              </div>
              <div className='Amount'>
                <p>Amount</p>
              </div>
              <div className='Limited'>
                <p>Limited</p>
              </div>
              <div className='Used'>
                <p>Used</p>
              </div>
              <div className='Created'>
                <p>Created</p>
              </div>
              <div className='Action'>
                <p>Action</p>
              </div>
            </div>
            <motion.div
              variants={hide}
              initial='hidden'
              animate='show'
              exit='exit'
            >
              <ReactTooltip
                id='discount-card-tooltip'
                effect='solid'
                delayHide={100}
                delayShow={400}
              />
              {discounts.map((e) => (
                <DiscountDashboard
                  discount={e}
                  setClickedForDelete={setClickedForDelete}
                />
              ))}
            </motion.div>
          </>
        ) : error ? (
          <DashboardError error={error} />
        ) : (
          ''
        )}
      </div>
    </StyledDiscounts>
  )
}

const StyledDiscounts = styled.div`
  #greybackground path {
    stroke: #363761 !important;
  }
  p {
    padding: 0;
  }
  overflow-x: hidden;
  overflow-y: hidden;
  height: max-content;
  min-height: 100%;
  position: relative;
  padding: calc(3rem + 0.5vh) calc(2.5rem + 0.5vh);
  padding-bottom: 1rem;
  .title {
    margin-bottom: 1rem;
    h1 {
      font-weight: 500;
      font-size: calc(2.1rem + 0.3vw);
    }
    p {
      color: rgba(255, 255, 255, 0.7) !important;
      font-weight: 400;
      font-size: calc(0.85rem + 0.3vw);
    }
  }
  .headers {
    background: rgba(51, 52, 92, 31%);
    padding: 0.5rem 2.1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .code,
    .id,
    .Amount,
    .Limited,
    .Used,
    .Created,
    .Action {
      p {
        color: rgba(255, 255, 255, 0.9) !important;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: calc(0.8rem + 0.3vw);
      }
    }
    .id {
      min-width: 12%;
      padding-right: 2vw;
    }
    .code {
      min-width: 20%;
      padding-right: 2vw;
    }
    .Amount {
      min-width: 13%;
      padding-right: 2vw;
    }
    .Limited {
      min-width: 13%;
      padding-right: 2vw;
    }
    .Used {
      padding-right: 2vw;
      min-width: 13%;
    }
    .Created {
      padding-right: 2vw;
      min-width: 20%;
    }
    .Action {
      min-width: 10%;
    }
  }
  .__react_component_tooltip {
    background: #1e203e;
    border-radius: 5px;
    &::after {
      border-top-color: #1e203e !important;
    }
  }
`

export default DashboardDiscounts
