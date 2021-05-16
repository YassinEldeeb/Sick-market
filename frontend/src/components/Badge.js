import React from 'react'
import styled from 'styled-components'

const Badge = ({ status, text }) => {
  return (
    <StyledBadge>
      <div className={`indicator ${status ? 'ok' : ''}`}></div>
      <p className={`${status ? 'ok' : ''}`}>{text}</p>
    </StyledBadge>
  )
}

const StyledBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-left: 0.35rem;
    color: #ff6969 !important;
    transition: 0.2s ease;
    font-size: calc(0.7rem + 0.3vw) !important;

    &.ok {
      color: #25da8e !important;
    }
  }
  .indicator {
    min-width: 15px;
    min-height: 15px;
    background: #ff6969;
    border-radius: 50%;
    border: 2.7px solid #ff6969;
    animation: pulse-red 1.3s ease infinite;
    transition: 0.2s ease;
    &.ok {
      border: unset;
      min-width: 15px;
      min-height: 15px;
      background: #25da8e;
      animation: unset;
    }
  }
  @keyframes pulse-red {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 105, 105, 0.5);
    }

    70% {
      box-shadow: 0 0 0 8px rgba(255, 105, 105, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(255, 105, 105, 0);
    }
  }
`

export default Badge
