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
    .limit(parseInt(req.query.limit ? req.query.limit : 0))
    .skip(parseInt(req.query.skip ? req.query.skip : 0))
  const productsCount = await Product.countDocuments(findObj)

  res.send({ products, count: productsCount })
})

const checkProducts = asyncHandler(async (req, res) => {
  const { products } = req.body
  const soldOut = []
  const removed = []
  const productsArr = []
  if (!products) {
    throw new Error('Products array must be specified')
  }

  for (let i = 0; i < products.length + 1; i++) {
    const e = products[i]
    if (e) {
      const product = await Product.findById(e)

      if (product && product.countInStock === 0) {
        soldOut.push(e)
      }
      if (product) {
        productsArr.push(product)
      }
    }
    if (i === products.length) {
      productsArr.sort((a, b) => b.countInStock - a.countInStock)

      res.send({ soldOut, removed, products: productsArr })
    }
  }
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
      fs.existsSync(join(__dirname, product.image))
    ) {
      fs.unlinkSync(join(__dirname, product.image))
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
    oldPrice,
    freeShipping,
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
    await sharp(req.file.buffer)
      .resize({ width: 640, height: 510 })
      .toFile('uploads/' + fileName)
  } else {
    image = '/uploads/no.jpg'
  }
  let newProduct
  try {
    newProduct = new Product({
      name,
      brand,
      category,
      description,
      price,
      countInStock,
      qtyPerUser,
      image,
      user: req.user._id,
      oldPrice,
      freeShipping,
    })
    await newProduct.save()
  } catch (error) {
    if (
      newProduct.image !== '/uploads/no.jpg' &&
      fs.existsSync(join(__dirname, newProduct.image))
    ) {
      fs.unlinkSync(join(__dirname, newProduct.image))
      console.log('Image is Removed')
    }
    throw new Error(error)
  }
  const newPopulatedProduct = await Product.findOne(newProduct._id).populate(
    'user',
    'name'
  )

  req.app.get('socketService').emiter('ProductAdded', req.user._id, 'Admins')

  res.status(201).send(newPopulatedProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('user', 'name')

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
    oldPrice,
    freeShipping,
  } = req.body

  let finalImage
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
    if (
      product.image !== '/uploads/no.jpg' &&
      fs.existsSync(join(__dirname, product.image))
    ) {
      fs.unlinkSync(join(__dirname, product.image))
      console.log('Image is Removed')
    }
    await sharp(req.file.buffer)
      .resize({ width: 640, height: 510 })
      .toFile('uploads/' + fileName)
  } else {
    finalImage = product.image
  }
  if (image === 'no') {
    if (
      product.image !== '/uploads/no.jpg' &&
      fs.existsSync(join(__dirname, product.image))
    ) {
      fs.unlinkSync(join(__dirname, product.image))
      console.log('Image is Removed')
      finalImage = '/uploads/no.jpg'
    }
  }

  product.freeShipping = freeShipping ? freeShipping : undefined
  product.oldPrice = oldPrice ? oldPrice : undefined
  product.name = name ? name : product.name
  product.brand = brand ? brand : product.brand
  product.category = category ? category : product.category
  product.description = description ? description : product.description
  product.price = price ? price : product.price
  product.countInStock = countInStock ? countInStock : product.countInStock
  product.qtyPerUser = qtyPerUser ? qtyPerUser : product.qtyPerUser
  product.image = finalImage

  product.lastUpdated = new Date()

  try {
    await product.save()
  } catch (error) {
    if (
      product.image !== '/uploads/no.jpg' &&
      fs.existsSync(join(__dirname, product.image))
    ) {
      fs.unlinkSync(join(__dirname, product.image))
      console.log('Image is Removed')
    }
  }

  res.send(product)
})

const resizeProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    throw new Error('Product not Found')
  }
  if (!req.query.w || !req.query.h) {
    throw new Error('Width & Height must be specified')
  }

  if (req.query.w && req.query.h) {
    const image = await sharp('.' + product.image)
      .resize({ width: Number(req.query.w), height: Number(req.query.h) })
      .png()
      .toBuffer()
    res.set('Content-Type', 'image/png')
    res.send(image)
  } else {
    res.send({ image: product.image })
  }
})
const getTinyProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    throw new Error('Product not Found')
  }

  const tiny = await sharp('.' + product.image)
    .resize({ width: 20, height: 16 })
    .png()
    .toBuffer()
  res.set('Content-Type', 'image/png')
  res.send(tiny)
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
    .sort({ created_at: -1 })
    .limit(parseInt(req.query.limit ? req.query.limit : 0))
    .skip(parseInt(req.query.skip ? req.query.skip : 0))
  const count = await Product.countDocuments({ name: regex })

  res.send({ products, count })
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
  getTinyProductImage,
  resizeProductImage,
  checkProducts,
}
