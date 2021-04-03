import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { parseISO, format } from "date-fns"
import { useLastLocation } from "react-router-last-location"
import { motion, AnimatePresence } from "framer-motion"
import { popup2 } from "../animations"
import Loader from "../components/loader"
import { Scrollbars } from "react-custom-scrollbars"
import Input from "../components/DashboardInput"
import Product from "../components/Product"
import editProduct from "../actions/editProduct"
import DashboardError from "../components/DashboardError"
import EditCropImg from "../components/EditCropImg"
import { DashboardProductDetailAction } from "../actions/products"

const DashboardEditProduct = () => {
  const lastLocation = useLastLocation()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { dashboardProduct } = useSelector((state) => state.product)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const firstChild = document.querySelector(
      ".card-big-large-scrollable-content div:first-child"
    )

    if (firstChild) {
      firstChild.classList.add("addMoreMargin2")
      setLoaded(false)
    }
  }, [location.pathname, loaded])

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [brand, setBrand] = useState("")
  const [stock, setStock] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [qtyPerUser, setQtyPerUser] = useState("")

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

    dispatch(editProduct(formData))
  }
  const { editLoading, error, editSuccess } = useSelector(
    (state) => state.product
  )

  useEffect(() => {
    if (error) {
      const firstChild = document.querySelector(
        ".card-large-scrollable-content div:first-child"
      )
      if (firstChild) {
        firstChild.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }
    }
  }, [error])

  useEffect(() => {
    if (editSuccess) {
      setName("")
      setPrice("")
      setBrand("")
      setStock("")
      setCategory("")
      setDescription("")
      setQtyPerUser("")
      setImageType(null)
      setNoImage(false)
      setFormData(new FormData())
      setCrop({
        aspect: 64 / 51,
        unit: "%",
        width: "80",
      })
      setCompletedCrop(null)
      setAddedImage(null)

      history.push("/dashboard/products")
    }
  }, [editSuccess])

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
    }
  }, [dashboardProduct])

  //Crop
  const [completedCrop, setCompletedCrop] = useState(null)
  const previewCanvasRef = useRef(null)
  const [crop, setCrop] = useState({
    aspect: 64 / 51,
    unit: "%",
    width: "80",
  })
  const [image, setImage] = useState("/uploads/no.jpg")
  const [noImage, setNoImage] = useState(false)
  const [addedImage, setAddedImage] = useState(null)
  const [imageType, setImageType] = useState(null)

  useEffect(() => {
    if (
      location.pathname.split("/")[4] &&
      location.pathname.split("/")[3] === "edit" &&
      location.pathname.split("/")[5] !== "image"
    )
      dispatch(DashboardProductDetailAction(location.pathname.split("/")[4]))
  }, [location.pathname])

  const editProductHandler = (e) => {
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
    const id = location.pathname.split("/")[4]
    dispatch(editProduct(id, formData, dataObj))
  }
  return (
    <StyledUserAction
      id={`${location.pathname.split("/")[3] === "edit" ? "active" : ""}`}
      className='cardCont'
      onClick={(e) => {
        if (
          e.target.classList.contains("cardCont") &&
          (location.pathname.split("/")[5] !== "image" || !addedImage)
        ) {
          setCrop({
            aspect: 64 / 51,
            unit: "%",
            width: "80",
          })
          setCompletedCrop(null)
          history.push("/dashboard/products")
        }
      }}
    >
      <AnimatePresence>
        {location.pathname.split("/")[3] === "edit" && dashboardProduct && (
          <motion.div
            variants={popup2}
            initial='hidden'
            animate='show'
            exit='exit'
            className='card'
          >
            <Scrollbars
              onLoad={() => setLoaded(true)}
              className='card-big-large-scrollable-content'
            >
              <AnimatePresence>
                {location.pathname.split("/")[5] === "image" && (
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
                  />
                )}
              </AnimatePresence>
              <motion.div className='createSection'>
                {error && <DashboardError error={error} />}
                <h1 className='title'>Edit Product</h1>
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
                <h5>Preview</h5>
                <Product
                  noImage={noImage}
                  crop={crop}
                  previewCanvasRef={previewCanvasRef}
                  completedCrop={completedCrop}
                  setCompletedCrop={setCompletedCrop}
                  type='preview'
                  providedClassName='productPreview'
                  data={{
                    name: name.length ? name : "Test",
                    price: price !== "" ? price : 0,
                    brand: brand.length ? brand : "Test",
                    countInStock: stock,
                    category,
                    image,
                    numReviews: 0,
                  }}
                  edit={true}
                />
              </div>
            </Scrollbars>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledUserAction>
  )
}

const StyledUserAction = styled(motion.div)`
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
`

export default DashboardEditProduct
