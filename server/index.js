import express from "express"
import cors from "cors"

import {Server as SocketServer} from "socket.io" //renombrado para ser mas facil de entender
import http from "http"

const app = express()


const server = http.createServer(app)

const io = new SocketServer(server)

io.on("connection", socket =>{
	console.log("Client Connected")

	socket.on("message", (data) =>{
		console.log(data)
		socket.broadcast.emit("message-broadcast", data)
	})
})

server.listen(3000)


console.log("server is listening on PORT: " + 3000)