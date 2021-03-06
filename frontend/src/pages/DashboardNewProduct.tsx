import React, { useState, useEffect, useRef, FC } from 'react'
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
import { ReactComponent as XSign } from '../img/smallX.svg'
import Switch from 'react-switch'
import qs from 'qs'

interface Props {
  scrolled: number
  setScrolled: any
}

const DashboardNewProduct: FC<Props> = ({ scrolled, setScrolled }) => {
  const [freeShipping, setFreeShipping] = useState(false)
  const lastLocation = useLastLocation()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const searches = qs.parse(location.search, { ignoreQueryPrefix: true })

  const [scrollableContent, setScrollableContent] = useState<any>(null)

  useEffect(() => {
    const firstChild = document.querySelector('.newView') as HTMLDivElement
    const thirdChild = document.querySelectorAll<any>('.track-vertical-newView')

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
  const [oldPrice, setOldPrice] = useState('')
  const [brand, setBrand] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [qtyPerUser, setQtyPerUser] = useState('')

  const [formData, setFormData] = useState(new FormData())

  const addProductHandler = (e: any) => {
    e.preventDefault()
    const dataObj: any = {
      name,
      price,
      brand,
      countInStock: stock,
      category,
      description,
      qtyPerUser,
      freeShipping,
      oldPrice,
    }
    for (const e in dataObj) {
      formData.append(e, dataObj[e])
    }

    dispatch(addNewProductAction(formData))
  }
  const { newLoading, newError, success } = useSelector(
    (state: any) => state.productList
  )

  useEffect(() => {
    if (newError) {
      const firstChild = document.querySelector('.newView')
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
      setOldPrice('')
      setFreeShipping(false)

      let baseURL = '/dashboard/products?'
      if (searches[Object.keys(searches)[0]]) {
        baseURL += `${Object.keys(searches)[0]}=${
          searches[Object.keys(searches)[0]]
        }&`
      }
      if (searches.brand) {
        baseURL += `brand=${searches.brand}&`
      }
      if (searches.category) {
        baseURL += `category=${searches.category}&`
      }

      history.push(baseURL)
    }
  }, [success])

  //Crop
  const [completedCrop, setCompletedCrop] = useState(null)
  const previewCanvasRef = useRef(null)
  const [crop, setCrop] = useState({
    aspect: 64 / 51,
    unit: '%',
  })
  const [image, setImage] = useState(null)
  const [imageType, setImageType] = useState(null)

  const returnHandler = () => {
    setFormData(new FormData())
    setCrop({
      aspect: 64 / 51,
      unit: '%',
    })
    setCompletedCrop(null)
    setImage(null)

    let baseURL = '/dashboard/products?'
    if (searches[Object.keys(searches)[0]]) {
      baseURL += `${Object.keys(searches)[0]}=${
        searches[Object.keys(searches)[0]]
      }&`
    }
    if (searches.brand) {
      baseURL += `brand=${searches.brand}&`
    }
    if (searches.category) {
      baseURL += `category=${searches.category}&`
    }

    history.push(baseURL)
  }
  return (
    <StyledUserAction
      id={`${location.pathname.split('/')[3] === 'add' ? 'active' : ''}`}
      className='cardCont'
      onClick={(e: any) => {
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
            <motion.div
              variants={hide5}
              onClick={returnHandler}
              className='CloseModel'
              initial='hidden'
              animate='show'
              exit='exit'
            >
              <XSign />
            </motion.div>

            <motion.div
              variants={popup2}
              initial='hidden'
              animate='show'
              exit='exit'
              className='card'
            >
              <Scrollbars
                renderTrackHorizontal={(props: any) => (
                  <div {...props} className='track-horizontal-newView' />
                )}
                renderTrackVertical={(props: any) => (
                  <div {...props} className='track-vertical-newView' />
                )}
                renderThumbHorizontal={(props: any) => (
                  <div {...props} className='thumb-horizontal-newView' />
                )}
                renderThumbVertical={(props: any) => (
                  <div {...props} className='thumb-vertical-newView' />
                )}
                renderView={(props: any) => (
                  <div {...props} className='newView' />
                )}
                className='card-large-scrollable-content'
              >
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
                    <Input
                      label='Old Price'
                      value={oldPrice}
                      setValue={setOldPrice}
                      type='number'
                      required={false}
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
                    <div className='switchCont'>
                      <p>Free Shipping</p>
                      <Switch
                        offColor='#FF6969'
                        onColor='#24CA84'
                        checked={freeShipping}
                        onChange={(e) => {
                          setFreeShipping(e)
                        }}
                      />
                    </div>
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
                    previewCanvasRef={previewCanvasRef}
                    completedCrop={completedCrop}
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
                      oldPrice,
                      freeShipping,
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
  .switchCont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    p {
      font-size: calc(1rem + 0.3vw);
      color: rgba(255, 255, 255, 0.8) !important;
      margin-bottom: 0.25rem;
    }
  }
  .react-switch-bg div svg {
    display: none !important;
  }
  .newView {
    height: 100% !important;
    overflow: auto !important;
    position: absolute;
    inset: 0px;
    margin-bottom: -20px !important;
    margin-right: -8px !important;
    display: grid;
    place-items: center;
    padding: calc(2.4rem + 1vw);
    padding-bottom: 0rem;
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
  }
  .thumb-horizontal-newView {
    position: relative;
    display: block;
    height: 100%;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.2);
    width: 0px;
  }
  .track-horizontal-newView {
    position: absolute;
    height: 6px;
    right: 2px;
    bottom: 2px;
    left: 2px;
    border-radius: 3px;
  }

  .track-vertical-newView {
    position: absolute;
    width: 6px;
    right: 2px;
    bottom: 2px;
    top: 2px;
    border-radius: 3px;
  }
  .thumb-vertical-newView {
    position: relative;
    display: block;
    width: 100%;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.2);
    height: 135px;
    transform: translateY(0px);
  }
  .CloseModel {
    position: absolute;
    right: 3%;
    top: 4%;
    opacity: 0.7;
    transition: 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 22px;
      height: 22px;
    }
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
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: #505295;
    }
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
