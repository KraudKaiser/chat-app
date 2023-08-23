import { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io("/")


export default function App() {
	
	const [message, setMessage] = useState("")
	const [messages, setMessages] = useState([])
	
	
	const handleSubmit = (e) =>{
		e.preventDefault()
		getOwnMessage(message)
		socket.emit("message", message)
	}
	
	useEffect(()=>{
		socket.on("message-broadcast", message =>{
			console.log(message)
			receiveMessage(message)
		})
	},[])

	const getOwnMessage = (message) =>{
		setMessages(state => [...state, message])
	}
	
	const receiveMessage = (message) =>{
		setMessages(state => [...state, message])
	}
	
	return (
		<div>
		<form onSubmit={handleSubmit}>
			<input
			onChange={(e) => setMessage(e.target.value)}
			type="text" name="message" placeholder="Write your message" />
			<button>Send</button>
		</form>

		<ul>
			{
				messages.map((message, index) =>(
					<li key={index}>
						{message}
					</li>
				))
			}
		</ul>
	</div>
  )
}
