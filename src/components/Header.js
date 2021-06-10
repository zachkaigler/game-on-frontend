import { NavLink } from "react-router-dom"

function Header({loggedInUser, setLoggedInUser}) {

    function handleClick() {
        localStorage.clear()
        setLoggedInUser(null)
    }

    return (
        <div className="header">
            <h2 className="nav-elements">GAME ON</h2>
            { loggedInUser ? <NavLink to={`/profile/${loggedInUser.id}`}><img id="profile-badge-nav" src={loggedInUser.profile_pic} alt={loggedInUser.username} /></NavLink> : null}
            { loggedInUser ? <NavLink to="/" onClick={handleClick} className="nav-elements log">Log Out</NavLink> : <NavLink to="/" className="nav-elements log">Log In</NavLink>}
        </div>
    )
}

export default Header