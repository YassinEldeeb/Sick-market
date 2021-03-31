import React, { useState } from "react"
import styled from "styled-components"

const SmoothImg = ({ src, alt, providedClassName }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <StyledImg className={`${providedClassName ? providedClassName : ""}`}>
      <div className={`loading ${loaded ? "hide" : ""}`}></div>
      <img
        className={`${loaded ? "show" : ""}`}
        onLoad={() => setLoaded(true)}
        src={src}
        alt={alt}
      />
    </StyledImg>
  )
}

const StyledImg = styled.div`
  img {
    max-width: 100%;
    max-height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s ease;
    z-index: 1;
    border-radius: 7px;
  }
  .show {
    opacity: 1;
    pointer-events: all;
  }
  .loading {
    max-height: 100%;
    max-width: 100%;
    background: linear-gradient(to right, #aeaeae40, #d2d2d2);
    transition: 0.2s ease;
    height: 510px;
    position: absolute;
    width: 640px;
    top: 0;
    left: 0;
    border-radius: 7px;
    animation: animate 2s infinite alternate-reverse;
    &.hide {
      opacity: 0;
      pointer-events: none;
      animation: unset;
    }
  }
  @keyframes animate {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.5;
    }
  }
`

export default SmoothImg
