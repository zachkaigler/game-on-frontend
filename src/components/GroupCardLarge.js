import { useHistory } from "react-router-dom"
import { Popup } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

function GroupCardLarge({ name, game, location, time, members, image, id, groupsArray, setGroupsArray, group }) {
    const history = useHistory()

    function handlePass() {
        setGroupsArray([...groupsArray].filter((otherGroup) => otherGroup.id !== id))
    }

    function handleInterested() {
        history.push(`/groups/${id}`)
    }

    return(
        <div className="group-card-large-container">
            <div className="group-card-large">
                    <h1 className="group-card-large-h1">{name}</h1>
                    <img src={image} alt={name} className="group-card-large-img"/>
                    <div className="group-card-large-details">
                        <p><span className="bold">Game: </span>{game}</p>
                        <p><span className="bold">Where: </span>{location}</p>
                        <p><span className="bold">When: </span>{time}</p>
                        <p><span className="bold">Group Admin</span></p>
                    </div>
                    <span className="admin" key={group.user.id}>
                        <span className="admin-star">🌟</span>
                        <NavLink to={`/profile/${group.user.id}`} key={group.user.id}><Popup position="right center" content={group.user.username} trigger={<img className="profile-badge admin-badge" src={group.user.profile_pic} alt={group.user.username} />} /></NavLink>
                    </span>
            </div>
            <span className="discover-buttons"><button onClick={handleInterested} className="discover-btn interested">Interested!</button><button onClick={handlePass} className="discover-btn pass">I'll pass</button></span>
        </div>
    )
}

export default GroupCardLarge