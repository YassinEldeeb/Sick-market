import { Server } from 'socket.io'

const rooms = []
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
      console.log('Rooms:', this.io.sockets.adapter.rooms)
      this.io.to(room).emit(event)
    }
  }
}

export default SocketService
