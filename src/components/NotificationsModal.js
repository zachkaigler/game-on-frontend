import { NavLink } from "react-router-dom"
import { useState } from 'react'
import { Label, Modal } from 'semantic-ui-react'

function NotificationsModal({ loggedInUser, loggedInUserReceivedRequests, setLoggedInUserReceivedRequests }) {
    const [open, setOpen] = useState(false)

    let unreadRequests = loggedInUserReceivedRequests.filter((r) => !r.request.read)
    
    function markAsRead() {
        if (unreadRequests.length !== 0) {
            unreadRequests.forEach((req) => {

                let updatedReq = {
                    group_name: req.group_name,
                    request: {
                        id: req.request.id,
                        user_id: req.request.user_id,
                        group_id: req.request.group_id,
                        accepted: false,
                        read: true
                    },
                    sender_name: req.sender_name,
                    sender_pic: req.sender_pic
                }
                
                setLoggedInUserReceivedRequests((internalRequestArr) => {
                    return [...internalRequestArr].map((r) => {
                        if (r.request.id === req.request.id) {
                            return updatedReq
                        } else {
                            return r
                        }
                    })
                })
                
                fetch(`http://localhost:3000/requests/${req.request.id}`, {
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
    }
                    
    function renderNotifications(unreadRequests) {
        if (unreadRequests.length !== 0) {
            return (
                <span className="icons">
                    <span className="notification-count"><Label circular color="red">{unreadRequests.length}</Label></span>
                    <span id="notifications"><img src="https://i.imgur.com/ACNM8BV.png" alt="notifications"/></span>
                </span>
            )
        } else {
            return <span className="icons" id="notifications"><img src="https://i.imgur.com/ACNM8BV.png" alt="notifications"/></span>
        }
    }

    function handleAccept(request) {
        setLoggedInUserReceivedRequests([...loggedInUserReceivedRequests].filter(req => req !== request))

        fetch(`http://localhost:3000/requests/${request.request.id}`, {
            method: "DELETE",
            headers: {"Authorization": localStorage.token}
        })

        fetch("http://localhost:3000/memberships", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": loggedInUser.token
            },
            body: JSON.stringify({
                user_id: request.request.user_id,
                group_id: request.request.group_id
            })
        })
    }

    function handleDeny(request) {
        setLoggedInUserReceivedRequests([...loggedInUserReceivedRequests].filter(req => req !== request))

        fetch(`http://localhost:3000/requests/${request.request.id}`, {
            method: "DELETE",
            headers: {"Authorization": localStorage.token}
        })
    }

    const notifications = loggedInUserReceivedRequests.map((request) => {
        return (
            <div className="notification-card" key={request.request.id}>
                <NavLink to={`/profile/${request.request.user_id}`} onClick={() => setOpen(false)}><img className="profile-badge" src={request.sender_pic} alt={request.sender_name} /></NavLink>
                <div className="notification-card-text">
                    <p><span className="bold">{request.sender_name}</span> wants to join <span className="bold">{request.group_name}.</span></p>
                    <p><span className="accept-deny" onClick={() => handleAccept(request)}>Accept</span> | <span className="accept-deny" onClick={() => handleDeny(request)}>Deny</span></p>
                </div>
            </div>
        )
    })

    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => {
                    setOpen(true)
                    markAsRead()
                }}
            open={open}
            size="small"
            dimmer="blurring"
            trigger={renderNotifications(unreadRequests)}
        >
      <Modal.Header>Notifications</Modal.Header>
      <Modal.Content>
        <div className="notifications-modal">
            <div className="notification-card-container">
                { notifications.length === 0 ? <p>No notifications.</p> : notifications }
            </div>
        </div>
      </Modal.Content>
    </Modal>
    )
}

export default NotificationsModal