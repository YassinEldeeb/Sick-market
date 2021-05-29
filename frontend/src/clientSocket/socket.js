import { io } from 'socket.io-client'
import dotenv from 'dotenv'
dotenv.config()

const socket = io({ transports: ['websocket'], upgrade: false })

export default socket
