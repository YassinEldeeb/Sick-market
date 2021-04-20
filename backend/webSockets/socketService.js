import { Server } from 'socket.io'
import dotenv from 'dotenv'
import redisAdapter from 'socket.io-redis'

dotenv.config()

class SocketService {
  constructor(server) {
    if (process.env.NODE_ENV === 'development') {
      this.io = new Server(server)
    } else {
      this.io.adapter(
        redisAdapter({ host: 'sick-market.herokuapp.com', port: 6379 })
      )
      this.io = new Server(server, 'https://sick-market.herokuapp.com', [
        'websocket',
      ])
    }
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
