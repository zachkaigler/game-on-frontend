import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { NavLink, Link } from "react-router-dom"
import { Button, Popup } from "semantic-ui-react"
import GroupCard from "./GroupCard"

function GamePage({loggedInUser, loggedInUserGames, setLoggedInUserGames}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [gameData, setGameData] = useState({})
    const [usersPlaying, setUsersPlaying] = useState([])
    const [interests, setInterests] = useState([])
    const params = useParams()

    
    useEffect(() => {
        fetch(`http://localhost:3000/games/${params.id}`)
        .then(resp => resp.json())
        .then((serverGameData) => {
            setGameData(serverGameData)
            setUsersPlaying(serverGameData.users)
            setInterests(serverGameData.interests)
            setIsLoaded(true)
        })
    }, [params.id])
    
    if (isLoaded) {

        // if (loggedInUser) {
        //     console.log(interests)
        //     console.log(loggedInUser.id)
        // }

        function destroyInterest() {
            let foundInterest = interests.find((interest) => {
                return interest.user_id === loggedInUser.id
            })
            setLoggedInUserGames([...loggedInUserGames.filter((game) => {
                return game.id !== gameData.id
            })])
            setUsersPlaying([...usersPlaying.filter((user) => {
                return user.id !== loggedInUser.id
            })])
            fetch(`http://localhost:3000/interests/${foundInterest.id}`, {
                method: "DELETE",
                headers: {"Authorization": localStorage.token}
            })
            setInterests([...interests].filter((interest) => interest !== foundInterest))
        }

        function createInterest() {
            setLoggedInUserGames([...loggedInUserGames, gameData])
            setUsersPlaying([...usersPlaying, loggedInUser])
            fetch("http://localhost:3000/interests", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": localStorage.token
                },
                body: JSON.stringify({
                    user_id: loggedInUser.id,
                    game_id: gameData.id
                })
            })
            .then(resp => resp.json())
            .then((newInterest) => setInterests([...interests, newInterest]))
        }
        
        const userIcons = usersPlaying.map((user) => {
            return <NavLink to={`/profile/${user.id}`} key={user.id}><Popup position="bottom center" content={user.username} trigger={<img className="profile-badge" src={user.profile_pic} alt={user.username} />} /></NavLink>
        })

        const groups = gameData.groups.map((group) => {
            return <GroupCard 
                        key={group.id}
                        name={group.group_name}
                        game={group.game.name}
                        location={group.group_location}
                        time={group.group_time}
                        members={group.users.length}
                        image={group.group_image}
                        id={group.id}    
                    />
        })

        const usersGames = loggedInUserGames.map((game) => game.name)

        function checkLoggedInStatus(loggedInUser) {
            if (loggedInUser) {
                if (usersGames.includes(gameData.name)) {
                    return <Button onClick={destroyInterest}>Count me out</Button>
                } else {
                    return <Button onClick={createInterest}>I'm game!</Button>
                }
            } else {
                return null
            }
        }

        return(
            <div className="page-container">
                <div className="page-content">
                    <div className="game-header">
                        <h1 className="profile-h1 game-page">Users looking to play {gameData.name}</h1> 
                        {checkLoggedInStatus(loggedInUser)}
                    </div>
                   <div className="line info-panel"></div>
                   <div className="game-player-list">
                       { usersPlaying.length === 0 ? <span className="no-matches no-groups"><p>None yet. You could be the first!</p></span> : userIcons }
                   </div>
                   <h1 className="profile-h1 game-page">{gameData.name} groups</h1>
                   <div className="line info-panel"></div>
                   <div className="card-container profile-groups">
                        { gameData.groups.length === 0 ? <span className="no-matches no-groups"><p>None yet. <Link to="/creategroup">Create one!</Link></p></span> : groups }
                   </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="page-container unloaded">
            <div className="page-content unloaded">
            </div>
            </div>
        )
    }
}

export default GamePage