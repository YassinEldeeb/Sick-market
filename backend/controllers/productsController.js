import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

//Get Products - /api/products @Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  const productsCount = await Product.countDocuments({})

  res.send({ products, count: productsCount })
})

//Get Product - /api/products/:id @Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404)
    throw new Error("Product not Found!")
  }
})

//Delete Product - /api/products/:id @Protected @Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.send({ msg: "Product is Deleted." })
  } else {
    res.status(404)
    throw new Error("Product not Found!")
  }
})

export { getProducts, getProduct, deleteProduct }
