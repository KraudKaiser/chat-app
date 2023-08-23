import express from "express"
import cors from "cors"

import {Server as SocketServer} from "socket.io" //renombrado para ser mas facil de entender
import http from "http"

const app = express()


const server = http.createServer(app)

const io = new SocketServer(server)

io.on("connection", socket =>{
	console.log("Client Connected")

	socket.on("message", (body) =>{
		socket.broadcast.emit("message-broadcast", {
			body,
			from: socket.id.slice(6)
		})
	})
})

server.listen(3000)


console.log("server is listening on PORT: " + 3000)