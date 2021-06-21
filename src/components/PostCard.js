import { NavLink } from "react-router-dom"

function PostCard({ post, loggedInUser, groupData }) {

    return(
        <div className="post-card-container">
            <div className="post-card">
                <span className="admin-members" key={post.id}>
                    <span className="admin-star mood-tag">{post.mood}</span>
                    <NavLink to={`/profile/${post.user_id}`} key={post.id}><img className="profile-badge banter-badge" src={post.poster_pic} alt={post.poster_username} /></NavLink>
                </span>
                <div className="post-content-container">
                    <span className="poster-info"><span className="bold">{post.poster_username}</span> says:</span>
                    <p className="post-content">{post.content}</p>
                    <p className="post-date">{post.date}</p>
                </div>
            </div>
            <div className="line info-panel banter-break"></div>
        </div>
    )
}

export default PostCard