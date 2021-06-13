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
import { ReactComponent as Add } from '../img/addIcon.svg'
import DashboardAddDiscount from './DashboardAddDiscount'
import { throttle } from 'underscore'
import deleteDiscount from '../actions/deleteDiscount'
import ConfirmPopup from '../components/confirmPopup'
import { ReactComponent as DeleteAll } from '../img/deleteAll.svg'
import { useInView } from 'react-intersection-observer'

const DashboardDiscounts = () => {
  const [element, inView] = useInView()
  const history = useHistory()
  const location = useLocation()

  const [clickedForDelete, setClickedForDelete] = useState('')

  const { discounts, count, error, loading, infiniteLoading } = useSelector(
    (state: any) => state.discounts
  )
  const {
    confirm,
    asking,
    discount: code,
  } = useSelector((state: any) => state.deleteDiscount)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!location.pathname.split('/')[3] && !discounts)
      dispatch(getDashboardDiscounts())
  }, [location.pathname])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [discounts])

  useEffect(() => {
    const container = document.querySelector('#view')

    if (container) {
      if (location.pathname.split('/')[3]) {
        container.classList.add('preventScrolling')
      } else {
        container.classList.remove('preventScrolling')
      }
    }
  }, [location.pathname])

  const [scrolled, setScrolled] = useState(0)

  useEffect(() => {
    const container = document.querySelector('.view')
    if (container) {
      container.addEventListener(
        'scroll',
        throttle(() => {
          setScrolled(container.scrollTop)
        }, 100)
      )
    }
  }, [])

  useEffect(() => {
    if (confirm) {
      dispatch(
        deleteDiscount(
          clickedForDelete,
          clickedForDelete === 'deleteAll' ? true : false
        )
      )
    }
  }, [confirm])

  const [skip, setSkip] = useState(1)
  useEffect(() => {
    if (inView && !loading && !infiniteLoading) {
      dispatch(getDashboardDiscounts(skip))
      setSkip(skip + 1)
    }
  }, [inView])
  return (
    <StyledDiscounts>
      <DashboardAddDiscount scrolled={scrolled} />
      <ConfirmPopup
        condition={asking}
        type='deleteDiscount'
        action={`Delete "${
          clickedForDelete === 'deleteAll' ? 'All' : clickedForDelete
        }" Discount${clickedForDelete === 'deleteAll' ? 's' : ''}`}
      />
      <div
        className='cont'
        id={`${location.pathname.split('/')[3] ? 'blur' : ''}`}
      >
        {loading ? (
          <Loader />
        ) : discounts ? (
          <>
            <div className='head'>
              <div className='title'>
                <h1>Discounts</h1>
                <p>{count} Discounts Found</p>
              </div>
              <div className='buttonsSection'>
                {count > 1 && (
                  <div
                    onClick={() => {
                      setClickedForDelete('deleteAll')
                      dispatch({ type: 'CONFIRM_DELETE_DISCOUNT_REQUEST' })
                    }}
                    className='deleteAll'
                  >
                    {code === 'deleteAll' ? (
                      <Loader providedClassName='deleteAllLoader' />
                    ) : (
                      <DeleteAll />
                    )}
                  </div>
                )}
                <button
                  onClick={() => history.push('/dashboard/discounts/add')}
                  className='addDiscount'
                >
                  <Add /> New Discount
                </button>
              </div>
            </div>
            {count > 0 ? (
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
            ) : (
              <p className='sorry'>Sorry nothing found!</p>
            )}
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
              {discounts.map((e: any) => (
                <DiscountDashboard
                  key={e._id}
                  discount={e}
                  setClickedForDelete={setClickedForDelete}
                />
              ))}
            </motion.div>
            {discounts && discounts.length < count ? (
              <Loader providedClassName='infiniteLoader' reference={element} />
            ) : (
              !loading &&
              discounts &&
              count !== 0 && <p className='end'>Yay! You have seen it all</p>
            )}
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
  .end {
    color: rgba(255, 255, 255, 0.7) !important;
    text-align: center;
    font-weight: 400 !important;
    font-size: 1rem !important;
    margin-bottom: 0.6rem;
  }
  .infiniteLoader {
    margin-bottom: 0.6rem;
  }
  .infiniteLoader #loader:first-child {
    width: calc(2rem + 0.5vw) !important;
    height: calc(2rem + 0.5vw) !important;
  }
  .sorry {
    text-align: center;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7) !important;
  }
  .buttonsSection {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .deleteAll {
    padding: 0.65rem;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44.8px;
    height: 44.8px;
    background: #ff6969;
    margin-right: 1rem;
    &:hover {
      background: rgba(255, 105, 105, 0.8) !important;
    }
    .deleteAllIcon {
      width: 23px;
      height: 30px;
    }
  }
  .cont {
    transition: 0.2s ease;
  }
  #blur {
    filter: blur(2px);
  }
  .addDiscount {
    background: #373864;
    color: white;
    padding: 0.7rem 1.2rem;
    font-size: calc(0.78rem + 0.3vw);
    border: none;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      margin-right: 0.4rem;
      width: 19px;
      height: 19px;
    }
    &:hover {
      background: #31335a;
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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
    margin-bottom: 1.5rem;
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
  .deleteAllLoader {
    width: 24px;
    height: 24px;
  }
  .deleteAllLoader {
    svg {
      width: 24px !important;
      height: 24px !important;
    }
    #greybackground path {
      stroke: white !important;
    }
  }
`

export default DashboardDiscounts
