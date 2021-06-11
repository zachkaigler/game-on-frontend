import { Link } from "react-router-dom"

function ProfileInfo({ userData }) {

    let games = null

    if (userData.games.length !== 0) {
        games = userData.games.map((game) => {
            return <Link to={`/games/${game.id}`}key={game.id} className="item">{game.name}</Link>
        }) 
    }

    return (
        <div className="profile-info">
            <img src={userData.profile_pic} alt={userData.username} style={{ height: "400px"}} className="prof-pic"/>
            <div className="user-info">
                <h1 className="profile-h1">{userData.username}</h1>
                <div className="line info-panel"></div>
                <h3 className="user-info label">Bio</h3>
                { userData.bio ? <p className="bio">{userData.bio}</p> : <p>N/A</p>}
                <h3 className="user-info label">Location</h3>
                { userData.location ? <p className="bio">{userData.location}</p> : <p>N/A</p>}
                <h3 className="user-info label">Looking to Play</h3>
                { userData.games.length !== 0 ? <p className="bio">{games}</p> : <p>No games yet.</p>}
            </div>
        </div>
    )
}

export default ProfileInfo