import { useState, useEffect } from "react"
import io from "socket.io-client"
import styles from "./App.module.css"
const socket = io("/")


export default function App() {
	
	const [message, setMessage] = useState("")
	const [messages, setMessages] = useState([])
	
	
	const handleSubmit = (e) =>{
		e.preventDefault()

		const newMessage = {
			body:message,
			from: "Me"
		}

		setMessages([...messages, newMessage])
		socket.emit("message", message)
	}
	
	useEffect(()=>{
		socket.on("message-broadcast", receiveMessage)
		return () => {
			socket.off("message-broadcast", receiveMessage)
		}
	},[])
	
	const receiveMessage = (message) =>{
		setMessages(state => [...state, message])
	}
	
	return (
		<div className={styles.app}>
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
			onChange={(e) => setMessage(e.target.value)}
			type="text" name="message" placeholder="Write your message" />
			<button>Send</button>
		</form>

		<ul className={styles.chat}>
			{
				messages.map((message, index) =>(
					<li className={message.from === "Me" ? styles.messageOwner : styles.message} key={index}>
						<h3>{message.from}</h3>
						<p>{message.body}</p>
					</li>
				))
			}
		</ul>
	</div>
  )
}
