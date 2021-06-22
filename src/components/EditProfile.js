import { useEffect, useState } from "react";
import { Form, Input, Button, TextArea, Label } from "semantic-ui-react";
import { Redirect, useHistory, Link } from "react-router-dom"
import ChangePhotoModal from "./ChangePhotoModal";

function EditProfile( {loggedInUser, setLoggedInUserProfPic} ) {
    const [bio, setBio] = useState("")
    const [location, setLocation] = useState("")
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
            })
        }
    }, [loggedInUser])
    
    
    if (loggedInUser) {
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
                })
            })
            .then(resp => resp.json())
            .then((updatedUser) => {
                history.push(`/profile/${loggedInUser.id}`)
            })
        }
        
        return(
            <div className="page-container">
                <div className="page-content">
                <h1 className="profile-h1 username">Edit Profile</h1>
                <div className="line info-panel"></div>
                    <div className="edit-group">
                    <div className="form-container">
                        <Form onSubmit={handleSubmit}>
                            <Label className="label">Bio</Label>
                            <TextArea name="Bio" className="input" maxLength="250" type="text" value={bio} onChange={(e) => setBio(e.target.value)}/><br/>
                            <Label className="label" id="location-label">Location</Label><br/>
                            <Input fluid className="input" type="text" value={location} onChange={(e) => setLocation(e.target.value)}/><br/>
                            <Button>Save Changes</Button><br/>
                        </Form>
                        </div>
                            <ChangePhotoModal flag="profile" loggedInUser={loggedInUser} setLoggedInUserProfPic={setLoggedInUserProfPic}/> <br/> 
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