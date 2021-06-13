import dotenv from 'dotenv'
import connectDB from './db/mongoose'
import chalk from 'chalk'
import productRouter from './routes/productRoute'
import { errRouter, notFoundRouter } from './middleware/errMiddleware'
import userRouter from './routes/userRoute'
import orderRouter from './routes/orderRoute'
import couponRouter from './routes/couponRoute'
import pushRouter from './routes/pushNotifications'
import rateLimit from 'express-rate-limit'
import path from 'path'
import express from 'express'
import SocketService from './webSockets/socketService'
import Category from './models/category'
import http from 'http'
import cors from 'cors'
import fs from 'fs'

const app = express()

const server = http.createServer(app)

app.use(
  cors({
    origin: 'https://sickmarket.ml',
  })
)
app.use(express.json())
dotenv.config()

connectDB()

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 1,
  message: 'Try again in 60 seconds',
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
  // app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        path.join(__dirname, '../'),
        'frontend',
        'build',
        'index.html'
      )
    )
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

server.listen(port, () => {
  console.log(
    chalk.yellow.bold(
      `Server running in ${process.env.NODE_ENV!} mode on port ${port}`
    )
  )
})

app.set('socketService', new SocketService(server))
