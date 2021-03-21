import { io } from "./serverConfig.js"

const socket = () => {
  io.on("connection", (socket) => {
    console.log(`User connected`, socket.id)

    socket.on("NewUser", () => {
      io.emit("UserJoined")
    })
    socket.on("disconnect", (socket) => {
      console.log(`User Disconnected`, socket.id)
    })
  })
}

export default socket
