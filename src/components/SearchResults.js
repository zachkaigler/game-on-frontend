import { Redirect } from "react-router"
import { NavLink, Link } from "react-router-dom"
import { Popup } from "semantic-ui-react"

function SearchResults({ searchResults, loggedInUser, setSearchResults }) {

    if (searchResults) {
        
        function renderUserResults(search) {
            if (search.user_results.length !== 0) {
                return (
                    <div>
                        <h1 className="profile-h1 game-page search-label">Users</h1> 
                        {/* <div className="line info-panel"></div> */}
                    </div>
                )
            } else {
                return null
            }
        }

        function renderGroupResults(search) {
            if (search.group_results.length !== 0) {
                return (
                    <div>
                        <h1 className="profile-h1 game-page search-label">Groups</h1> 
                        {/* <div className="line info-panel"></div> */}
                    </div>
                )
            } else {
                return null
            }
        }

        function renderGameResults(search) {
            if (search.game_results.length !== 0) {
                return (
                    <div>
                        <h1 className="profile-h1 game-page search-label">Games</h1> 
                        {/* <div className="line info-panel"></div> */}
                    </div>
                )
            } else {
                return null
            }
        }
        
        const userResults = searchResults.user_results.map((user) => {
            return <NavLink to={`/profile/${user.id}`} key={user.id}><Popup position="bottom center" content={user.username} trigger={<img className="profile-badge" src={user.profile_pic} alt={user.username} />} /></NavLink>
        })
        
        const groupResults = searchResults.group_results.map((group) => {
            return <NavLink to={`/groups/${group.id}`} key={group.id}><Popup position="bottom center" content={group.group_name} trigger={<img className="profile-badge" src={group.group_image} alt={group.group_name} />} /></NavLink>
        })

        const gameResults = searchResults.game_results.map((game) => {
            return <Link to={`/games/${game.id}`} key={game.id} className="game-link">{game.name}</Link>
        })
   
        return (
            <div className="page-container">
                <div className="page-content">
                    <h1 className="profile-h1 username">Search Results</h1>
                    <div className="line info-panel"></div>

                    {renderUserResults(searchResults)}
                    <div className="search-results">
                        { searchResults.user_results.length !== 0 ? userResults : null }
                    </div>

                    {renderGroupResults(searchResults)}
                    <div className="search-results">
                        { searchResults.group_results.length !== 0 ? groupResults : null }
                    </div>

                    {renderGameResults(searchResults)}
                    <div className="search-results game-results">
                        { searchResults.game_results.length !== 0 ? gameResults : null }
                    </div>

                    { searchResults.user_results.length === 0 && searchResults.group_results.length === 0 && searchResults.game_results.length === 0 ? <p className="no-matches no-results">Sorry, we got nothin'.</p> : null }
                </div>
            </div>
        )
    } else {
        if (loggedInUser) {
            return (
                <Redirect to={`/profile/${loggedInUser.id}`} />
            )
        } else {
            return (
                <Redirect to="/" />
            )
        }
    }
}

export default SearchResults