import { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import CreateGroup from './CreateGroup';
import EditGroup from './EditGroup';
import EditProfile from './EditProfile';
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

  function onLogin(userInfo) {
    setLoggedInUser(userInfo)
    setLoggedInUserGames([...userInfo.games])
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
      })
    }
  }, [])
  
  return (
    <div className="App">
      <Header loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
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
          <GroupPage loggedInUser={loggedInUser} />
        </Route>
        <Route exact path="/groups/:id/edit">
          <EditGroup loggedInUser={loggedInUser} />
        </Route>
        <Route exact path="/creategroup">
          { loggedInUser ? <CreateGroup loggedInUser={loggedInUser} /> : <Redirect to="/" />  }
          {/* <CreateGroup loggedInUser={loggedInUser} /> */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
