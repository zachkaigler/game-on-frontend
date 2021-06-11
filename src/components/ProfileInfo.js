import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"

function ProfileInfo({ userData, loggedInUser }) {

    let games = null

    if (userData.games.length !== 0) {
        games = userData.games.map((game) => {
            return <Link to={`/games/${game.id}`}key={game.id} className="game">{game.name}</Link>
        }) 
    }

        //LOGIC FOR NOT RENDERING A BUTTON IF A USER IS NOT LOGGED IN. FIX LATER
    // function renderButton(loggedInUser) {
    //     if (loggedInUser) {
    //         { userData.id === loggedInUser.id ? 
    //             <Button as={Link} to="/editprofile" className="profile-btn">Edit Profile</Button> 
    //             : 
    //             <Button className="profile-btn">Message</Button>
    //             }
    //     } else {
    //         return null
    //     }
    // }

    return (
        <div className="profile-info">
            <div className="left-column">
                <img src={userData.profile_pic} alt={userData.username} className="prof-pic"/>
                { userData.id === loggedInUser.id ? 
                        <Button as={Link} to="/editprofile" className="profile-btn">Edit Profile</Button> 
                        : 
                        <Button className="profile-btn">Message</Button>
                        }
            </div>
            <div className="user-info" id="group-info">
                <h1 className="profile-h1">{userData.username}</h1>
                <div className="line info-panel"></div>
                <h3 className="user-info label">Bio</h3>
                { userData.bio ? <p className="bio">{userData.bio}</p> : <p className="bio">N/A</p>}
                <h3 className="user-info label">Location</h3>
                { userData.location ? <p className="bio">{userData.location}</p> : <p className="bio">N/A</p>}
                <h3 className="user-info label">Looking to Play</h3>
                { userData.games.length !== 0 ? <p className="bio">{games}</p> : <p className="bio">N/A</p>}
            </div>
        </div>
    )
}

export default ProfileInfo