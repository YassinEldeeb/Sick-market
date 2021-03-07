import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Message = ({
  msg,
  type = "ok",
  visiblity = true,
  vibrating,
  hidden = false,
}) => {
  const msgText = () => {
    if (msg === "returnTheThing") {
      return (
        <p>
          Email isn't Verified{" "}
          <Link to='/verify?redirect=/placeOrder'>Verify Email</Link>
        </p>
      )
    } else {
      return msg
    }
  }
  return (
    <StyledMessage
      className={`message ${visiblity && vibrating ? "active" : ""}`}
      style={{
        background: `${type === "ok" ? "#DCF1F7" : "#F7DDDC"}`,
        padding: "0.65rem 1.1rem",
        borderRadius: "5px",
        border: "1px solid rgba(56, 0, 0, 0.08)",
        opacity: `${visiblity ? 1 : 0}`,
        pointerEvents: `${visiblity ? "all" : "none"}`,
        height: `${visiblity ? "100%" : "20px"}`,
        display: `${hidden ? "none" : "inline-block"}`,
      }}
    >
      <span
        style={{
          fontWeight: 500,
          color: `${type === "ok" ? "#306F83" : "#712B29"}`,
          fontSize: "calc(0.8rem + 0.5vw)",
          display: `${hidden ? "none" : "block"}`,
        }}
      >
        {msgText()}
      </span>
    </StyledMessage>
  )
}
const StyledMessage = styled.div`
  span {
    a {
      color: #0084a0;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &.active {
    animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`

export default Message
