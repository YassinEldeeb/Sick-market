import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import danger from "../img/warningBarIcon.svg"

const PopupMessage = ({ title, desc, setWarning }) => {
  return (
    <StyledPopup className='alert'>
      <div className='title'>
        <svg
          onClick={() => {
            setWarning(false)
            localStorage.setItem("showWarning", "hide")
          }}
          viewBox='0 0 91 95'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='45.5'
            cy='49.5'
            r='45.5'
            fill='white'
            fillOpacity='0.85'
          />
          <path
            d='M31.3682 66C31.0661 66 30.8962 65.9245 30.8584 65.7734C30.8206 65.6035 30.8395 65.4902 30.915 65.4336L42.5547 50.5088L30.915 35.5557C30.8584 35.499 30.8206 35.4329 30.8018 35.3574C30.8018 35.0931 30.9906 34.9609 31.3682 34.9609H35.5312C36.0033 34.9609 36.3903 35.1592 36.6924 35.5557L45.4717 46.7988L54.2793 35.5557C54.5814 35.1781 54.9684 34.9798 55.4404 34.9609H59.6035C59.9811 34.9609 60.1699 35.0931 60.1699 35.3574C60.1699 35.4329 60.1416 35.499 60.085 35.5557L48.3604 50.5088L60.085 65.4336C60.1416 65.4902 60.1699 65.5563 60.1699 65.6318C60.1699 65.8773 59.9811 66 59.6035 66H55.4404C54.9684 66 54.5814 65.8112 54.2793 65.4336L45.4717 54.2188L36.6924 65.4336C36.3903 65.8112 36.0033 66 35.5312 66H31.3682Z'
            fill='black'
          />
        </svg>
        <img src={danger} alt='dangerIcon' />
        <h1>{title}</h1>
      </div>
      <div className='desc'>
        <p>{desc}</p>
      </div>
    </StyledPopup>
  )
}
const StyledPopup = styled.div`
  z-index: 7;
  position: fixed;
  right: 2.5vw;
  bottom: 2.5vw;
  width: 25vw;
  background: #2c3237;
  color: white;
  border-radius: 15px;
  padding: 1.3rem 1.6rem;
  box-shadow: -2px 2px 5px rgba(44, 50, 55, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  svg {
    box-shadow: 0 0 5px #ffffff0f;
    position: absolute;
    right: 5%;
    top: 8%;
    border-radius: 50%;
    width: calc(1.65rem + 0.05vw) !important;
    height: calc(1.65rem + 0.05vw) !important;
    cursor: pointer;
    circle {
      fill-opacity: 0.9 !important;
      transition: 0.05s ease;
      fill: #454d55;
    }
    path {
      fill: white;
    }
    &:hover circle {
      fill-opacity: 1 !important;
    }
  }
  img {
    width: calc(1.3rem + 0.3vw);
    height: calc(1.3rem + 0.3vw);
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.05rem;
    h1 {
      font-size: calc(1.4rem + 0.3vw);
      font-weight: 700;
      margin-left: 0.15rem;
    }
  }
  .desc {
    p {
      color: #f0f0f0;
      font-size: calc(0.7rem + 0.3vw);
      p a {
        color: #00b2d8;
        text-decoration: underline;
      }
    }
  }
  @media screen and (max-width: 1100px) {
    width: 33vw;
    padding: 0.9rem 1rem;
    right: 2.5vw;
    bottom: 5vw;
    .title {
      h1 {
        font-size: calc(1.2rem + 0.3vw);
      }
    }
    img {
      width: calc(1.2rem + 0.3vw);
      height: calc(1.2rem + 0.3vw);
    }
    .desc {
      p {
        font-size: calc(0.65rem + 0.3vw);
      }
    }
  }
  @media screen and (max-width: 1030px) {
    width: 35vw;
  }
  @media screen and (max-width: 870px) {
    width: 40vw;
  }
  @media screen and (max-width: 730px) {
    width: 45vw;
  }
  @media screen and (max-width: 650px) {
    width: 50vw;
  }
  @media screen and (max-width: 580px) {
    width: 55vw;
  }
  @media screen and (max-width: 520px) {
    width: 60vw;
  }
  @media screen and (max-width: 465px) {
    width: 65vw;
  }
  @media screen and (max-width: 420px) {
    width: 70vw;
  }
`

export default PopupMessage
