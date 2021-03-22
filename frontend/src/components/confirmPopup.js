import React from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { slidePopup } from "../animations"

const ConfirmPopup = ({ action, resetValue, condition, type }) => {
  const dispatch = useDispatch()

  const cancelHandler = (passedType) => {
    if (passedType === "rank") {
      dispatch({ type: "CONFIRM_RANK_CANCEL" })
    } else if (passedType === "delete") {
      dispatch({ type: "CONFIRM_DELETE_CANCEL" })
    }

    if (resetValue) {
      resetValue("user")
    }
  }
  const confirmHandler = (passedType) => {
    if (passedType === "rank") {
      dispatch({ type: "CONFIRM_RANK_SUCCESS" })
    } else if (passedType === "delete") {
      dispatch({ type: "CONFIRM_DELETE_SUCCESS" })
    }
  }

  return (
    <StyledCart className={`confirmationPopup ${condition ? "active" : ""}`}>
      <AnimatePresence>
        {condition && (
          <motion.div
            className='card'
            variants={slidePopup}
            initial='hidden'
            animate='show'
            exit='exit'
          >
            <h1>Confirmation</h1>
            <h3>
              Are you sure you want to
              {" " + action}?
            </h3>
            <div className='actions'>
              <button onClick={() => cancelHandler(type)} className='cancel'>
                Cancel
              </button>
              <button onClick={() => confirmHandler(type)} className='confirm'>
                Confirm
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledCart>
  )
}
const StyledCart = styled.div`
  pointer-events: none;
  &.active {
    background: rgba(0, 0, 0, 0.25);
    pointer-events: all;
  }
  transition: background 0.2s ease;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 99;
  .card {
    max-width: 40%;
    margin-top: 1rem;
    background: #373864;
    padding: calc(0.8rem + 1vw) calc(1rem + 1vw);
    border-radius: 10px;

    h1 {
      font-weight: 500;
      font-size: calc(1.5rem + 0.3vw) !important;
    }
    h3 {
      font-weight: 400;
      font-size: calc(0.75rem + 0.3vw) !important;
      color: rgba(255, 255, 255, 0.85);
    }
    .actions {
      margin-top: 0.3rem;
      display: flex;
      justify-content: flex-end;

      .cancel {
        border: 1px solid #e1e2e5;
        background: transparent;
        color: white;
        transition: 0.2s ease;
        &:hover {
          opacity: 0.7;
        }
      }
      .confirm {
        background: #22c581;
        transition: 0.2s ease;
        margin-left: 0.6rem;
        &:hover {
          background: #1faf73;
        }
      }
    }
    button {
      padding: 0.4rem 0.9rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      color: white;
    }
  }
`

export default ConfirmPopup
