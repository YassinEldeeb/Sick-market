import dotenv from 'dotenv'
import connectDB from './db/mongoose.js'
import colors from 'colors'
import productRouter from './routes/productRoute.js'
import { errRouter, notFoundRouter } from './middleware/errMiddleware.js'
import userRouter from './routes/userRoute.js'
import orderRouter from './routes/orderRoute.js'
import couponRouter from './routes/couponRoute.js'
import pushRouter from './routes/pushNotifications.js'
import bodyparser from 'body-parser'
import rateLimit from 'express-rate-limit'
import path from 'path'
import express from 'express'
import SocketService from './webSockets/socketService.js'
import wakeUpDyno from './utils/wakeUpDyno.js'
import prerender from 'prerender-node'
import Category from './models/category.js'
import fs from 'fs'
import spdy from 'spdy'

const __dirname = path.resolve()

const app = express()

const server = spdy.createServer(
  {
    key: fs.readFileSync(path.resolve(__dirname, './certificates/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, './certificates/server.crt')),
  },
  app
)

console.log(
  fs.readFileSync(path.resolve(__dirname, './certificates/server.key')),
  fs.readFileSync(path.resolve(__dirname, './certificates/server.crt'))
)

app.use(express.json())
dotenv.config()
app.use(prerender.set('prerenderToken', [process.env.PRERENDER_TOKEN]))

connectDB()

app.use(bodyparser.urlencoded({ extended: true }))

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 1,
  message: { message: 'Try again in 60 seconds' },
})

app.use('/api/products', productRouter)
app.use('/api/users/getNewSecurityCode', apiLimiter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/coupons', couponRouter)
app.use('/api/push', pushRouter)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('The API is running!')
  })
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
}

app.use(notFoundRouter)
app.use(errRouter)

const port = process.env.PORT
// const DYNO_URL = 'https://sickmarket.ml'
server.listen(port, () => {
  // if (process.env.NODE_ENV === 'production') {
  //   wakeUpDyno(DYNO_URL)
  // }

  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
})

app.set('socketService', new SocketService(server))
