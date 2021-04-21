import React, { useRef } from 'react'
import styled from 'styled-components'
import gif from '../img/noise.gif'

const NotFound = () => {
  const torch = useRef(null)
  const torch2 = useRef(null)
  window.addEventListener('mousemove', (e) => {
    if (torch.current) {
      torch.current.style.top = `${e.pageY}px`
      torch.current.style.left = `${e.pageX}px`
    }
  })
  window.addEventListener('touchmove', (e) => {
    if (torch2.current) {
      torch2.current.style.top = `${e.touches[0].clientY}px`
      torch2.current.style.left = `${e.touches[0].clientX}px`
    }
  })
  return (
    <StyledNotFound gif={gif}>
      <h1 className='errorCode'>404</h1>
      <h1 className='notFound'>
        Looks like you've <br />
        lost your direction
      </h1>
      <div ref={torch} className='torch'></div>
      <div ref={torch2} className='torch-mobile'></div>
      <div className='promo-code'>10% Promo Code: 4Sgfav</div>
    </StyledNotFound>
  )
}
const StyledNotFound = styled.div`
  cursor: none;

  .promo-code {
    position: absolute;
    right: 1%;
    bottom: 1%;
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.35);
    pointer-events: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .errorCode {
    font-size: calc(5.5rem + 1vw);
  }
  .notFound {
    font-size: calc(3rem + 1vw);
    text-align: center;
  }
  .notFound,
  .errorCode {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: white !important;
    pointer-events: none;
    text-shadow: 0 2px 1px #747474, -1px 3px 1px #767676, -2px 5px 1px #787878,
      -3px 7px 1px #7a7a7a, -4px 9px 1px #7f7f7f, -5px 11px 1px #838383,
      -6px 13px 1px #878787, -7px 15px 1px #8a8a8a, -8px 17px 1px #8e8e8e,
      -9px 19px 1px #949494, -10px 21px 1px #989898, -11px 23px 1px #9f9f9f,
      -12px 25px 1px #a2a2a2, -13px 27px 1px #a7a7a7, -14px 29px 1px #adadad,
      -15px 31px 1px #b3b3b3, -16px 33px 1px #b6b6b6, -17px 35px 1px #bcbcbc,
      -18px 37px 1px #c2c2c2, -19px 39px 1px #c8c8c8, -20px 41px 1px #cbcbcb,
      -21px 43px 1px #d2d2d2, -22px 45px 1px #d5d5d5, -23px 47px 1px #e2e2e2,
      -24px 49px 1px #e6e6e6, -25px 51px 1px #eaeaea, -26px 53px 1px #efefef;
  }
  .torch,
  .torch-mobile {
    pointer-events: none;
    margin: -150px 0 0 -150px;
    width: 220px;
    height: 220px;
    box-shadow: 0 0 0 9999em #000000;
    opacity: 1;
    border-radius: 50%;
    position: fixed;
    background: rgba(0, 0, 0, 0.1);
    transform: translate(18%, 16%);

    &:before {
      content: '';
      display: block;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      opacity: 0.08;
      background: url(${(props) => props.gif});
    }
    &:after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      box-shadow: inset 0 0 20px 2px rgba(0, 0, 0, 0.7),
        0 0 20px 4px rgba(13, 13, 10, 0.2);
    }
  }
  .torch-mobile {
    width: 170px;
    height: 170px;
    display: none;
  }
  .torch {
    display: block;
  }
  @media screen and (max-width: 1050px) {
    .promo-code {
      right: 3% !important;
    }
    .torch {
      display: none;
    }
    .torch-mobile {
      display: block;
      transition: unset;
    }
    .errorCode {
      font-size: calc(4rem + 1vw);
    }
    .notFound {
      font-size: calc(1.7rem + 1vw);
    }
  }
`

export default NotFound
