import { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom"

function SignUp({ onLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [picture, setPicture] = useState("")
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        if (password !== password2) {
            alert("Passwords must match")
        } else {
            let newUser = {
                username: username,
                password: password,
                email: email,
                profile_pic: picture
            }

            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            .then(resp => resp.json())
            .then((createdUser) => {
                if (createdUser.error) {
                    alert(createdUser.error)
                    setUsername("")
                    setPassword("")
                    setPassword2("")
                    setEmail("")
                    setPicture("")
                } else {
                    localStorage.token = createdUser.token
                    onLogin(createdUser)
                    history.push(`/profile/${createdUser.id}`)
                }
            })
        }
    }

    return (
        <div className="signup">
            <Form onSubmit={handleSubmit}>
                <Input className="input" required placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
                <Input className="input" required placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                <Input className="input" required placeholder="Confirm Password" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}/><br/>
                <Input className="input" required placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <Input className="input" required placeholder="Profile Picture" type="url" value={picture} onChange={(e) => setPicture(e.target.value)}/><br/>
                <Button>Create Account</Button>
            </Form>
        </div>
    )
}

export default SignUp