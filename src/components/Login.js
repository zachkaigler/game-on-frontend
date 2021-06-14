import { useState } from "react";
import { Form, Input } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom"

function Login({ onLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
   
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
            })
            .then(res => res.json())
            .then(userInfo => {
                if (userInfo.error) {
                    alert(userInfo.error)
                    setUsername("")
                    setPassword("")
                } else {
                    localStorage.token = userInfo.token
                    onLogin(userInfo)
                    history.push(`/profile/${userInfo.id}`)
                }
            })
    }

    if (!localStorage.token) {
       return (
        <div className="login-signup-page">
            <div className="login-signup">
            <img src="https://i.imgur.com/GcgB1H9.png" alt="logo" />
            <div className="line info-panel"></div>
                <Form onSubmit={handleSubmit}>
                    <Input className="login-signup-input" placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
                    <Input className="login-signup-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                    <button className="login-signup-button">Log In</button>
                    <div className="login-signup-links">
                        <h3>or</h3>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </div>
                </Form>        
            </div>
        </div>
        ) 
    } else {
        return null
    }
    
}

export default Login