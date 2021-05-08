import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ReactComponent as Add } from '../img/choose.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { show, popup3 } from '../animations'
import { useHistory, useLocation } from 'react-router-dom'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import DropZone from 'react-drop-zone'
import { ReactComponent as SmallX } from '../img/noImage.svg'

const EditCropImg = ({
  completedCrop,
  setCompletedCrop,
  previewCanvasRef,
  crop,
  setCrop,
  image,
  setImage,
  imageType,
  setImageType,
  formData,
  setFormData,
  noImage,
  setNoImage,
  productImg,
  scrolled,
}) => {
  const location = useLocation()
  const history = useHistory()
  const cancelHandler = () => {
    setFormData(new FormData())
    setCrop({
      aspect: 64 / 51,
      unit: '%',
    })
    setImage(null)
    console.log('Image!!!!:', image)
    setCompletedCrop(null)
    history.push(`/dashboard/products/edit/${location.pathname.split('/')[4]}`)
  }

  const uploadFileHandler = (e) => {
    setImageType(e.type)
    setNoImage(false)

    const reader = new FileReader()

    reader.addEventListener('load', () => setImage(reader.result))
    reader.readAsDataURL(e)
  }

  const imgRef = useRef(null)
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const crop = completedCrop

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const pixelRatio = 4

    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'
    ctx.imageSmoothingEnabled = false

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )
  }, [completedCrop])

  window.addEventListener('resize', () => {
    if (imgRef) {
      const cont = document.querySelector('.ReactCrop')
      const contDiv = document.querySelector('.ReactCrop div')
      const motionCont = document.querySelector('.motionCont')

      if (motionCont) motionCont.style.width = 'max-content'

      if (contDiv) {
        contDiv.style.height = `100%`
      }
      if (cont && imgRef.current) {
        cont.style.width = '100%'
        cont.style.width = `${imgRef.current.width}px`
        cont.style.height = `100%`
      }
    }
  })

  const confirmHandler = (e) => {
    if (imageType && previewCanvasRef.current && completedCrop.width) {
      previewCanvasRef.current.toBlob(async (blob) => {
        const type = () => {
          switch (imageType) {
            case 'image/png':
              return 'png'
            case 'image/jpg':
              return 'jpg'
            case 'image/jpeg':
              return 'jpeg'
          }
        }
        formData.delete('upload')
        formData.append('upload', blob, `image.${type()}`)
      })
    } else if (noImage && !imageType) {
      setImage(null)
      setNoImage(false)
    }
    if (!e.target.classList.contains('disabled')) {
      history.push(
        `/dashboard/products/edit/${location.pathname.split('/')[4]}`
      )
    }
  }

  return (
    <>
      <StyledCart
        scrolled={scrolled}
        variants={show}
        animate='show'
        initial='hidden'
        exit='exit'
        transformTemplate={({ x }) => `translateX(${x})`}
      >
        <AnimatePresence>
          {image && (
            <motion.div
              variants={popup3}
              animate='show'
              initial='hidden'
              className='motionCont'
            >
              <ReactCrop
                onImageLoaded={(img) => {
                  imgRef.current = img
                  const image = document.querySelector('.ReactCrop div img')
                  const cont = document.querySelector('.ReactCrop')
                  const contDiv = document.querySelector('.ReactCrop div')
                  const motionCont = document.querySelector('.motionCont')
                  motionCont.style.width = 'max-content'

                  image.style.height = '100%'
                  cont.style.width = `${image.width}px`
                  cont.style.height = `max-content`
                  contDiv.style.height = `max-content`

                  setCrop({ width: image.width, height: image.height })
                }}
                src={image}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!image && (
          <DropZone
            accept={'.jpg, .jpeg, .png'}
            className='dropOrSelect'
            onDrop={(file) => uploadFileHandler(file)}
          >
            {({ over, overDocument }) => (
              <div className={`dropOrSelect ${over ? 'active' : ''}`}>
                <Add />
                {!over && !overDocument && (
                  <p>
                    Select or Drag your
                    <br /> image here
                  </p>
                )}
                {overDocument && !over && (
                  <p>
                    Drop your image
                    <br /> here
                  </p>
                )}
                {over && (
                  <p>
                    Yep over here,
                    <br /> Drop now
                  </p>
                )}
              </div>
            )}
          </DropZone>
        )}

        <div className={`buttons ${image ? 'activeCrop' : ''}`}>
          {productImg !== 'https://sickmarket.ml//uploads/no.jpg' && !noImage && (
            <SmallX
              onClick={() => {
                setNoImage(true)
                formData.append('image', 'no')
                setCrop({
                  aspect: 64 / 51,
                  unit: '%',
                })
                setImage(null)
                setImageType(null)
                setCompletedCrop(null)
                history.push(
                  `/dashboard/products/edit/${location.pathname.split('/')[4]}`
                )
              }}
              className='deleteIcon'
            />
          )}
          <button onClick={cancelHandler} className='cancel'>
            {image ? 'Previous Img' : 'Cancel'}
          </button>
          <button
            onClick={confirmHandler}
            className={`confirm ${noImage ? 'previousImage' : ''} ${
              completedCrop && !completedCrop.width ? 'disabled' : ''
            }`}
            id={`${completedCrop ? '' : 'notActive'}`}
          >
            {noImage ? 'Previous Img' : 'Confirm'}
          </button>
        </div>
      </StyledCart>
    </>
  )
}

const StyledCart = styled(motion.div)`
  z-index: 2;

  .disabled {
    transition: 0.3s ease;
    filter: grayscale(1);
    cursor: not-allowed !important;
    &:hover {
      background: #1faf73 !important;
    }
  }
  .previousImage {
    pointer-events: all !important;
    opacity: 1 !important;
  }
  #notActive {
    pointer-events: none;
    opacity: 0;
  }
  .motionCont {
    padding-top: calc(2rem + 1vh);
    max-height: 80%;
    max-width: 90%;
  }
  .ReactCrop {
    height: 100%;
  }
  .ReactCrop div img {
    max-height: 100%;
  }
  .ReactCrop div:first-child {
    height: 100%;
  }
  position: absolute;
  left: 0;
  top: ${(props) => props.scrolled}px;
  height: 100%;
  width: 50%;
  background: #2c2d50;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  button {
    border: none;
    background: none;
    outline: none;
  }
  .activeCrop {
    margin-bottom: 1.5rem;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    position: relative;
    svg {
      position: absolute;
      left: 0%;
      top: 50%;
      transform: translate(-150%, -50%);
      width: 35.5px;
      height: 35.5px;
      padding-right: 0.65rem;
      cursor: pointer;
      opacity: 1;
      transition: 0.2s ease;
      &:hover {
        opacity: 0.8;
      }
    }
    button {
      color: white;
      padding: 0.65rem 1.1rem;
      border-radius: 10px;
      cursor: pointer;
      font-size: calc(0.75rem + 0.3vw);
      transition: 0.2s ease;
    }
    .cancel {
      box-shadow: inset 0px 0px 0px 2px white;
      &:hover {
        opacity: 0.6;
      }
    }
    .confirm {
      margin-left: calc(0.7rem + 2vw);
      font-weight: 500;
      background: #1faf73;
      &:hover {
        background: #1c9c67;
      }
    }
  }
  .dropOrSelect {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #3d3e6e;
    width: 80%;
    height: calc(15vh + 16rem);
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s ease;
    svg {
      width: 45px;
      height: 45px;
      pointer-events: none;
    }
    p {
      font-size: calc(0.9rem + 0.3vw);
      text-align: center;
      margin-top: 0.7rem;
      color: rgba(255, 255, 255, 90%) !important;
      pointer-events: none;
    }
    &.active {
      background: #44457a;
    }
  }
`

export default EditCropImg
