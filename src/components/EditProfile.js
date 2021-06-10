import { useEffect, useState } from "react";
import { Form, Input, Button, TextArea, Label } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom"

function EditProfile( {loggedInUser} ) {
    const [bio, setBio] = useState(null)
    const [location, setLocation] = useState(null)
    const [picture, setPicture] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()
    }

    useEffect(() => {
        if (loggedInUser) {
            fetch(`http://localhost:3000/users/${loggedInUser.id}`, {
                    method: "GET",
                    headers: {
                    "Authorization": localStorage.token
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setBio(data.bio)
                setLocation(data.location)
                setPicture(data.profile_pic)
            })
        }
    }, [loggedInUser])

    if (loggedInUser) {
        return(
            <div className="page-container">
                <div className="page-content">
                    <div className="edit-profile">
                        <Form onSubmit={handleSubmit}>
                            <Label>Bio</Label>
                            <TextArea name="Bio" className="input" maxLength="250" type="text" value={bio} onChange={(e) => setBio(e.target.value)}/><br/>
                            <Label>Location</Label><br/>
                            <Input className="input" type="text" value={location} onChange={(e) => setLocation(e.target.value)}/><br/>
                            <Label>Profile Picture</Label><br/>
                            <Input className="input" placeholder="Profile Picture" type="url" value={picture} onChange={(e) => setPicture(e.target.value)}/><br/>
                            <Button>Update Information</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to="/" />
    }
    
}

export default EditProfile