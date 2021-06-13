import { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import CreateGroup from './CreateGroup';
import EditGroup from './EditGroup';
import EditProfile from './EditProfile';
import FindGroups from './FindGroups';
import GamePage from './GamePage';
import Games from './Games';
import GroupPage from './GroupPage';
import Header from './Header';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loggedInUserGames, setLoggedInUserGames] = useState([])
  const [loggedInUserSentRequests, setLoggedInUserSentRequests] = useState([])
  const [loggedInUserReceivedRequests, setLoggedInUserReceivedRequests] = useState([])

  function onLogin(userInfo) {
    setLoggedInUser(userInfo)
    setLoggedInUserGames([...userInfo.games])
    setLoggedInUserSentRequests([...userInfo.requests])
    setLoggedInUserReceivedRequests([...userInfo.all_requests_to_my_groups])
  }

  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:3000/keep_logged_in", {
        method: "GET",
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(resp => resp.json())
      .then(data => {
          setLoggedInUser(data)
          setLoggedInUserGames([...data.games])
          setLoggedInUserSentRequests([...data.requests])
          setLoggedInUserReceivedRequests([...data.all_requests_to_my_groups])
      })
    }
  }, [])

  return (
    <div className="App">
      <Header loggedInUser={loggedInUser} 
              setLoggedInUser={setLoggedInUser} 
              loggedInUserReceivedRequests={loggedInUserReceivedRequests}
              setLoggedInUserReceivedRequests={setLoggedInUserReceivedRequests}/>
      <Switch>
        <Route exact path="/">
          { loggedInUser ? <Redirect to={`/profile/${loggedInUser.id}`} /> : <Login onLogin={onLogin}/> }
        </Route>
        <Route exact path="/profile/:id">
          <Profile loggedInUser={loggedInUser}/>
        </Route>
        <Route exact path="/signup">
          <SignUp onLogin={onLogin}/>
        </Route>
        <Route exact path="/editprofile">
          <EditProfile loggedInUser={loggedInUser}/>
        </Route>
        <Route exact path="/games">
          <Games />
        </Route>
        <Route exact path="/games/:id">
          <GamePage loggedInUser={loggedInUser} loggedInUserGames={loggedInUserGames} setLoggedInUserGames={setLoggedInUserGames}/>
        </Route>
        <Route exact path="/groups/:id">
          <GroupPage loggedInUser={loggedInUser}
                     loggedInUserSentRequests={loggedInUserSentRequests}
                     setLoggedInUserSentRequests={setLoggedInUserSentRequests} />
        </Route>
        <Route exact path="/groups/:id/edit">
          <EditGroup loggedInUser={loggedInUser} />
        </Route>
        <Route exact path="/creategroup">
          { loggedInUser ? <CreateGroup loggedInUser={loggedInUser} /> : <Redirect to="/" />  }
        </Route>
        <Route exact path="/discover">
          <FindGroups loggedInUser={loggedInUser} loggedInUserGames={loggedInUserGames}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
