import { NavLink } from "react-router-dom"
import { Label } from 'semantic-ui-react'

function Conversations({loggedInUser, loggedInUserConversations, loggedInUserUnreadMessages}) {

    const conversations = loggedInUserConversations.map((data) => {
        const filteredMessages = loggedInUserUnreadMessages.filter((msg) => msg.conversation_id === data.convo.id)
        if (data.convo.user_a_id === loggedInUser.id) {
            if (filteredMessages.length === 0) {
                return (
                    <NavLink to={`/conversations/${data.convo.id}`} key={data.convo.id} className="convo-card-wrapper">
                        <div className="conversation-card">
                            <img className="profile-badge" src={data.user_b_pic} alt={data.user_b_username} />
                            <p>Conversation with <span className="bold">{data.user_b_username}</span></p>
                        </div>
                    </NavLink>
                )
            } else {
                return (
                    <NavLink to={`/conversations/${data.convo.id}`} key={data.convo.id} className="convo-card-wrapper">
                        <div className="conversation-card">
                            <span className="icons msg-notifications">
                                <span className="notification-count"><Label circular color="red">{filteredMessages.length}</Label></span>
                                <img className="profile-badge" src={data.user_b_pic} alt={data.user_b_username} />
                            </span>
                            <p>Conversation with <span className="bold">{data.user_b_username}</span></p>
                        </div>
                    </NavLink>
                )
            }
        } else {
            if (filteredMessages.length === 0) {
                return (
                    <NavLink to={`/conversations/${data.convo.id}`} key={data.convo.id} className="convo-card-wrapper">
                        <div className="conversation-card">
                            <img className="profile-badge" src={data.user_a_pic} alt={data.user_a_username} />
                            <p>Conversation with <span className="bold">{data.user_a_username}</span></p>
                        </div>
                    </NavLink>
                )
            } else {
                return (
                    <NavLink to={`/conversations/${data.convo.id}`} key={data.convo.id} className="convo-card-wrapper">
                        <div className="conversation-card">
                            <span className="icons msg-notifications">
                                <span className="notification-count"><Label circular color="red">{filteredMessages.length}</Label></span>
                                <img className="profile-badge" src={data.user_a_pic} alt={data.user_a_username} />
                            </span>
                            <p>Conversation with <span className="bold">{data.user_a_username}</span></p>
                        </div>
                    </NavLink>
                )
            }
        }
    })

    return (
        <div className="page-container">
            <div className="page-content">
                <h1 className="profile-h1 username">Conversations</h1>
                <div className="line info-panel"></div>
                <div className="conversations-list">
                    {loggedInUserConversations.length === 0 ? <p>None yet. Hit someone up!</p> : conversations }
                </div>
            </div>
        </div>
    )
}

export default Conversations