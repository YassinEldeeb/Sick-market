import { io } from 'socket.io-client'

const socket = io('https://sickmarket.ml', {
  transports: ['polling', 'websocket'],
})

export default socket
