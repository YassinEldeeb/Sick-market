import { io } from 'socket.io-client'

const socket = io('http://localhost:3000/dropcodes', {
  path: '/websockets',
  transports: ['polling', 'websocket'],
})

export default socket
