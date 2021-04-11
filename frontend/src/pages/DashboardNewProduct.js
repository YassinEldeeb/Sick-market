import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import { motion, AnimatePresence } from 'framer-motion'
import { popup2, hide5 } from '../animations'
import Loader from '../components/loader'
import { Scrollbars } from 'react-custom-scrollbars'
import Input from '../components/DashboardInput'
import Product from '../components/Product'
import { addNewProductAction } from '../actions/addProduct'
import DashboardError from '../components/DashboardError'
import CropImg from '../components/CropImg'
import { throttle } from 'underscore'
import xSign from '../img/smallX.svg'

const DashboardNewProduct = ({ scrolled, setScrolled }) => {
  const lastLocation = useLastLocation()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const [scrollableContent, setScrollableContent] = useState(null)

  useEffect(() => {
    const firstChild = document.querySelector(
      '.card-large-scrollable-content div:first-child'
    )
    const thirdChild = document.querySelectorAll(
      '.card-large-scrollable-content div:last-child'
    )

    if (firstChild) {
      if (
        location.pathname.split('/')[3] === 'add' &&
        location.pathname.split('/')[4] === 'image'
      ) {
        firstChild.classList.add('disableScrolling')
      } else {
        firstChild.classList.remove('disableScrolling')
      }
      if (firstChild) setScrollableContent(firstChild)
      firstChild.classList.add('addMoreMargin2')
    }
    if (
      thirdChild[thirdChild.length - 2] &&
      location.pathname.split('/')[3] === 'add' &&
      location.pathname.split('/')[4] === 'image'
    ) {
      thirdChild[thirdChild.length - 2].style.display = 'none'
    } else if (thirdChild[thirdChild.length - 2]) {
      thirdChild[thirdChild.length - 2].style.display = 'block'
    }
  }, [location.pathname, lastLocation])

  useEffect(() => {
    if (scrollableContent) {
      scrollableContent.addEventListener(
        'scroll',
        throttle(() => {
          setScrolled(scrollableContent.scrollTop)
        }, 100)
      )
    }
  }, [scrollableContent])

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [brand, setBrand] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [qtyPerUser, setQtyPerUser] = useState('')

  const [formData, setFormData] = useState(new FormData())

  const addProductHandler = (e) => {
    e.preventDefault()
    const dataObj = {
      name,
      price,
      brand,
      countInStock: stock,
      category,
      description,
      qtyPerUser,
    }
    for (const e in dataObj) {
      formData.append(e, dataObj[e])
    }

    dispatch(addNewProductAction(formData))
  }
  const { newLoading, newError, success } = useSelector(
    (state) => state.productList
  )

  useEffect(() => {
    if (newError) {
      const firstChild = document.querySelector(
        '.card-large-scrollable-content div:first-child'
      )
      if (firstChild)
        firstChild.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
    }
  }, [newError])

  useEffect(() => {
    if (success) {
      setName('')
      setPrice('')
      setBrand('')
      setStock('')
      setCategory('')
      setDescription('')
      setQtyPerUser('')
      setFormData(new FormData())
      setCompletedCrop(null)
      setImageType(null)
      setImage(null)

      history.push('/dashboard/products')
    }
  }, [success])

  //Crop
  const [completedCrop, setCompletedCrop] = useState(null)
  const previewCanvasRef = useRef(null)
  const [crop, setCrop] = useState({
    aspect: 64 / 51,
    unit: '%',
    width: '80',
  })
  const [image, setImage] = useState(null)
  const [imageType, setImageType] = useState(null)

  const returnHandler = () => {
    setCrop({
      aspect: 64 / 51,
      unit: '%',
      width: '80',
    })
    setCompletedCrop(null)
    setImage(null)
    history.push('/dashboard/products')
  }
  return (
    <StyledUserAction
      id={`${location.pathname.split('/')[3] === 'add' ? 'active' : ''}`}
      className='cardCont'
      onClick={(e) => {
        if (
          e.target.classList.contains('cardCont') &&
          (location.pathname.split('/')[4] !== 'image' || !image)
        ) {
          returnHandler()
        }
      }}
    >
      <AnimatePresence>
        {location.pathname.split('/')[3] === 'add' && (
          <>
            <motion.img
              variants={hide5}
              onClick={returnHandler}
              className='CloseModel'
              src={xSign}
              initial='hidden'
              animate='show'
              exit='exit'
            />

            <motion.div
              variants={popup2}
              initial='hidden'
              animate='show'
              exit='exit'
              className='card'
            >
              <Scrollbars className='card-large-scrollable-content'>
                <AnimatePresence>
                  {location.pathname.split('/')[4] === 'image' && (
                    <CropImg
                      previewCanvasRef={previewCanvasRef}
                      completedCrop={completedCrop}
                      setCompletedCrop={setCompletedCrop}
                      crop={crop}
                      setCrop={setCrop}
                      image={image}
                      setImage={setImage}
                      imageType={imageType}
                      setImageType={setImageType}
                      formData={formData}
                      setFormData={setFormData}
                      scrolled={scrolled}
                    />
                  )}
                </AnimatePresence>
                <motion.div className='createSection'>
                  {newError && <DashboardError error={newError} />}
                  <h1 className='title'>New Product</h1>
                  <form onSubmit={addProductHandler}>
                    <Input label='Name' value={name} setValue={setName} />
                    <Input
                      label='Price'
                      value={price}
                      setValue={setPrice}
                      type='number'
                    />
                    <Input label='Brand' value={brand} setValue={setBrand} />
                    <Input
                      label='Stock'
                      value={stock}
                      setValue={setStock}
                      type='number'
                    />
                    <Input
                      label='Category'
                      value={category}
                      setValue={setCategory}
                    />
                    <Input
                      label='Description'
                      value={description}
                      setValue={setDescription}
                      input={false}
                    />
                    <Input
                      label='Qty per user'
                      value={qtyPerUser}
                      setValue={setQtyPerUser}
                      type='number'
                    />
                    <motion.div className='buttonCont'>
                      <motion.button className='create' type='submit'>
                        Create Product{newLoading && <Loader />}
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
                <div className='preview'>
                  <h5>Preview</h5>
                  <Product
                    crop={crop}
                    previewCanvasRef={previewCanvasRef}
                    completedCrop={completedCrop}
                    setCompletedCrop={setCompletedCrop}
                    type='preview'
                    providedClassName='productPreview'
                    data={{
                      name: name.length ? name : 'Test',
                      price: price.length ? price : 0,
                      brand: brand.length ? brand : 'Test',
                      countInStock: stock,
                      category,
                      image: '/uploads/no.jpg',
                      numReviews: 0,
                    }}
                  />
                </div>
              </Scrollbars>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </StyledUserAction>
  )
}

const StyledUserAction = styled(motion.div)`
  .CloseModel {
    position: absolute;
    right: 3%;
    top: 4%;
    width: 22px;
    height: 22px;
    opacity: 0.7;
    transition: 0.2s ease;
    &:hover {
      opacity: 0.9 !important;
    }
  }
  #loader:first-child {
    width: calc(0.65rem + 0.5vw) !important;
    height: calc(0.65rem + 0.5vw) !important;
    margin-left: 0.45rem !important;
    #greybackground path {
      stroke: white !important;
    }
  }
  .preview {
    border-radius: 10px;
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    height: max-content;
    position: fixed;
    right: 50%;
    top: 50%;
    transform: translate(142%, calc(-40% + -5vh));
    h5 {
      font-size: calc(1rem + 0.3vw);
      font-weight: 500;
      margin-bottom: 0.5rem;
      pointer-events: none;
    }
  }
  .productPreview {
    width: calc(200px + 5vw);
    height: max-content;
  }
  .buttonCont {
    display: flex;
    justify-content: flex-start;
  }
  .create {
    background: #5a5da8;
    color: white;
    padding: 0.7rem 1.2rem;
    font-size: calc(0.78rem + 0.3vw);
    border: none;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s ease;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: #505295;
    }
  }
  .addMoreMargin2 {
    margin-bottom: -20px !important;
    margin-right: -8px !important;
    display: grid;
    place-items: center;
    padding: calc(2.4rem + 1vw);
    padding-bottom: 0rem;
    height: 100%;
    border-radius: 20px;
    overflow: auto !important;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
  }

  .createSection {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
  &#active {
    background: rgba(29, 33, 62, 0.6);
    pointer-events: all;
  }
  position: absolute;
  left: 50%;
  top: 0;
  -webkit-transform: translate(-50%, 0%);
  -ms-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  cursor: pointer;
  pointer-events: none;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .card-large-scrollable-content {
    border-radius: 20px;
    .title {
      font-size: calc(2rem + 0.3vw);
      margin-bottom: 1rem;
    }
  }
  .card {
    cursor: auto;
    background: #373864;
    border-radius: 20px;
    width: calc(100% - (calc(2.5rem + 0.5vh) * 2));
    height: 82vh;
  }
  .disableScrolling {
    overflow-y: hidden !important;
  }
`

export default DashboardNewProduct
