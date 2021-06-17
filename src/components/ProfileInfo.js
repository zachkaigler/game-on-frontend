import { Link, useHistory } from "react-router-dom"
import { Button } from "semantic-ui-react"

function ProfileInfo({ userData, loggedInUser, loggedInUserConversations, setLoggedInUserConversations }) {
    const history = useHistory()

    function commaPlacer(arr) {
        return arr.map((e) => {
          if (arr.indexOf(e) !== arr.length - 1) {
            return ({ name: `${e.name}, `, id: e.id})
          } else {
            return ({ name: e.name, id: e.id})
          }
        })
      }

    let games = null

    if (userData.games.length !== 0) {
        games = commaPlacer(userData.games).map((game) => {
                return <Link to={`/games/${game.id}`}key={game.id} className="game">{game.name}</Link>
            }) 
    }
   
    function handleClick() {
        const foundConvo = loggedInUserConversations.find((convo) => {
            if (convo.convo.user_a_id === loggedInUser.id && convo.convo.user_b_id === userData.id) {
                return convo
            } else if (convo.convo.user_b_id === loggedInUser.id && convo.convo.user_a_id === userData.id) {
                return convo
            } else {
                return null
            }
        })

        if (foundConvo) {
            console.log(`Redirecting to conversation ${foundConvo.convo.id}!`)
            history.push(`/conversations/${foundConvo.convo.id}`)
        } else {
            console.log("Creating new conversation!")
            fetch("http://localhost:3000/conversations", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": loggedInUser.token
                },
                body: JSON.stringify({
                    user_a_id: loggedInUser.id,
                    user_b_id: userData.id
                })
            })
            .then(resp => resp.json())
            .then(newConvo => {

                const data = {
                    convo: newConvo,
                    user_a_pic: loggedInUser.id,
                    user_a_username: loggedInUser.username,
                    user_b_pic: userData.profile_pic,
                    user_b_username: userData.username
                }

                setLoggedInUserConversations([...loggedInUserConversations, data])
                history.push(`/conversations/${newConvo.id}`)
            })
        }
    }

    function renderButton(loggedInUser) {
        if (loggedInUser) {
            if (userData.id === loggedInUser.id ) {
                return <Button as={Link} to="/editprofile" className="profile-btn">Edit Profile</Button> 
            } else {
                return <Button className="profile-btn" onClick={handleClick}>Message</Button>
            }
        } else {
            return null
        }
    }

    return (
        <div className="profile-info">
            <div className="left-column">
                <img src={userData.profile_pic} alt={userData.username} className="prof-pic"/>
                {renderButton(loggedInUser)}
            </div>
            <div className="user-info" id="group-info">
                <h1 className="profile-h1 username">{userData.username}</h1>
                <div className="line info-panel"></div>
                <h3 className="user-info label">Bio</h3>
                { userData.bio ? <p className="bio">{userData.bio}</p> : <p className="bio">N/A</p>}
                <h3 className="user-info label">Location</h3>
                { userData.location ? <p className="bio">{userData.location}</p> : <p className="bio">N/A</p>}
                <h3 className="user-info label">Looking to Play</h3>
                { userData.games.length !== 0 ? <p className="bio">{games}</p> : <Link to="/games">None yet. Add some!</Link>}
            </div>
        </div>
    )
}

export default ProfileInfo