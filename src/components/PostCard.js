import { NavLink } from "react-router-dom"

function PostCard({ post, loggedInUser, groupData, posts, setPosts }) {

    function handleDelete() {
        setPosts([...posts].filter((otherPost) => otherPost.id !== post.id))
        fetch(`http://localhost:3000/posts/${post.id}`, {
            method: "DELETE",
            headers: {"Authorization": loggedInUser.token}
        })
    }

    function renderDeleteButton() {
        if (loggedInUser) {
            // eslint-disable-next-line
            if (loggedInUser.id == post.user_id || loggedInUser.id == groupData.user_id) {
                return <span className="delete-post" onClick={handleDelete}>🗑️</span>
            } else {
                return null
            }
        }
    }

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
                    <p className="post-date">{post.date} {renderDeleteButton()} </p>
                </div>
            </div>
            <div className="line info-panel banter-break"></div>
        </div>
    )
}

export default PostCard