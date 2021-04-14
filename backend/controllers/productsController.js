import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import fs from 'fs'
import path, { join } from 'path'
import multer from 'multer'
import sharp from 'sharp'

const __dirname = path.resolve()

//Get Products - /api/products @Public
const getProducts = asyncHandler(async (req, res) => {
  let sort = {}
  if (req.query.createdAt) {
    sort = { createdAt: req.query.createdAt === 'newest' ? -1 : 1 }
  } else if (req.query.price) {
    sort = {
      price: req.query.price === 'highest' ? -1 : 1,
    }
  } else if (req.query.topRated) {
    sort = {
      rating: req.query.topRated === 'highest' ? -1 : 1,
    }
  } else if (req.query.topSelling) {
    sort = {
      paidAmount: req.query.topSelling === 'highest' ? -1 : 1,
    }
  } else if (req.query.topSoldStocks) {
    sort = {
      paidStock: req.query.topSoldStocks === 'highest' ? -1 : 1,
    }
  } else if (req.query.stock) {
    sort = {
      countInStock: req.query.stock === 'highest' ? -1 : 1,
    }
  }

  let findObj = {}
  if (req.query.brand) {
    const regex = new RegExp(req.query.brand, 'i')
    findObj = { brand: regex }
  }
  if (req.query.category) findObj.category = req.query.category

  const products = await Product.find(findObj)
    .sort(sort)
    .populate('user', 'name')
  const productsCount = await Product.countDocuments({})

  res.send({ products, count: productsCount })
})

//Get Product - /api/products/:id @Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('user', 'name')
  if (product) {
    res.send(product)
  } else {
    res.status(404)
    throw new Error('Product not Found!')
  }
})

//Delete Product - /api/products/:id @Protected @Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    if (
      product.image !== '/uploads/no.jpg' &&
      fs.existsSync(join(__dirname, product.image)) &&
      fs.existsSync(join(__dirname, product.tinyImage))
    ) {
      fs.unlinkSync(join(__dirname, product.image))
      fs.unlinkSync(join(__dirname, product.tinyImage))
      console.log('Image is Removed')
    }

    await product.remove()

    res.send({ msg: 'Product is Deleted.' })
  } else {
    res.status(404)
    throw new Error('Product not Found!')
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
      return cb(new Error('Please provide an image'))
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
      'name, brand, category, description, price, countInStock and qtyPerUser are Required'
    )
  }

  let image
  let tinyImage
  if (req.file) {
    fs.access('uploads/', (err) => {
      if (err) {
        fs.mkdirSync('uploads/')
      }
    })

    const fileName =
      req.file.fieldname +
      '-' +
      Date.now() +
      path.extname(req.file.originalname).toLowerCase()

    image = `/uploads/${fileName}`
    tinyImage = `/uploads/Tiny-${fileName}`
    await sharp(req.file.buffer)
      .resize({ width: 640, height: 510 })
      .toFile('uploads/' + fileName)
    await sharp(req.file.buffer)
      .resize({ width: 30, height: 24 })
      .toFile('uploads/' + `Tiny-${fileName}`)
  } else {
    image = '/uploads/no.jpg'
    tinyImage = '/uploads/tinyNo.jpg'
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
    tinyImage,
  })
  await newProduct.save()
  const newPopulatedProduct = await Product.findOne(newProduct._id).populate(
    'user',
    'name'
  )
  res.status(201).send(newPopulatedProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    throw new Error('Product not Found')
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
  let tinyImage
  if (req.file) {
    fs.access('uploads/', (err) => {
      if (err) {
        fs.mkdirSync('uploads/')
      }
    })

    const fileName =
      req.file.fieldname +
      '-' +
      Date.now() +
      path.extname(req.file.originalname).toLowerCase()

    finalImage = `/uploads/${fileName}`
    tinyImage = `/uploads/Tiny-${fileName}`
    if (
      product.image !== '/uploads/no.jpg' &&
      fs.existsSync(join(__dirname, product.image))
    ) {
      fs.unlinkSync(join(__dirname, product.image))
      fs.unlinkSync(join(__dirname, product.tinyImage))
      console.log('Image is Removed')
    }
    await sharp(req.file.buffer)
      .resize({ width: 640, height: 510 })
      .toFile('uploads/' + fileName)
    await sharp(req.file.buffer)
      .resize({ width: 30, height: 24 })
      .toFile('uploads/' + `Tiny-${fileName}`)
  } else {
    finalImage = product.image
    finalImage = product.tinyImage
  }
  if (image === 'no') {
    if (
      product.image !== '/uploads/no.jpg' &&
      fs.existsSync(join(__dirname, product.image))
    ) {
      fs.unlinkSync(join(__dirname, product.image))
      fs.unlinkSync(join(__dirname, product.tinyImage))
      console.log('Image is Removed')
      finalImage = '/uploads/no.jpg'
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
  product.tinyImage = tinyImage

  product.lastUpdated = new Date()

  await product.save()

  res.send(product)
})

const searchProductsSuggesstions = asyncHandler(async (req, res) => {
  const regex = new RegExp(`^(${req.query.search}).+$`, 'i')
  const products = await Product.find({ name: regex }, { name: 1 })
    .sort({
      updated_at: -1,
    })
    .sort({ created_at: -1 })
    .limit(10)
  res.send(products)
})

const searchProducts = asyncHandler(async (req, res) => {
  const regex = new RegExp(`^${req.query.find}`, 'i')
  const products = await Product.find({ name: regex })
    .sort({
      updated_at: -1,
    })
    .sort({ created_at: -1 })
    .limit(10)
  res.send({ products, count: products.length })
})

export {
  getProducts,
  getProduct,
  deleteProduct,
  addProduct,
  updateProduct,
  upload,
  searchProductsSuggesstions,
  searchProducts,
}
