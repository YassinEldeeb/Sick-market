import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Input from '../components/DashboardInput'
import Loader from '../components/loader'
import { popup2, hide5 } from '../animations'
import { useHistory, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactComponent as XSign } from '../img/smallX.svg'
import Switch from 'react-switch'
import ReactTooltip from 'react-tooltip'
import { ReactComponent as Info } from '../img/info.svg'
import { useSelector, useDispatch } from 'react-redux'
import createDiscount from '../actions/createDiscount'
import DashboardError from '../components/DashboardError'

const DashboardAddDiscount = ({ scrolled }) => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const { success, createLoading, createError } = useSelector(
    (state) => state.discounts
  )

  const addDiscountHandler = (e) => {
    e.preventDefault()
    const discountObj = {
      code: code.length ? code : null,
      limited: limited.length ? limited : null,
      amount: amount.length ? amount : null,
      isPercent: type === 'voucher' ? false : true,
    }
    if (amount.length) dispatch(createDiscount(discountObj))
  }

  const [code, setCode] = useState('')
  const [limited, setLimited] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('voucher')

  useEffect(() => {
    if (success) {
      history.push('/dashboard/discounts')
      setCode('')
      setLimited('')
      setAmount('')
      setType('voucher')
      dispatch({ type: 'CREATE_DISCOUNT_RESET' })
    }
  }, [success])
  return (
    <StyledAddDiscount
      style={{ top: `${scrolled}px` }}
      id={`${location.pathname.split('/')[3] === 'add' ? 'active' : ''}`}
      className='cardCont'
      onClick={(e) => {
        if (e.target.classList.contains('cardCont'))
          history.push('/dashboard/discounts')
      }}
    >
      <AnimatePresence>
        {location.pathname.split('/')[3] === 'add' && (
          <>
            <ReactTooltip
              id='discount-switch-tooltip'
              effect='solid'
              delayHide={100}
              delayShow={400}
            />
            <motion.div
              variants={hide5}
              onClick={() => history.push('/dashboard/discounts')}
              className='CloseModel'
              initial='hidden'
              animate='show'
              exit='exit'
            >
              <XSign />
            </motion.div>
            <motion.div
              variants={popup2}
              initial='hidden'
              animate='show'
              exit='exit'
              className='card'
            >
              <Scrollbars
                renderTrackHorizontal={(props) => (
                  <div {...props} className='track-horizontal-newView' />
                )}
                renderTrackVertical={(props) => (
                  <div {...props} className='track-vertical-newView' />
                )}
                renderThumbHorizontal={(props) => (
                  <div {...props} className='thumb-horizontal-newView' />
                )}
                renderThumbVertical={(props) => (
                  <div {...props} className='thumb-vertical-newView' />
                )}
                renderView={(props) => <div {...props} className='newView' />}
                className='card-large-scrollable-content'
              >
                <motion.div className='createSection'>
                  {createError && <DashboardError error={createError} />}
                  <h1 className='title'>New Discount</h1>
                  <form onSubmit={addDiscountHandler}>
                    <Input
                      required={false}
                      label='Code'
                      value={code}
                      setValue={setCode}
                    />
                    <Input
                      label='Limited'
                      value={limited}
                      setValue={setLimited}
                      type={'number'}
                      required={false}
                    />
                    <Input
                      label='Amount'
                      value={amount}
                      setValue={setAmount}
                      type={'number'}
                    />
                    <div className='switchCont'>
                      <p
                        data-for='discount-switch-tooltip'
                        data-tip='In Vouchers The Amount is in Egyptian Pounds.'
                        className='discountType'
                      >
                        Voucher
                      </p>
                      <Switch
                        className='switch'
                        offColor='#24CA84'
                        onColor='#24CA84'
                        checked={type !== 'voucher'}
                        onChange={(e) => {
                          if (e) setType('coupon')
                          else setType('voucher')
                        }}
                      />
                      <p
                        data-for='discount-switch-tooltip'
                        data-tip='In Coupon Codes The Amount is in Percentage.'
                        className='discountType'
                      >
                        Coupon
                      </p>
                      <div
                        data-for='discount-switch-tooltip'
                        data-tip='Hover over the two options for more details'
                        className='info'
                      >
                        <Info />
                      </div>
                    </div>
                    <motion.div className='buttonCont'>
                      <motion.button className='create' type='submit'>
                        Create Discount{createLoading && <Loader />}
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
              </Scrollbars>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </StyledAddDiscount>
  )
}
const StyledAddDiscount = styled.div`
  .info {
    width: 25px;
    height: 25px;
    svg {
      height: 100%;
      width: 100%;
    }
    cursor: pointer;
    margin-left: 0.7rem;
  }
  #discount-switch-tooltip {
    max-width: 250px;
  }
  #discount-switch-tooltip.__react_component_tooltip {
    background: #505295 !important;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    &::after {
      border-top-color: #505295 !important;
    }
  }
  .buttonCont {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }
  .title {
    font-size: calc(2rem + 0.3vw);
    margin-bottom: 1rem;
  }
  .switch {
    margin: 0 0.6rem;
  }
  .switchCont {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .discountType {
    color: white !important;
  }
  .react-switch-bg div svg {
    display: none !important;
  }
  .newView {
    height: 100% !important;
    overflow: auto !important;
    position: absolute;
    inset: 0px;
    margin-bottom: -20px !important;
    margin-right: -8px !important;
    display: grid;
    place-items: center;
    padding: calc(2.4rem + 1vw);
    padding-bottom: 0rem;
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
  }
  .thumb-horizontal-newView {
    position: relative;
    display: block;
    height: 100%;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.2);
    width: 0px;
  }
  .track-horizontal-newView {
    position: absolute;
    height: 6px;
    right: 2px;
    bottom: 2px;
    left: 2px;
    border-radius: 3px;
  }

  .track-vertical-newView {
    position: absolute;
    width: 6px;
    right: 2px;
    bottom: 2px;
    top: 2px;
    border-radius: 3px;
  }
  .thumb-vertical-newView {
    position: relative;
    display: block;
    width: 100%;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.2);
    height: 135px;
    transform: translateY(0px);
  }
  .CloseModel {
    position: absolute;
    right: 3%;
    top: 4%;
    opacity: 0.7;
    transition: 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 22px;
      height: 22px;
    }
    &:hover {
      opacity: 0.9 !important;
    }
  }
  #loader:first-child {
    width: calc(0.65rem + 0.5vw) !important;
    height: calc(0.65rem + 0.5vw) !important;
    margin-left: 0.45rem !important;
    #greybackground path {
      stroke: white !important;
    }
  }

  .create {
    background: #5a5da8;
    color: white;
    padding: 0.7rem 1.2rem;
    font-size: calc(0.78rem + 0.3vw);
    border: none;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s ease;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: #505295;
    }
  }
  .createSection {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
  &#active {
    background: rgba(29, 33, 62, 0.6);
    pointer-events: all;
  }
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
  cursor: pointer;
  pointer-events: none;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .card {
    cursor: auto;
    background: #373864;
    border-radius: 20px;
    width: calc(28vw + 2 * calc(2.4rem + 1vw));
    height: 74vh;
  }
  @media screen and (min-height: 831px) {
    .card {
      height: 70vh !important;
    }
  }
  @media screen and (min-height: 879px) {
    .card {
      height: 60vh !important;
    }
  }
  @media screen and (min-height: 1045px) {
    .card {
      height: 50vh !important;
    }
  }
  @media screen and (min-height: 1268px) {
    .card {
      height: 40vh !important;
    }
  }
  @media screen and (min-height: 1591px) {
    .card {
      height: 30vh !important;
    }
  }
`

export default DashboardAddDiscount
