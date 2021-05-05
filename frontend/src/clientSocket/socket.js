import { io } from 'socket.io-client'

const socket = io('https://sickmarket.ml', {
  path: '/websockets',
  transports: ['polling', 'websocket'],
})

export default socket
