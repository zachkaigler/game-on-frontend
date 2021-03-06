import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { NavLink } from "react-router-dom"
import { createConsumer } from "@rails/actioncable"

function ConversationPage({ loggedInUser, loggedInUserProfPic, loggedInUserUnreadMessages, setLoggedInUserUnreadMessages }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [otherUser, setOtherUser] = useState("")
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

            if (data.user_a_id === loggedInUser.id) {
                setOtherUser(data.user_b.username)
            } else {
                setOtherUser(data.user_a.username)
            }

            setMessages(data.messages)
            setIsLoaded(true)
        })
    }, [params.id, loggedInUser.id])
    
    const cable = useRef()

    useEffect(() => {
        if (!cable.current) {
            cable.current = createConsumer("ws://localhost:3000/cable")
        }
        const paramsToSend = {
            channel: "ConversationChannel",
            id: params.id
        }
        const handlers = {
            received(data) {
                if (data.message.user_id !== loggedInUser.id) {
                    const pkg = {
                        content: data.message.content,
                        conversation_id: data.message.conversation_id,
                        id: data.message.id,
                        read: true,
                        user_id: data.message.user_id,
                        user_prof_pic: data.user_prof_pic,
                        user_username: data.user_username
                    }
                    setMessages([...messages, pkg])
                    fetch(`http://localhost:3000/messages/${data.message.id}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                            "Authorization": loggedInUser.token
                        },
                        body: JSON.stringify({
                            read: true
                        })   
                    })
                } else {
                    const pkg = {
                        content: data.message.content,
                        conversation_id: data.message.conversation_id,
                        id: data.message.id,
                        read: false,
                        user_id: data.message.user_id,
                        user_prof_pic: data.user_prof_pic,
                        user_username: data.user_username
                    }
                    setMessages([...messages, pkg])
                }
            },
            connected() {
                console.log("connected")
            },
            disconnected() {
                console.log("disconnected")
                cable.current = null
            }
        }
        console.log("subbing to ", params.id)
        const subscription = cable.current.subscriptions.create(paramsToSend, handlers)

        return function cleanup() {
            console.log("unsubbing from ", params.id)
            cable.current = null
            subscription.unsubscribe()
        }
    }, [params.id, messages, loggedInUser.id, loggedInUser.token])

    useEffect(() => {
        // eslint-disable-next-line
        const filteredMessages = loggedInUserUnreadMessages.filter((msg) => msg.conversation_id == params.id)
        setLoggedInUserUnreadMessages([...loggedInUserUnreadMessages].filter((msg) => !filteredMessages.includes(msg)))

        if (filteredMessages.length !== 0) {
            filteredMessages.forEach((msg) => {
                fetch(`http://localhost:3000/messages/${msg.id}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": loggedInUser.token
                    },
                    body: JSON.stringify({
                        read: true
                    })   
                })
            })
        }
        // eslint-disable-next-line
    }, [])

    if (isLoaded) {

        const messagesOrdered = [...messages].reverse()
        
        const messageBubbles = messagesOrdered.map((message) => {
            if (message.user_id === loggedInUser.id) {
                return (
                    <div className="sent-message" key={message.id}>
                        <p className="sent-message-temp">{message.content}</p>
                        <NavLink to={`/profile/${loggedInUser.id}`}><img className="profile-badge convo" src={loggedInUserProfPic} alt={loggedInUser.username} /></NavLink>
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
    
                setNewMessage("")
    
                fetch("http://localhost:3000/messages", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": loggedInUser.token
                    },
                    body: JSON.stringify(data)
                })
            }
        }

        return(
            <div className="page-container conversation-page">
                <div className="page-content conversation-page">
                    <h1 className="profile-h1 username" id="chat">{otherUser}</h1>
                    <div className="line info-panel"></div>
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
                <div className="page-content loading">
                    
                </div>
            </div>
        )
    }
    
}

export default ConversationPage