import { NavLink } from "react-router-dom"
import KickMemberModal from "./KickMemberModal"

function MembersInfo({groupData, membersArray, loggedInUser, setMembersArray, membershipsArray, setMembershipsArray}) {

    if (loggedInUser) {
        let memberIcons

        if (loggedInUser.id === groupData.user.id) {
            memberIcons = membersArray.map((user) => {
                return (
                    <span className="admin-members" key={user.id}>
                            {/* <span className="admin-star">🚫</span> */}
                            <KickMemberModal groupData={groupData} member={user} membershipsArray={membershipsArray} setMembershipsArray={setMembershipsArray} membersArray={membersArray} setMembersArray={setMembersArray}/>
                            <NavLink to={`/profile/${user.id}`} key={user.id}><img className="profile-badge" src={user.profile_pic} alt={user.username} /></NavLink>
                    </span>
                )
            })
        } else {
            memberIcons = membersArray.map((user) => {
                return <NavLink to={`/profile/${user.id}`} key={user.id}><img className="profile-badge" src={user.profile_pic} alt={user.username} /></NavLink>
            })
        }

        // const memberIcons = membersArray.map((user) => {
        //     return <NavLink to={`/profile/${user.id}`} key={user.id}><img className="profile-badge" src={user.profile_pic} alt={user.username} /></NavLink>
        // })

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
    } else {
        return null
    }
}

export default MembersInfo