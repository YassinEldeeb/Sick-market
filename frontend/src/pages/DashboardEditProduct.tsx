import React, { useState, useEffect, useRef, FC } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { parseISO, format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import { popup2, popupLeft, hide5 } from '../animations'
import Loader from '../components/loader'
import { Scrollbars } from 'react-custom-scrollbars'
import Input from '../components/DashboardInput'
import Product from '../components/Product'
import editProduct from '../actions/editProduct'
import DashboardError from '../components/DashboardError'
import EditCropImg from '../components/EditCropImg'
import { DashboardProductDetailAction } from '../actions/products'
import { object, throttle } from 'underscore'
import { ReactComponent as Info } from '../img/info.svg'
import { ReactComponent as XSign } from '../img/smallX.svg'

import qs from 'qs'
import Switch from 'react-switch'
import { useLastLocation } from 'react-router-last-location'

interface Props {
  scrolled: number
  setScrolled: any
}

const DashboardEditProduct: FC<Props> = ({ scrolled, setScrolled }) => {
  const lastLocation = useLastLocation()
  const [freeShipping, setFreeShipping] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const searches = qs.parse(location.search, { ignoreQueryPrefix: true })
  const history = useHistory()
  const { dashboardProduct, error: editError } = useSelector(
    (state: any) => state.product
  )
  const [loaded, setLoaded] = useState(false)

  const [scrollableContent, setScrollableContent] = useState<any>(null)

  useEffect(() => {
    const firstChild = document.querySelector('.editView') as HTMLDivElement
    const scrollbarThumb = document.querySelector(
      '.track-vertical-editView'
    ) as HTMLDivElement
    if (firstChild) {
      setScrollableContent(firstChild)
      if (
        location.pathname.split('/')[3] === 'edit' &&
        location.pathname.split('/')[5] === 'image'
      ) {
        firstChild.classList.add('disableScrolling')
      } else {
        firstChild.classList.remove('disableScrolling')
      }
      setLoaded(false)
    }
    if (
      scrollbarThumb &&
      location.pathname.split('/')[3] === 'edit' &&
      location.pathname.split('/')[5] === 'image'
    ) {
      scrollbarThumb.style.display = 'none'
    } else if (scrollbarThumb) {
      scrollbarThumb.style.display = 'block'
    }
  }, [location.pathname, loaded])

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

  const { editLoading, error, editSuccess } = useSelector(
    (state: any) => state.product
  )
  const { products: searchedProducts } = useSelector(
    (state: any) => state.productSearch
  )

  useEffect(() => {
    if (editError) {
      const firstChild = document.querySelector(
        '.card-large-scrollable-content div:first-child'
      )
      if (firstChild) {
        firstChild.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }
    }
  }, [editError])

  useEffect(() => {
    if (editSuccess) {
      setName('')
      setPrice('')
      setOldPrice('')
      setFreeShipping(false)
      setBrand('')
      setStock('')
      setCategory('')
      setDescription('')
      setQtyPerUser('')
      setImageType(null)
      setNoImage(false)
      setFormData(new FormData())
      setCrop({
        aspect: 64 / 51,
        unit: '%',
      })
      setCompletedCrop(null)
      setAddedImage(null)

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

      history.push(
        searches.search && searchedProducts
          ? `/dashboard/products?search=${searches.search}`
          : lastLocation
          ? baseURL
          : '/dashboard/products'
      )
    }
  }, [editSuccess])
  useEffect(() => {
    if (location.pathname.split('/')[3] !== 'edit') {
      if (dashboardProduct) {
        setName(dashboardProduct.name)
        setPrice(dashboardProduct.price)
        setBrand(dashboardProduct.brand)
        setStock(dashboardProduct.countInStock)
        setCategory(dashboardProduct.category)
        setDescription(dashboardProduct.description)
        setQtyPerUser(dashboardProduct.qtyPerUser)
        setImage(dashboardProduct.image)
        setOldPrice(dashboardProduct.oldPrice ? dashboardProduct.oldPrice : '')
        setFreeShipping(
          dashboardProduct.freeShipping ? dashboardProduct.freeShipping : ''
        )
      }
    }
  }, [location.pathname])

  useEffect(() => {
    if (dashboardProduct) {
      setName(dashboardProduct.name)
      setPrice(dashboardProduct.price)
      setBrand(dashboardProduct.brand)
      setStock(dashboardProduct.countInStock)
      setCategory(dashboardProduct.category)
      setDescription(dashboardProduct.description)
      setQtyPerUser(dashboardProduct.qtyPerUser)
      setImage(dashboardProduct.image)
      setOldPrice(dashboardProduct.oldPrice ? dashboardProduct.oldPrice : '')
      setFreeShipping(
        dashboardProduct.freeShipping ? dashboardProduct.freeShipping : ''
      )
    }
  }, [dashboardProduct])

  //Crop
  const [completedCrop, setCompletedCrop] = useState(null)
  const previewCanvasRef = useRef(null)
  const [crop, setCrop] = useState({
    aspect: 64 / 51,
    unit: '%',
  })
  const [image, setImage] = useState('/uploads/no.jpg')
  const [noImage, setNoImage] = useState(false)
  const [addedImage, setAddedImage] = useState(null)
  const [imageType, setImageType] = useState(null)

  const [openInfo, setOpenInfo] = useState(false)

  useEffect(() => {
    setOpenInfo(false)
    if (
      (location.pathname.split('/')[3] === 'edit' && !dashboardProduct) ||
      (location.pathname.split('/')[3] === 'edit' &&
        dashboardProduct &&
        location.pathname.split('/')[4] &&
        dashboardProduct._id !== location.pathname.split('/')[4])
    ) {
      dispatch(
        DashboardProductDetailAction(
          location.pathname.split('/')[4],
          searches.search
        )
      )
    }
  }, [location.pathname])

  const editProductHandler = (e: any) => {
    e.preventDefault()
    const dataObj: any = {
      name,
      price,
      brand,
      countInStock: stock,
      category,
      description,
      qtyPerUser,
      oldPrice,
      freeShipping,
    }

    for (const e in dataObj) {
      if (typeof dataObj === 'object') formData.append(e, dataObj[e])
    }
    const id = location.pathname.split('/')[4]
    dispatch(editProduct(id, formData, searches.search))
  }

  const returnHandler = () => {
    setFormData(new FormData())
    setCrop({
      aspect: 64 / 51,
      unit: '%',
    })
    setCompletedCrop(null)
    setAddedImage(null)
    setImageType(null)
    setNoImage(false)
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

    history.push(
      searches.search && searchedProducts
        ? `/dashboard/products?search=${searches.search}`
        : lastLocation
        ? baseURL
        : '/dashboard/products'
    )
  }
  return (
    <StyledUserAction
      id={`${location.pathname.split('/')[3] === 'edit' ? 'active' : ''}`}
      className='cardCont'
      onClick={(e: any) => {
        if (
          e.target.classList.contains('cardCont') &&
          (location.pathname.split('/')[5] !== 'image' || !addedImage)
        )
          returnHandler()
      }}
    >
      <AnimatePresence>
        {location.pathname.split('/')[3] === 'edit' && error && (
          <DashboardError error={error} />
        )}
        {location.pathname.split('/')[3] === 'edit' && dashboardProduct && (
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
                  <div {...props} className='track-horizontal-editView' />
                )}
                renderTrackVertical={(props: any) => (
                  <div {...props} className='track-vertical-editView' />
                )}
                renderThumbHorizontal={(props: any) => (
                  <div {...props} className='thumb-horizontal-editView' />
                )}
                renderThumbVertical={(props: any) => (
                  <div {...props} className='thumb-vertical-editView' />
                )}
                renderView={(props: any) => (
                  <div {...props} className='editView' />
                )}
                onLoad={() => setLoaded(true)}
                className='card-big-large-scrollable-content'
              >
                <AnimatePresence>
                  {location.pathname.split('/')[5] === 'image' && (
                    <EditCropImg
                      noImage={noImage}
                      setNoImage={setNoImage}
                      previewCanvasRef={previewCanvasRef}
                      completedCrop={completedCrop}
                      setCompletedCrop={setCompletedCrop}
                      crop={crop}
                      setCrop={setCrop}
                      image={addedImage}
                      setImage={setAddedImage}
                      imageType={imageType}
                      setImageType={setImageType}
                      formData={formData}
                      setFormData={setFormData}
                      productImg={image}
                      scrolled={scrolled}
                    />
                  )}
                </AnimatePresence>
                <motion.div className='createSection'>
                  {error && <DashboardError error={error} />}

                  <h1 className='title'>Edit Product</h1>

                  <form onSubmit={(e) => editProductHandler(e)}>
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
                      <motion.button
                        onClick={(e) => editProductHandler(e)}
                        className='create'
                        type='submit'
                      >
                        Edit Product{editLoading && <Loader />}
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
                <div className='preview'>
                  <div className='cardTitle'>
                    <h5>Preview</h5>
                    <div className='info'>
                      <Info
                        onClick={() => setOpenInfo(!openInfo)}
                        className={`${openInfo ? 'active' : ''}`}
                      />

                      <AnimatePresence>
                        {openInfo && (
                          <motion.div
                            initial='hidden'
                            animate='show'
                            exit='exit'
                            variants={popupLeft}
                            className='data'
                          >
                            <motion.ul>
                              <motion.li layout>
                                Stock value:{' '}
                                {(
                                  dashboardProduct.countInStock *
                                  dashboardProduct.price
                                ).toFixed(2)}{' '}
                                <span className='currency'>EGP</span>
                              </motion.li>
                              <motion.li layout>
                                Product Created by:
                                <Link
                                  to={`/dashboard/employees/admins/${dashboardProduct.user._id}`}
                                  className='links'
                                >
                                  {dashboardProduct.user.name}
                                </Link>
                              </motion.li>
                              <motion.li layout>
                                Sold Stocks:
                                <p className='links'>
                                  {dashboardProduct.paidStock}
                                </p>
                              </motion.li>
                              <motion.li layout>
                                Paid Amount:
                                <p className='links'>
                                  {dashboardProduct.paidAmount}
                                </p>
                              </motion.li>
                              <motion.li layout>
                                Created at:{' '}
                                {format(
                                  parseISO(dashboardProduct.createdAt),
                                  'yyyy-MM-dd / hh:mm a'
                                )}
                              </motion.li>
                              {dashboardProduct.lastUpdated && (
                                <motion.li layout>
                                  Last updated:{' '}
                                  {format(
                                    parseISO(dashboardProduct.lastUpdated),
                                    'yyyy-MM-dd / hh:mm a'
                                  )}
                                </motion.li>
                              )}
                            </motion.ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <Product
                    noImage={noImage}
                    previewCanvasRef={previewCanvasRef}
                    completedCrop={completedCrop}
                    type='preview'
                    providedClassName='productPreview'
                    data={{
                      name: name.length ? name : 'Test',
                      price: price !== '' ? price : 0,
                      brand: brand.length ? brand : 'Test',
                      countInStock: stock,
                      category,
                      image,
                      numReviews: 0,
                      oldPrice,
                      freeShipping,
                      _id: dashboardProduct._id,
                    }}
                    edit={true}
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
  .editView {
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
  .thumb-horizontal-editView {
    position: relative;
    display: block;
    height: 100%;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.2);
    width: 0px;
  }
  .track-horizontal-editView {
    position: absolute;
    height: 6px;
    right: 2px;
    bottom: 2px;
    left: 2px;
    border-radius: 3px;
  }

  .track-vertical-editView {
    position: absolute;
    width: 6px;
    right: 2px;
    bottom: 2px;
    top: 2px;
    border-radius: 3px;
  }
  .thumb-vertical-editView {
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
  .links {
    margin-left: 0.3rem;
    &:hover {
      text-decoration: underline;
    }
  }
  .currency {
    display: inline-block;
    font-size: calc(0.25rem + 0.4vw);
    height: max-content;
    transform: translate(-11%, -7%);
  }
  ul li:first-child {
    position: relative;
  }
  .cardTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .data {
    background: #45467f;
    border-radius: 10px;
    z-index: 5;
    position: absolute;
    left: -5%;
    top: 50%;
    transform: translate(-105%, -50%);
    cursor: auto;
    box-shadow: rgba(29, 32, 62, 0.42) 0px 2px 10px;
    &::after {
      content: '';
      width: 0;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(100%, -50%);
      height: 0;
      border-top: 8px solid transparent;
      border-left: 14px solid #45467f;
      border-bottom: 8px solid transparent;
    }
    ul {
      padding: 0.8rem 1.1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      list-style-position: inside;
      li {
        width: max-content;
        padding-bottom: 0.2rem;
        font-size: 0.95rem;
        &:last-child {
          padding-bottom: 0rem;
        }
      }
    }
  }
  .info {
    width: 33px;
    height: 33px;
    cursor: pointer;
    transition: 0.2s ease;
    display: flex;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      filter: brightness(1.1);
      border-radius: 50%;

      &.active {
        filter: brightness(1);
        box-shadow: rgba(29, 32, 62, 0.21) 0px 2px 10px;
      }
      &:hover {
        filter: brightness(1);
      }
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
      pointer-events: none;
    }
  }
  .productPreview {
    width: calc(200px + 5vw);
    height: max-content;
    z-index: -1;
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
  .card-big-large-scrollable-content {
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

export default DashboardEditProduct
