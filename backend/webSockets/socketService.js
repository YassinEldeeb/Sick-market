import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { instrument } from '@socket.io/admin-ui'

dotenv.config()

class SocketService {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: [
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://sickmarket.ml',
          'https://admin.socket.io',
        ],
      },
      transports:
        process.env.NODE_ENV === 'development'
          ? ['websocket', 'polling']
          : ['websocket'],
    })

    this.io.on('connection', (socket) => {
      this.socket = socket
      socket.on('userSignedIn', (id) => {
        if (id) {
          const roomId = `user:${id}`
          socket.join(roomId)
          console.log('RoomID:', roomId)
        }
      })
      socket.on('adminJoined', () => {
        const roomId = `Admins`
        socket.join(roomId)
      })

      socket.on('disconnect', () => {
        console.log('User has Disconnected 😟')
        socket.removeAllListeners()
      })
    })
    instrument(this.io, {
      auth:
        process.env.NODE_ENV === 'development'
          ? false
          : {
              type: 'basic',
              username: 'admin',
              password: process.env.HASHED_PASSWORD,
            },
    })
  }
  emiter(event, body, room) {
    if (!room) {
      if (body) this.io.emit(event, body)
      else this.io.emit(event)
    } else {
      if (body) this.io.to(room).emit(event, body)
      else this.io.to(room).emit(event)
    }
  }
}

export default SocketService
