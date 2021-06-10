import { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import Header from './Header';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)

  function onLogin(userInfo) {
    setLoggedInUser(userInfo)
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
            <Profile />
          </Route>
          <Route exact path="/signup">
            <SignUp onLogin={onLogin}/>
          </Route>
        </Switch>
      </div>
    );
}

export default App;
