import { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import ConversationPage from './ConversationPage';
import Conversations from './Conversations';
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
import SearchResults from './SearchResults';
import SignUp from './SignUp';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loggedInUserProfPic, setLoggedInUserProfPic] = useState("")
  const [loggedInUserGames, setLoggedInUserGames] = useState([])
  const [loggedInUserSentRequests, setLoggedInUserSentRequests] = useState([])
  const [loggedInUserReceivedRequests, setLoggedInUserReceivedRequests] = useState([])
  const [loggedInUserConversations, setLoggedInUserConversations] = useState([])
  const [loggedInUserUnreadMessages, setLoggedInUserUnreadMessages] = useState([])
  const [searchResults, setSearchResults] = useState(null)

  function onLogin(userInfo) {
    setLoggedInUser(userInfo)
    setLoggedInUserProfPic(userInfo.profile_pic)
    setLoggedInUserGames([...userInfo.games])
    setLoggedInUserSentRequests([...userInfo.requests])
    setLoggedInUserReceivedRequests([...userInfo.all_requests_to_my_groups])
    setLoggedInUserConversations([...userInfo.all_conversations])
    const allUnreadMessages = []
    userInfo.all_conversations.forEach((convo) => convo.unread_messages.forEach((msg) => {
      if (msg.user_id !== userInfo.id) {
        allUnreadMessages.push(msg)
      }
    }))
    setLoggedInUserUnreadMessages([...allUnreadMessages])
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
          setLoggedInUserProfPic(data.profile_pic)
          setLoggedInUserGames([...data.games])
          setLoggedInUserSentRequests([...data.requests])
          setLoggedInUserReceivedRequests([...data.all_requests_to_my_groups])
          setLoggedInUserConversations([...data.all_conversations])
          const allUnreadMessages = []
          data.all_conversations.forEach((convo) => convo.unread_messages.forEach((msg) => {
            if (msg.user_id !== data.id) {
              allUnreadMessages.push(msg)
            }
          }))
          setLoggedInUserUnreadMessages([...allUnreadMessages])
      })
    }
  }, [])

  return (
    <div className="App">
       { loggedInUser ? <Header loggedInUser={loggedInUser} 
              setLoggedInUser={setLoggedInUser} 
              loggedInUserReceivedRequests={loggedInUserReceivedRequests}
              setLoggedInUserReceivedRequests={setLoggedInUserReceivedRequests}
              setSearchResults={setSearchResults}
              loggedInUserProfPic={loggedInUserProfPic}
              loggedInUserUnreadMessages={loggedInUserUnreadMessages}/> : null }
      <Switch>
        <Route exact path="/">
          { loggedInUser ? <Redirect to={`/profile/${loggedInUser.id}`} /> : <Login onLogin={onLogin}/> }
        </Route>
        <Route exact path="/profile/:id">
          <Profile loggedInUser={loggedInUser} 
                   loggedInUserConversations={loggedInUserConversations} 
                   setLoggedInUserConversations={setLoggedInUserConversations}/>
        </Route>
        <Route exact path="/signup">
          <SignUp onLogin={onLogin}/>
        </Route>
        <Route exact path="/editprofile">
          <EditProfile loggedInUser={loggedInUser} 
                       setLoggedInUserProfPic={setLoggedInUserProfPic}/>
        </Route>
        <Route exact path="/games">
          <Games />
        </Route>
        <Route exact path="/games/:id">
          <GamePage loggedInUser={loggedInUser} 
                    loggedInUserGames={loggedInUserGames} 
                    setLoggedInUserGames={setLoggedInUserGames}/>
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
          <FindGroups loggedInUser={loggedInUser} 
                      loggedInUserGames={loggedInUserGames}/>
        </Route>
        <Route exact path="/searchresults">
          <SearchResults loggedInUser={loggedInUser} 
                         searchResults={searchResults} 
                         setSearchResults={setSearchResults}/>
        </Route>
        <Route exact path="/conversations">
          { loggedInUser ? <Conversations loggedInUser={loggedInUser} 
                                          loggedInUserConversations={loggedInUserConversations} 
                                          loggedInUserUnreadMessages={loggedInUserUnreadMessages}/> : null}
        </Route>
        <Route exact path="/conversations/:id">
          { loggedInUser ? <ConversationPage loggedInUser={loggedInUser} 
                                             loggedInUserProfPic={loggedInUserProfPic}
                                             loggedInUserUnreadMessages={loggedInUserUnreadMessages}
                                             setLoggedInUserUnreadMessages={setLoggedInUserUnreadMessages}/> : null }
        </Route>
      </Switch>
    </div>
  );
}

export default App;
