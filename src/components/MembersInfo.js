import { NavLink } from "react-router-dom"

function MembersInfo({groupData, membersArray}) {

    const memberIcons = membersArray.map((user) => {
        return <NavLink to={`/profile/${user.id}`} key={user.id}><img className="profile-badge" src={user.profile_pic} alt={user.username} /></NavLink>
    })

    const adminIcon = (groupData) => {
        return (
            <span className="admin" key={groupData.user.id}>
                <span className="admin-star">🌟</span>
                <NavLink to={`/profile/${groupData.user.id}`} key={groupData.user.id}><img className="profile-badge admin-badge" src={groupData.user.profile_pic} alt={groupData.user.username} /></NavLink>
            </span>
        )
    }

    const userIcons = [adminIcon(groupData), ...memberIcons]

    return(
        <div className="groups-info">
            <h1 className="profile-h1" id="groups">Members ({membersArray.length + 1})</h1>
            <div className="line info-panel"></div>
            <div className="badge-container">
                {userIcons}
            </div>
        </div>
    )
}

export default MembersInfo