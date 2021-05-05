import { io } from 'socket.io-client'

const socket = io('https://sickmarket.ml/dropcodes', {
  path: '/websockets',
  transports: ['polling', 'websocket'],
})

export default socket
