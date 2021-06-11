import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { NavLink } from "react-router-dom"
import { Button } from "semantic-ui-react"
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
        }
        
        const userIcons = usersPlaying.map((user) => {
            return <NavLink to={`/profile/${user.id}`} key={user.id}><img className="profile-badge" src={user.profile_pic} alt={user.username} /></NavLink>
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

        return(
            <div className="page-container">
                <div className="page-content">
                    <div className="game-header">
                        <h2>Users looking to play {gameData.name}</h2> 
                        { usersGames.includes(gameData.name) ? <Button onClick={destroyInterest}>Count me out</Button> : <Button onClick={createInterest}>I'm game!</Button> }
                    </div>
                   <div className="line info-panel"></div>
                   <div className="game-player-list">
                       { usersPlaying.length === 0 ? <p>N/A</p> : userIcons }
                   </div>
                   <h2>{gameData.name} Groups</h2>
                   <div className="line info-panel"></div>
                   <div className="card-container">
                        { gameData.groups.length === 0 ? <p>N/A</p> : groups }
                   </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default GamePage