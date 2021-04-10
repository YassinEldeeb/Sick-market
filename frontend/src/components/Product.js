import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import Rating from './Rating'
import { useDispatch } from 'react-redux'
import add from '../img/add.svg'
import SmoothImg from './smoothImgLoading'

const Product = ({
  data,
  providedClassName,
  type,
  completedCrop,
  previewCanvasRef,
  edit,
  noImage,
}) => {
  const location = useLocation()
  const dispatch = useDispatch()
  function truncate(str) {
    return str.length > 35 ? str.substr(0, 35 - 1) + '...' : str
  }

  const linkCondition = () => {
    if (type !== 'preview') {
      return `/products/${data._id}`
    } else {
      if (edit) {
        return `/dashboard/products/edit/${
          location.pathname.split('/')[4]
        }/image`
      } else {
        return '/dashboard/products/add/image'
      }
    }
  }
  return (
    <StyledProduct className={`${providedClassName ? providedClassName : ''}`}>
      <Link
        className='previewImg'
        to={linkCondition()}
        onClick={() => {
          if (type !== 'preview') dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })
        }}
      >
        {completedCrop && type === 'preview' ? (
          <canvas className='canvasPreview' ref={previewCanvasRef} />
        ) : type === 'preview' ? (
          <>
            <img src={noImage ? '/uploads/no.jpg' : data.image} alt='product' />

            <div className='addLayer'>
              <img className='add' src={add} alt='' />
            </div>
          </>
        ) : (
          ''
        )}

        {type !== 'preview' && (
          <SmoothImg
            contHeight={'calc((200px + 5vw) / 1.254901960784314)'}
            width={'640px'}
            height={'510px'}
            src={data.image}
            alt='product'
          />
        )}
      </Link>
      <div className='product_description'>
        <p>Brand: {data.brand}</p>
        <Link
          to={`${type !== 'preview' ? `/products/${data._id}` : '#'}`}
          onClick={() => {
            dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })
          }}
        >
          <h1>{truncate(data.name)}</h1>
        </Link>
        <Rating ratingValue={data.rating} numOfReviews={data.numReviews} />
        <h4>
          {data.price}
          <span className='currency'>EGP</span>
        </h4>
      </div>
    </StyledProduct>
  )
}
const StyledProduct = styled.div`
  .canvasPreview {
    width: 100% !important;
    height: unset !important;
    border-radius: 7px;
  }
  height: max-content;
  a {
    display: flex;
    flex-direction: column;
  }
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  overflow: hidden;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.06) -3px 3px 5px;
  border: 1px solid rgba(227, 227, 227, 0.58);
  .product_description {
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    padding: calc(0.8rem + 0.3vw);
    padding-top: calc(0.45rem + 0.3vw);
    padding-bottom: calc(0.45rem + 0.3vw);
    p {
      width: 100%;
      color: #1a1a1a !important;
      font-size: calc(0.6rem + 0.5vw);
    }
    p:first-child {
      color: #00667b !important;
    }
    h1 {
      color: #1a1a1a !important;
      font-weight: 400;
      font-size: calc(0.85rem + 0.4vw);
      padding: calc(0.1rem + 0.1vw) 0;
      &:hover {
        text-decoration: underline;
        text-decoration-color: rgba(26, 26, 26, 0.75);
        text-underline-offset: 3px;
        text-decoration-thickness: 1px;
      }
    }
    h4 {
      color: #005568 !important;
      font-weight: 400;
      font-size: calc(1rem + 0.4vw);
      position: relative;
      .currency {
        font-size: calc(0.55rem + 0.4vw);
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(105%, 10%);
      }
    }
  }
  a:first-child {
    margin: calc(0.5rem + 0.4vw);
    margin-bottom: 0px;
    img {
      display: block;
      object-fit: cover;
      width: 100%;
      border-radius: 7px;
    }
  }
  .previewImg {
    position: relative;
  }
  .addLayer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 7px;
    transition: 0.2s ease;
    opacity: 0;
    .add {
      position: absolute;
      left: 0;
      bottom: 0;
      margin: 0.8rem;
      width: 25px;
      height: 25px;
      border-radius: 0;
    }

    &:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.2);
    }
  }
  @media screen and (max-width: 570px) {
    a:first-child {
      margin: calc(0.8rem + 0.4vw);
      margin-bottom: 0;
    }
    .product_description {
      padding-top: calc(0.65rem + 0.3vw);
      padding-bottom: calc(0.65rem + 0.3vw);
      p {
        font-size: calc(0.85rem + 0.5vw);
      }
      h1 {
        font-size: calc(1.1rem + 0.4vw);
      }
      h4 {
        font-size: calc(1.15rem + 0.4vw);
        .currency {
          font-size: calc(0.6rem + 0.4vw);
        }
      }
    }
  }
`

export default Product
