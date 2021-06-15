import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { NavLink } from "react-router-dom"

function ConversationPage({ loggedInUser }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/conversations/${params.id}`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.token
            }
        })
        .then(resp => resp.json())
        .then((data) => {
            setMessages(data.messages)
            setIsLoaded(true)
        })
    }, [params.id])

    if (isLoaded) {

        const messagesOrdered = [...messages].reverse()
        
        const messageBubbles = messagesOrdered.map((message) => {
            if (message.user_id === loggedInUser.id) {
                return (
                    <div className="sent-message" key={message.id}>
                        <p className="sent-message-temp">{message.content}</p>
                        <NavLink to={`/profile/${loggedInUser.id}`}><img className="profile-badge convo" src={loggedInUser.profile_pic} alt={loggedInUser.username} /></NavLink>
                    </div>
                )
            } else {
                return (
                    <div className="receieved-message" key={message.id}>
                        <NavLink to={`/profile/${message.user_id}`}><img className="profile-badge convo" src={message.user_prof_pic} alt={message.user_username} /></NavLink>
                        <p className="receieved-message-temp">{message.content}</p>
                    </div>
                )
            }
        })
        
        function handleSubmit(e) {
            e.preventDefault()

            if (newMessage !== "") {
                const data = {
                    content: newMessage,
                    conversation_id: params.id,
                    user_id: loggedInUser.id,
                    read: false
                }
    
                // setMessages([...messages, data])
                setNewMessage("")
    
                fetch("http://localhost:3000/messages", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": loggedInUser.token
                    },
                    body: JSON.stringify(data)
                })
                .then(resp=>resp.json())
                .then(msg => setMessages([...messages, msg]))
            }
        }

        return(
            <div className="page-container conversation-page">
                <div className="page-content conversation-page">
                    <div className="messages-container">
                        {messageBubbles}
                    </div>
                        <div className="message-form">
                            <form onSubmit={handleSubmit}>
                                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="message-input"/>
                                <button type="submit" className="message-button">Send</button>
                            </form>
                        </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className="page-container">
                <div className="page-content">
                    
                </div>
            </div>
        )
    }
    
}

export default ConversationPage