import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { useSelector, useDispatch } from 'react-redux'

const SmoothImg = ({
  src,
  tiny,
  alt,
  providedClassName,
  width,
  height,
  imgTransition = 400,
  loadingAnimation = 2000,
  imgId,
  loaderId,
  preLoaderId,
  contWidth = '100%',
  contHeight = '100%',
  contWidthMobile = '100%',
  contHeightS,
}) => {
  const dispatch = useDispatch()
  const { loadedImages } = useSelector((state) => state.loadedImages)

  const setLoadedImages = (src, map) => {
    dispatch({
      type: 'UPDATE_LOADED_IMAGES',
      payload: map ? src : [...loadedImages, src],
    })
  }

  const [loadedTiny, setLoadedTiny] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [element, inView] = useInView({
    triggerOnce: true,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) {
      setIsVisible(true)
    }
  }, [inView])

  return (
    <StyledImg
      contHeightS={contHeightS}
      ref={element}
      contWidthMobile={contWidthMobile}
      contWidth={contWidth}
      contHeight={contHeight}
      imgTransition={imgTransition}
      loadingAnimation={loadingAnimation}
      className={`${providedClassName ? providedClassName : ''}`}
    >
      {!loadedImages.find((e) => e.img === src) && (
        <div
          className={`lazyImgLoaderDiv ${loadedTiny ? 'hide' : ''}`}
          id={`${preLoaderId ? preLoaderId : ''}`}
        ></div>
      )}

      <img
        src={tiny}
        style={{ width, height }}
        className={`lazyImgLoader ${loaded ? 'hide' : ''} ${
          loadedImages.find((e) => e.img === src) ? 'notShow' : ''
        }`}
        id={`${loaderId ? loaderId : ''}`}
        onLoad={() => setLoadedTiny(true)}
        onError={(e) => (e.target.src = '/uploads/tinyNo.jpg')}
      />

      {isVisible && (
        <img
          id={`${imgId ? imgId : ''}`}
          className={`actualImg ${loaded ? 'show' : ''} ${
            loadedImages.find((e) => e.img === src) &&
            loadedImages.find((e) => e.img === src).transitioned === true
              ? 'removeTransition'
              : ''
          }`}
          onLoad={() => {
            setLoaded(true)
            if (!loadedImages.find((e) => e.img === src))
              setLoadedImages({ img: src })
          }}
          onAnimationEnd={() => {
            const newImages = loadedImages.map((e) => {
              if (e.img === src) {
                return { img: e.img, transitioned: true }
              } else return e
            })
            if (
              loadedImages.find((e) => e.img === src) &&
              !loadedImages.find((e) => e.img === src).transitioned
            )
              setLoadedImages(newImages, true)
          }}
          src={src}
          alt={alt}
          onError={(e) => (e.target.src = '/uploads/no.jpg')}
        />
      )}
    </StyledImg>
  )
}

const StyledImg = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  min-height: ${(props) => props.contHeight};
  width: ${(props) => props.contWidth};
  border-radius: 7px;

  @media screen and (max-width: 515px) {
    min-height: ${(props) => props.contHeightS};
  }
  @media screen and (max-width: 1050px) {
    width: ${(props) => props.contWidthMobile};
  }
  img {
    object-fit: cover;
  }
  .actualImg {
    max-height: 100%;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    border-radius: 7px;
    position: relative;
  }
  .removeTransition {
    animation: show 0s forwards;
    pointer-events: all;
  }
  .show {
    animation: show ${(props) => props.imgTransition / 1000}s forwards;
    pointer-events: all;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .actualImg {
    position: absolute;
    top: 0;
    left: 0;
  }
  .lazyImgLoader,
  .lazyImgLoaderDiv {
    z-index: 1;
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 7px;
    opacity: 1;
    filter: blur(7px);
    transition: 0.08s;

    &.hide {
      opacity: 0 !important;
      pointer-events: none;
      animation: unset;
      filter: unset !important;
    }
  }
  .lazyImgLoaderDiv {
    width: 100%;
    height: 100%;
    filter: unset !important;
  }
  .notShow {
    opacity: 0 !important;
  }
  .lazyImgLoader {
    position: static;
    height: auto;
  }
  .removeTransition {
    animation: unset !important;
    opacity: 1;
  }
`

export default SmoothImg
