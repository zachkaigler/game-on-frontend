import { useState } from "react";
import { Form, Input } from "semantic-ui-react";
import { useHistory, NavLink } from "react-router-dom"

function SignUp({ onLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [picture, setPicture] = useState(null)
    const [filename, setFilename] = useState("Upload Photo")
    const history = useHistory()

    console.log(picture)

    function handleSubmit(e) {
        e.preventDefault()

        if (password !== password2) {
            alert("Passwords must match")
        } else {

            const form = new FormData()
            form.append("username", username)
            form.append("password", password)
            form.append("email", email,)
            form.append("profile_pic", picture)

            fetch("http://localhost:3000/users", {
                method: "POST",
                body: form
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

    function handleOnChange(e) {
        setPicture(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    return (
        <div className="login-signup-page">
            <div className="login-signup signup">
                <Form onSubmit={handleSubmit} id="sign-up">
                    <Input className="login-signup-input" required placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
                    <Input className="login-signup-input" required placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                    <Input className="login-signup-input" required placeholder="Confirm Password" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}/><br/>
                    <Input className="login-signup-input" required placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                    <div className="upload-container">
                        <label className="upload-pic">
                            <Input required placeholder="Profile Picture" accept='image/*' type="file" onChange={(e) => handleOnChange(e)}/><br/>
                            <img src="https://i.imgur.com/roNCcSz.png" alt="upload"></img><br/>
                            { filename === "Upload Photo" ? filename : <span className="new-file">{filename}</span>}
                        </label><br/>
                    </div>
                    <button className="login-signup-button">Create Account</button>
                    <br/>
                    <div className="back-to-login">
                        <NavLink to="/">Back to Log In</NavLink>    
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default SignUp