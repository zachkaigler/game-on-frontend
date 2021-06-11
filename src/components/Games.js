import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Games() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [gamesArray, setGamesArray] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/games")
        .then(resp => resp.json())
        .then((serverGames) => {
            setGamesArray(serverGames)
            setIsLoaded(true)
        })
    }, [])

    if (isLoaded) {

        const gameLinks = gamesArray.map((game) => {
            return <Link to={`/games/${game.id}`} key={game.id} className="game-link">{game.name}</Link>
        })

        return(
            <div className="page-container">
                <div className="page-content">
                    <div className="games-list">
                        {gameLinks}
                    </div>
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

export default Games