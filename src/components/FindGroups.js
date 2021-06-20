import { useEffect, useState } from "react"
import GroupCard from "./GroupCard"

function FindGroups({loggedInUser, loggedInUserGames}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [groupsArray, setGroupsArray] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/groups")
        .then(resp => resp.json())
        .then((serverGroups) => {
            setGroupsArray(serverGroups)
            setIsLoaded(true)
        })
    }, [])

    if (isLoaded) {

        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
          
            while (0 !== currentIndex) {
          
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
          
            return array;
          }

        const matchingGroups = groupsArray.filter((group) => {
            if (loggedInUserGames.map((game) => game.id).includes(group.game_id) && group.open && group.user_id !== loggedInUser.id && !group.users.map((user) => user.id).includes(loggedInUser.id)) {
                return group
            } else {
                return null
            }
        })

        const randomizedMatchingGroups = shuffle(matchingGroups)

        const displayGroups = randomizedMatchingGroups.map((group) => {
            return <GroupCard key={group.id}
                              name={group.group_name}
                              game={group.game.name}
                              location={group.group_location}
                              time={group.group_time}
                              members={group.users.length}
                              image={group.group_image}
                              id={group.id}
                    />
        })

        return (
            <div className="page-container">
                <div className="page-content">
                <h1 className="profile-h1" id="groups">Discover New Groups</h1>
                <div className="line info-panel"></div>
                    <div className="card-container">
                        {displayGroups}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="page-container">
                <div className="page-content loading">
                    <img src="https://i.imgur.com/dqYD0De.gif" alt="loading" style={{ height: "400px" }} className="loading-gif"/>
                </div>
            </div>
        )
    }
}

export default FindGroups