import { useState } from "react"
import { Button } from "semantic-ui-react"
import PostCard from "./PostCard"

function BanterBoard({ membersArray, loggedInUser, posts, setPosts, groupData }) {
    const [content, setContent] = useState("")
    const [mood, setMood] = useState("😀")
    
    function isUserMember() {
        if (loggedInUser) {
            if (membersArray.map((member) => member.id).includes(loggedInUser.id) || loggedInUser.id === groupData.user.id) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function renderForm() {
        return (
            <div className="banter-form-container"> 
                <form onSubmit={handleSubmit} className="post-form">
                    <div className="box-shadow-container">
                        <textarea required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Talk some smack!" rows="7" cols="60" className="post-textarea"/><br/>
                        <div className="lower-container">
                            <div className="mood-block">
                                <span className="select-label">How you feeling? </span> <select required value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Mood?" className="moods-select">
                                    <option value="😀" className="option">😀</option>
                                    <option value="😂" className="option">😂</option>
                                    <option value="😜" className="option">😜</option>
                                    <option value="😎" className="option">😎</option>
                                    <option value="🤔" className="option">🤔</option>
                                    <option value="🤬" className="option">🤬</option>
                                    <option value="😱" className="option">😱</option>
                                    <option value="😭" className="option">😭</option>
                                    <option value="🤯" className="option">🤯</option>
                                </select>
                            </div>
                            <Button>Submit</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    function handleSubmit(e) {
        e.preventDefault()
        const post = {
            content: content,
            mood: mood,
            date: new Date().toLocaleString(),
            group_id: groupData.id,
            user_id: loggedInUser.id
        }
        setContent("")
        setMood("")
        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": loggedInUser.token
            },
            body: JSON.stringify(post)
        })
        .then(resp => resp.json())
        .then((newPost) => setPosts([...posts, newPost]))
    }

    const postCards = posts.map((post) => <PostCard post={post} key={post.id} loggedInUser={loggedInUser} groupData={groupData} posts={posts} setPosts={setPosts}/>)
    const postCardsOrdered = [...postCards].reverse()

    return(
        <div className="groups-info">
            <h1 className="profile-h1" id="groups">Banter Board</h1>
            <div className="line info-panel"></div>
            { isUserMember() ? renderForm() : null }
            <div className="posts-container">
                { posts.length !== 0 ? postCardsOrdered : <p className="no-matches no-posts">*crickets*</p>}
            </div>
        </div>
    )
}

export default BanterBoard