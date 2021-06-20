import { useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { Label } from 'semantic-ui-react'
import NotificationsModal from "./NotificationsModal"

function Header({loggedInUser, setLoggedInUser, loggedInUserReceivedRequests, setLoggedInUserReceivedRequests, setSearchResults, loggedInUserProfPic, loggedInUserUnreadMessages}) {
    const [searchInput, setSearchInput] = useState("")
    const history = useHistory()

    function handleClick() {
        localStorage.clear()
        setLoggedInUser(null)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSearchInput("")
        fetch("http://localhost:3000/search", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                query: searchInput
            })
        })
        .then(resp => resp.json())
        .then((results) => {
            setSearchResults(results)
            history.push("/searchresults")
        })
    }

    function renderMsgNotifications() {
        if (loggedInUserUnreadMessages.length === 0) {
            return <span className="icons"><NavLink to={`/conversations`} className="nav-elements"><img src="https://i.imgur.com/ovjG3p5.png" alt="messages" /></NavLink></span>
        } else {
            return (
                <span className="icons-msg-container">
                    <span className="notification-count-msg notification-badge-nav"><Label circular color="red">{loggedInUserUnreadMessages.length}</Label></span>
                    <span className="icons"><NavLink to={`/conversations`} className="nav-elements"><img src="https://i.imgur.com/ovjG3p5.png" alt="messages" /></NavLink></span>
                </span>
            )
        }
    }

    return (
        <div className="nav-header">
            <div className="nav-search-bar-container">
                <img src="https://i.imgur.com/xlkbEKl.png" alt="logo"/>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input className="search" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </form>
            </div>
            <div className="nav-btns-container">
                { loggedInUser ? <span className="icons"><NavLink to="/games" className="nav-elements"><img src="https://i.imgur.com/ujLLXhR.png" alt="games"/></NavLink></span> : null}
                { loggedInUser ? <span className="icons"><NavLink to={"/discover"} className="nav-elements"><img src="https://i.imgur.com/wQ2XwBf.png" alt="find-groups" /></NavLink></span> : null}
                { loggedInUser ? <span className="icons"><NavLink to={"/creategroup"} className="nav-elements"><img src="https://i.imgur.com/gH0T1WX.png" alt="create-group" /></NavLink></span> : null}
                { loggedInUser ? <NotificationsModal loggedInUser={loggedInUser}
                                                     loggedInUserReceivedRequests={loggedInUserReceivedRequests}
                                                     setLoggedInUserReceivedRequests={setLoggedInUserReceivedRequests}/> : null}
                { loggedInUser ? renderMsgNotifications() : null}
                { loggedInUser ? <NavLink to={`/profile/${loggedInUser.id}`}><img id="profile-badge-nav" src={loggedInUserProfPic} alt={loggedInUser.username} /></NavLink> : null}
                { loggedInUser ? <NavLink to="/" onClick={handleClick} className="nav-elements log">Log Out</NavLink> : <NavLink to="/" className="nav-elements log">Log In</NavLink>}
            </div>
        </div>
    )
}

export default Header