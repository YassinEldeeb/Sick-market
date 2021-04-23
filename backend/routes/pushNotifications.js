import express from 'express'
import { unRegister, register } from '../controllers/webPushController.js'

const pushRouter = express.Router()

pushRouter.post('/register', register)

pushRouter.delete('/unregister', unRegister)

export default pushRouter
