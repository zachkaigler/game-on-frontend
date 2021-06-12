import { NavLink } from "react-router-dom"

function Header({loggedInUser, setLoggedInUser}) {

    function handleClick() {
        localStorage.clear()
        setLoggedInUser(null)
    }


    // Change links to all pages once made
    return (
        <div className="header">
            <img src="https://i.imgur.com/fwSD2s0.png" alt="game-on" style={{ height: "70px" }} />
            <div className="nav-btns-container">
                { loggedInUser ? <span className="icons"><NavLink to="/games" className="nav-elements"><img src="https://i.imgur.com/PiITIgg.png" alt="games" style={{ height: "65px"}}/></NavLink></span> : null}
                { loggedInUser ? <span className="icons"><NavLink to={`/profile/${loggedInUser.id}`} className="nav-elements"><img src="https://i.imgur.com/gq5Ra6O.png" alt="find-groups" style={{ height: "65px"}}/></NavLink></span> : null}
                { loggedInUser ? <span className="icons"><NavLink to={`/creategroup`} className="nav-elements"><img src="https://i.imgur.com/Mk9MGYC.png" alt="create-group" style={{ height: "65px"}}/></NavLink></span> : null}
                { loggedInUser ? <span className="icons"><NavLink to={`/profile/${loggedInUser.id}`} className="nav-elements"><img src="https://i.imgur.com/sMSegvD.png" alt="notifications" style={{ height: "65px"}}/></NavLink></span> : null}
                { loggedInUser ? <span className="icons"><NavLink to={`/profile/${loggedInUser.id}`} className="nav-elements"><img src="https://i.imgur.com/wpZRMeJ.png" alt="messages" style={{ height: "65px"}}/></NavLink></span> : null}
                { loggedInUser ? <NavLink to={`/profile/${loggedInUser.id}`}><img id="profile-badge-nav" src={loggedInUser.profile_pic} alt={loggedInUser.username} /></NavLink> : null}
                { loggedInUser ? <NavLink to="/" onClick={handleClick} className="nav-elements log">Log Out</NavLink> : <NavLink to="/" className="nav-elements log">Log In</NavLink>}
            </div>
        </div>
    )
}

export default Header