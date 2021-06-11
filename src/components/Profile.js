import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "semantic-ui-react"
import GroupsInfo from "./GroupsInfo"
import ProfileInfo from "./ProfileInfo"

function Profile({ loggedInUser }) {
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
                    <ProfileInfo userData={userData} />
                    { userData.id === loggedInUser.id ? 
                    <Button as={Link} to="/editprofile" className="profile-btn">Edit Profile</Button> 
                    : 
                    <Button className="profile-btn">Message</Button>
                    }
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