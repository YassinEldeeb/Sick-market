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
  const [element, inView] = useInView({ triggerOnce: true })
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
      <div
        className={`lazyImgLoaderDiv ${loadedTiny ? 'hide' : ''}`}
        id={`${preLoaderId ? preLoaderId : ''}`}
      ></div>
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
            loadedImages.find((e) => e.img === src) ? 'removeTransition' : ''
          }`}
          onLoad={() => {
            setLoaded(true)
            if (!loadedImages.find((e) => e.img === src))
              setLoadedImages({ img: src })
          }}
          onTransitionEnd={() => {
            const newImages = loadedImages.map((e) => {
              if (e.src === src) {
                return { img: e.src, transitioned: true }
              }
            })
            if (!loadedImages.find((e) => e.img === src))
              setLoadedImages(newImages, true)
          }}
          src={src}
          alt={alt}
          style={{ opacity: loaded ? 1 : 0 }}
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
  .actualImg {
    max-height: 100%;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    border-radius: 7px;
    position: relative;
    transition: ${(props) => props.imgTransition / 1000}s ease;
  }
  .removeTransition {
    transition: unset !important;
  }
  .transitionOn {
  }
  .show {
    pointer-events: all;
  }

  .actualImg {
    position: absolute;
    top: 0;
    left: 0;
  }
  .lazyImgLoader,
  .lazyImgLoaderDiv {
    z-index: 1;
    transition: 0.1s ease;
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 7px;
    opacity: 1;
    filter: blur(5px);

    &.hide {
      opacity: 0;
      pointer-events: none;
      animation: unset;
      filter: unset;
    }
  }
  .lazyImgLoaderDiv {
    filter: unset;
    background: linear-gradient(to right, #aeaeae40, #d2d2d2);
    animation: animate ${(props) => props.loadingAnimation / 1000}s infinite
      alternate-reverse;
  }
  .notShow {
    opacity: 0 !important;
  }
  .lazyImgLoader {
    position: static;
    height: auto;
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
