import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import Rating from './Rating'
import { useDispatch } from 'react-redux'
import { ReactComponent as Add } from '../img/add.svg'
import { ReactComponent as Free } from '../img/free.svg'
import { ReactComponent as Discount } from '../img/discount.svg'
import SmoothImg from './smoothImgLoading'

interface Props {
  data: any
  providedClassName?: string
  type?: any
  completedCrop?: any
  previewCanvasRef?: any
  edit?: any
  noImage?: any
  setScrollPosition?: any
}

const Product: FC<Props> = ({
  data,
  providedClassName,
  type,
  completedCrop,
  previewCanvasRef,
  edit,
  noImage,
  setScrollPosition,
}) => {
  const location = useLocation()
  const dispatch = useDispatch()
  function truncate(str: string) {
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
          if (setScrollPosition) setScrollPosition(window.pageYOffset)
          if (type !== 'preview') dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })
        }}
      >
        {data.oldPrice && (
          <div className='discount'>
            <Discount />
            <h6>
              {(((data.oldPrice - data.price) / data.oldPrice) * 100).toFixed(
                0
              )}
              % off
            </h6>
          </div>
        )}
        {completedCrop && completedCrop.width && type === 'preview' ? (
          <canvas className='canvasPreview' ref={previewCanvasRef} />
        ) : type === 'preview' ? (
          <>
            <SmoothImg
              key={data._id}
              contHeight={
                'calc(((200px + 1vw) - (0.5rem + 0.4vw))* 0.796875 + 6px)'
              }
              contHeightS={'calc(((90vw - (0.8rem + 0.4vw) * 2)) * 0.796875)'}
              preLoaderId='preLoader'
              loaderId='preloader2'
              src={data.image}
              alt='product'
              tiny={`/api/products/${data._id}/tiny`}
              providedClassName='productLazy'
            />
            {/* <img
              src={noImage ? '/uploads/no.jpg' : data.image}
              alt='product'
              key={data.image}
            /> */}

            <div className='addLayer'>
              <Add className='add' />
            </div>
          </>
        ) : (
          ''
        )}

        {type !== 'preview' && (
          <SmoothImg
            key={data._id}
            contHeight={
              'calc(((200px + 5vw) - (0.5rem + 0.4vw))* 0.796875 + 6px)'
            }
            contHeightS={'calc(((90vw - (0.8rem + 0.4vw) * 2)) * 0.796875)'}
            preLoaderId='preLoader'
            loaderId='preloader2'
            src={data.image}
            alt='product'
            tiny={`/api/products/${data._id}/tiny`}
            providedClassName='productLazy'
          />
        )}
      </Link>
      <div className='product_description'>
        <p>Brand: {data.brand}</p>
        <Link
          to={`${type !== 'preview' ? `/products/${data._id}` : '#'}`}
          onClick={() => {
            if (setScrollPosition) setScrollPosition(window.pageYOffset)
            dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })
          }}
        >
          <h1>{truncate(data.name)}</h1>
        </Link>

        <Rating ratingValue={data.rating} numOfReviews={data.numReviews} />
        {data.freeShipping && (
          <div className='freeShipping'>
            <Free />
            <p>Free Shipping</p>
          </div>
        )}
        <div className='priceSection'>
          <h4>
            {data.price}
            <span className='currency'>EGP</span>
          </h4>
          {data.oldPrice && (
            <h4 className='oldPrice'>
              {data.oldPrice}
              <span className='currency'>EGP</span>
            </h4>
          )}
        </div>
      </div>
    </StyledProduct>
  )
}
const StyledProduct = styled.div`
  .productLazy {
  }
  .hide {
    opacity: 0;
  }
  .priceSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .oldPrice {
      margin-left: calc(1.4rem + 1vw);
      text-decoration: line-through;
      filter: grayscale(0.7);
      font-size: calc(0.8rem + 0.4vw);
      .currency {
        font-size: calc(0.45rem + 0.4vw);
        text-decoration: line-through;
      }
    }
  }
  #preLoader,
  #preloader2 {
    width: 640px;
  }
  #preloader2 {
    height: auto !important;
  }
  #preLoader {
    height: 100% !important;
    width: 100% !important;
  }
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
  .discount {
    position: absolute;
    right: 0;
    top: 0;
    background: #00b2d8;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    padding: 0.4rem 0.65rem;
    border-radius: 7px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 0px;

    svg {
      margin-right: 0.25rem;
      width: 18px !important;
      height: 18px !important;
    }
    h6 {
      font-weight: 500;
      font-size: calc(0.95rem + 0.1vw) !important;
      color: white !important;
    }
  }
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
    z-index: 1;
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
  .freeShipping {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: #00b2d8 !important;
      font-size: calc(0.87rem + 0.1vw) !important;
      font-weight: 500;
    }
    svg {
      margin-right: 0.2rem;
      width: 17px;
      height: 17px;
    }
  }
  @media screen and (max-width: 570px) {
    .discount {
      padding: 0.4rem 0.65rem;

      img {
        width: 15px !important;
        height: 15px !important;
      }
      h6 {
        font-size: calc(0.7rem + 0.5vw) !important;
      }
    }
    .freeShipping {
      padding-bottom: calc(0.1rem + 0.1vw);

      p {
        font-size: calc(0.7rem + 0.5vw) !important;
      }
    }
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
