import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import GroupsInfo from "./GroupsInfo"
import ProfileInfo from "./ProfileInfo"

function Profile({ loggedInUser, loggedInUserConversations, setLoggedInUserConversations }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [userData, setUserData] = useState({})
    const params = useParams()

    useEffect(()=> {
        fetch(`http://localhost:3000/users/${params.id}`)
        .then(resp => resp.json())
        .then(function(serverUserInfo) {
            setUserData(serverUserInfo)
            setIsLoaded(true)
        })
    }, [params.id])

    if (isLoaded) {
        return (
            <div className="page-container">
                <div className="page-content">
                    <ProfileInfo userData={userData} loggedInUser={loggedInUser} loggedInUserConversations={loggedInUserConversations} setLoggedInUserConversations={setLoggedInUserConversations}/>
                    <GroupsInfo userData={userData}/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="page-container">
                <div className="page-content">
                    
                </div>
            </div>
        )
    }
}

export default Profile