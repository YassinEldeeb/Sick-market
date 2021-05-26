import { io } from 'socket.io-client'

// const socket = new WebSocket('ws://localhost:3000')
const socket = io()

export default socket
