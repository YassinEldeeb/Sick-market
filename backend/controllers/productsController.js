import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"
import fs from "fs"
import { fileURLToPath } from "url"
import path, { dirname, join } from "path"
import express from "express"
import multer from "multer"
import sharp from "sharp"

const __dirname = path.resolve()

//Get Products - /api/products @Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 })
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
    if (
      product.image !== "/uploads/no.jpg" &&
      fs.existsSync(join(__dirname, product.image))
    ) {
      fs.unlinkSync(join(__dirname, product.image))
      console.log("Image is Removed")
    }

    await product.remove()

    res.send({ msg: "Product is Deleted." })
  } else {
    res.status(404)
    throw new Error("Product not Found!")
  }
})

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: 20000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please provide an image"))
    }
    cb(undefined, true)
  },
})

//Add Product - /api/products @Protected @Admin
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    qtyPerUser,
  } = req.body
  if (
    !name ||
    !brand ||
    !category ||
    !description ||
    !price ||
    !countInStock ||
    !qtyPerUser
  ) {
    res.status(400)
    throw new Error(
      "name, brand, category, description, price, countInStock, qtyPerUser and Image are Required"
    )
  }

  let image
  if (req.file) {
    fs.access("uploads/", (err) => {
      if (err) {
        fs.mkdirSync("uploads/")
      }
    })

    const fileName =
      req.file.fieldname +
      "-" +
      Date.now() +
      path.extname(req.file.originalname).toLowerCase()
    image = `/uploads/${fileName}`
    await sharp(req.file.buffer)
      .resize({ width: 640, height: 510 })
      .toFile("uploads/" + fileName)
  } else {
    image = "/uploads/no.jpg"
  }
  const newProduct = new Product({
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    qtyPerUser,
    image,
    user: req.user._id,
  })
  await newProduct.save()

  res.status(201).send(newProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    throw new Error("Product not Found")
  }
  const {
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    qtyPerUser,
    image,
  } = req.body

  let finalImage
  if (req.file) {
    fs.access("uploads/", (err) => {
      if (err) {
        fs.mkdirSync("uploads/")
      }
    })

    const fileName =
      req.file.fieldname +
      "-" +
      Date.now() +
      path.extname(req.file.originalname).toLowerCase()
    finalImage = `/uploads/${fileName}`
    if (
      product.image !== "/uploads/no.jpg" &&
      fs.existsSync(join(__dirname, product.image))
    ) {
      fs.unlinkSync(join(__dirname, product.image))
      console.log("Image is Removed")
    }
    await sharp(req.file.buffer)
      .resize({ width: 640, height: 510 })
      .toFile("uploads/" + fileName)
  } else {
    finalImage = product.image
  }
  if (image === "no") {
    if (
      product.image !== "/uploads/no.jpg" &&
      fs.existsSync(join(__dirname, product.image))
    ) {
      fs.unlinkSync(join(__dirname, product.image))
      console.log("Image is Removed")
      finalImage = "/uploads/no.jpg"
    }
  }

  product.name = name ? name : product.name
  product.brand = brand ? brand : product.brand
  product.category = category ? category : product.category
  product.description = description ? description : product.description
  product.price = price ? price : product.price
  product.countInStock = countInStock ? countInStock : product.countInStock
  product.qtyPerUser = qtyPerUser ? qtyPerUser : product.qtyPerUser
  product.image = finalImage

  await product.save()

  res.send(product)
})

export {
  getProducts,
  getProduct,
  deleteProduct,
  addProduct,
  updateProduct,
  upload,
}
