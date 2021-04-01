import React, { useState } from "react"
import styled from "styled-components"

const SmoothImg = ({
  src,
  alt,
  providedClassName,
  width,
  height,
  imgTransition = 200,
  loadingAnimation = 2000,
  imgId,
  loaderId,
}) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <StyledImg
      imgTransition={imgTransition}
      loadingAnimation={loadingAnimation}
      className={`${providedClassName ? providedClassName : ""}`}
    >
      <div
        style={{ width, height }}
        className={`lazyImgLoader ${loaded ? "hide" : ""}`}
        id={`${loaderId ? loaderId : ""}`}
      ></div>
      <img
        id={`${imgId ? imgId : ""}`}
        className={`${loaded ? "show" : ""}`}
        onLoad={() => setLoaded(true)}
        src={src}
        alt={alt}
      />
    </StyledImg>
  )
}

const StyledImg = styled.div`
  position: relative;
  display: flex;
  height: 100%;

  img {
    max-width: 100%;
    max-height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: ${(props) => props.imgTransition / 1000}s ease
      ${(props) => props.imgTransition / 6000}s;
    z-index: 1;
    border-radius: 7px;
    position: relative;
  }
  .show {
    opacity: 1;
    pointer-events: all;
  }
  .lazyImgLoader {
    z-index: 2;
    transition: ${(props) => props.imgTransition / 1000}s ease;
    max-height: 100%;
    max-width: 100%;
    background: linear-gradient(to right, #aeaeae40, #d2d2d2);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 7px;
    animation: animate ${(props) => props.loadingAnimation / 1000}s infinite
      alternate-reverse;
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
