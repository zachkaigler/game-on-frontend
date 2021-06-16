import { NavLink } from "react-router-dom"

function Conversations({loggedInUser, loggedInUserConversations}) {

    const conversations = loggedInUserConversations.map((data) => {
        if (data.convo.user_a_id === loggedInUser.id) {
            return (
                <div className="conversation-card" key={data.convo.id}>
                    <NavLink to={`/conversations/${data.convo.id}`}><img className="profile-badge" src={data.user_b_pic} alt={data.user_b_username} /></NavLink>
                    <p>Conversation with <span className="bold">{data.user_b_username}</span></p>
                </div>
            )
        } else {
            return (
                <div className="conversation-card" key={data.convo.id}>
                    <NavLink to={`/conversations/${data.convo.id}`} key={data.convo.id}><img className="profile-badge" src={data.user_a_pic} alt={data.user_a_username} /></NavLink>
                    <p>Conversation with <span className="bold">{data.user_a_username}</span></p>
                </div>
            )
        }
    })

    return (
        <div className="page-container">
            <div className="page-content">
                <div className="conversations-list">
                    {loggedInUserConversations.length === 0 ? <p>None yet. Hit someone up!</p> : conversations }
                </div>
            </div>
        </div>
    )
}

export default Conversations