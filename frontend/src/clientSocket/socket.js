import { io } from 'socket.io-client'

const socket = io('https://sickmarket.ml', { transports: ['websockets'] })

export default socket
