import React from 'react'
import { ReactComponent as Arrow } from '../img/gobackArrow.svg'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'

const Goback = ({ toPath, providedClassName, text = 'Go back' }) => {
  const location = useLocation()
  const isBuyNow = location.search.split('=')[1] === 'buyNow'

  const lastLocation = useLastLocation()
  let linkValue
  if (lastLocation && lastLocation.pathname.includes('dashboard')) {
    const search = lastLocation
      ? lastLocation.search
        ? lastLocation.search
        : ''
      : ''
    linkValue = lastLocation.pathname + search
  } else if (toPath) {
    linkValue = toPath
  } else if (
    lastLocation &&
    !lastLocation.pathname.includes('product-description') &&
    !lastLocation.pathname.includes('products')
  ) {
    linkValue = `${lastLocation.pathname}${isBuyNow ? '?order=buyNow' : ''}`
  } else {
    linkValue = '/'
  }
  return (
    <StyledGo className={`${providedClassName ? providedClassName : ''}`}>
      <Link to={linkValue} className='flexCont'>
        <Arrow />
        <h1>{text}</h1>
      </Link>
    </StyledGo>
  )
}
const StyledGo = styled.div`
  display: inline-block;
  margin-top: 1rem;
  .flexCont {
    cursor: pointer;
    border-radius: 7px;
    padding: 0.7rem 0.9rem;
    display: flex;
    background: #f4f4f4;
    transition: all 0.2s ease;
    display: inline-flex !important;
    justify-content: center;
    align-items: center;
    &:hover {
      background: #f6f6f6;
    }
    svg {
      width: calc(0.28rem + 0.3vw);
    }
    h1 {
      font-size: calc(0.7rem + 0.3vw);
      font-weight: 400;
      padding-left: 0.4rem;
      color: #1a1a1a;
    }
  }
  @media screen and (max-width: 1050px) {
    margin-top: 0.7rem;
    .flexCont {
      padding: 0.6rem 0.8rem;
      h1 {
        font-size: calc(0.75rem + 0.3vw);
      }
      img {
        width: calc(0.35rem + 0.3vw);
      }
    }
  }
`

export default Goback
