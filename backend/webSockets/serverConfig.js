import express from "express"
import http from "http"
import { Server } from "socket.io"
import socket from "./socket.js"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  pingInterval: 10000,
  pingTimeout: 99999999,
  // cors: {
  //   origin:
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:3000"
  //       : "https://sick-market.herokuapp.com",
  //   methods: ["GET", "POST", "DELETE", "PATCH"],
  // },
})

socket()

export { io, app, server }
