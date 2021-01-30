import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

//Get Products - /api/products @Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.send(products)
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

export { getProducts, getProduct }
