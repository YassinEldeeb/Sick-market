import React from 'react'
import styled from 'styled-components'
import Loader from '../components/loader'
import { motion } from 'framer-motion'
import { showSmoothly } from '../animations'

const LoggingOut = () => {
  return (
    <StyledLoggingOut
      variants={showSmoothly}
      animate='show'
      initial='hidden'
      exit='exit'
    >
      <p>Logging you out</p>
      <Loader providedClassName='loaderLoggingOut' />
    </StyledLoggingOut>
  )
}
const StyledLoggingOut = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  z-index: 9999999;
  p {
    margin-bottom: 1rem;
    font-weight: 500;
    color: #1a1a1a;
    font-size: calc(1.3rem + 0.3vw);
    width: max-content;
    max-width: 80vw;
  }
  .loaderLoggingOut #loader:first-child {
    width: calc(2rem + 0.5vw) !important;
    height: calc(2rem + 0.5vw) !important;
  }
`

export default LoggingOut
