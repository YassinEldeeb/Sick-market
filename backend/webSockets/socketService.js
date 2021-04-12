import { Server } from 'socket.io'

class SocketService {
  constructor(server) {
    this.io = new Server(server)
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
      socket.on('ProductCreated', () => {
        socket.broadcast.to('Admins').emit('ProductAdded')
      })
      socket.on('disconnect', () => {
        console.log('User has Disconnected 😟')
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
