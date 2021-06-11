import { useEffect, useState } from "react";
import { Form, Input, Button, TextArea, Label } from "semantic-ui-react";
import { Redirect, useHistory, Link } from "react-router-dom"

function EditProfile( {loggedInUser} ) {
    const [bio, setBio] = useState("")
    const [location, setLocation] = useState("")
    const [picture, setPicture] = useState("")
    const history = useHistory()
    
    useEffect(() => {
        if (loggedInUser) {
            fetch(`http://localhost:3000/users/${loggedInUser.id}`, {
                method: "GET",
                headers: {
                    "Authorization": loggedInUser.token
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
    
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/users/${loggedInUser.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": loggedInUser.token
            },
            body: JSON.stringify({
                bio: bio,
                location: location,
                profile_pic: picture
            })
        })
        .then(resp => resp.json())
        .then((updatedUser) => {
            // console.log(updatedUser)
            history.push(`/profile/${loggedInUser.id}`)
        })
    }

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
                            <Button>Save Changes</Button><br/>
                        </Form>
                            <Button className="cancel" as={Link} to={`/profile/${loggedInUser.id}`}>Cancel</Button>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to="/" />
    }
    
}

export default EditProfile