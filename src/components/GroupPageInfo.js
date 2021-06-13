import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom"

function GroupPageInfo({ groupData, loggedInUser, membersArray, setMembersArray, membershipsArray, setMembershipsArray, loggedInUserSentRequests, setLoggedInUserSentRequests }) {

    function handleLeaveGroup() {
        setMembersArray([...membersArray].filter((member) =>  member.id !== loggedInUser.id))

        const foundMembership = membershipsArray.find((membership) => membership.user_id === loggedInUser.id && membership.group_id === groupData.id)
        setMembershipsArray([...membershipsArray].filter((membership) => membership !== foundMembership))

        fetch(`http://localhost:3000/memberships/${foundMembership.id}`, {
            method: "DELETE",
            headers: {"Authorization": localStorage.token}
        })
    }

    function handleCancelRequest() {
        const foundRequest = loggedInUserSentRequests.find((request) => request.user_id === loggedInUser.id && request.group_id === groupData.id)
        setLoggedInUserSentRequests([...loggedInUserSentRequests].filter((request) => request !== foundRequest))

        fetch(`http://localhost:3000/requests/${foundRequest.id}`, {
            method: "DELETE",
            headers: {"Authorization": localStorage.token}
        })
    }

    function handleRequestJoin() {
        fetch("http://localhost:3000/requests", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": loggedInUser.token
            },
            body: JSON.stringify({
                user_id: loggedInUser.id,
                group_id: groupData.id,
                accepted: false,
                read: false
            })
        })
        .then(resp => resp.json())
        .then((newRequest) => setLoggedInUserSentRequests([...loggedInUserSentRequests, newRequest]))
    }

    function checkUserStatus(loggedInUser) {
        if (loggedInUser) {
            if (loggedInUser.id === groupData.user.id) {
                return (
                    <div className="under-pic">
                        <h3>Group Admin</h3>
                        <Button className="profile-btn edit" as={Link} to={`/groups/${groupData.id}/edit`}>Edit Group</Button>
                    </div>
                )
            } else if (membersArray.map((user) => user.id).includes(loggedInUser.id)) {
                return (
                    <div className="under-pic">
                        <h3>Member</h3>
                        <Button className="profile-btn" onClick={handleLeaveGroup}>Leave Group</Button>
                    </div>)
            } else if (groupData.open && !loggedInUserSentRequests.map((request) => request.group_id).includes(groupData.id)) {
                return <Button className="profile-btn" onClick={handleRequestJoin}>Ask to Join</Button>
            } else if (groupData.open && loggedInUserSentRequests.map((request) => request.group_id).includes(groupData.id)) {
                return <Button className="profile-btn" onClick={handleCancelRequest}>Cancel Request</Button>
            } else {
                return null
            }
        } else {
            return null
        }
    }

    return (
        <div className="profile-info">
            <div className="left-column">
                <img src={groupData.group_image} alt={groupData.group_name} style={{ height: "400px"}} className="prof-pic"/>
                {checkUserStatus(loggedInUser)}
            </div>
            <div className="user-info">
                <h1 className="profile-h1 username">{groupData.group_name}</h1>
                <div className="line info-panel"></div>
                <h3 className="user-info label">Game</h3>
                { groupData.group_about ? <p className="bio"><Link to={`/games/${groupData.game.id}`} className="game">{groupData.game.name}</Link></p> : <p className="bio">N/A</p>}
                <h3 className="user-info label">About this Group</h3>
                { groupData.group_about ? <p className="bio">{groupData.group_about}</p> : <p className="bio">N/A</p>}
                <h3 className="user-info label">Location</h3>
                { groupData.group_location ? <p className="bio">{groupData.group_location}</p> : <p className="bio">N/A</p>}
                <h3 className="user-info label">When</h3>
                { groupData.group_time ? <p className="bio">{groupData.group_time}</p> : <p className="bio">N/A</p> }
                <h3 className="user-info label">Accepting New Members?</h3>
                { groupData.open ? <p className="bio">Yes</p> : <p className="bio">No</p> }
            </div>
        </div>
    )
}

export default GroupPageInfo