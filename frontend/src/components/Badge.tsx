import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
  status: any
  text: string
}

const Badge: FC<Props> = ({ status, text }) => {
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
    transition: 0.2s ease;
    &.ok {
      border: unset;
      min-width: 15px;
      min-height: 15px;
      background: #25da8e;
    }
  }
`

export default Badge
