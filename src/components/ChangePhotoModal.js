import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Modal, Input } from 'semantic-ui-react'

function ChangePhotoModal({flag, loggedInUser, setLoggedInUserProfPic}) {
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState("")
    const [filename, setFilename] = useState("Upload Photo")
    const params = useParams()
    const history = useHistory()

    if (flag === "group") {

        function handleSubmit(e) {
            e.preventDefault()

            const form = new FormData()
            form.append("group_image", image)

            fetch(`http://localhost:3000/groups/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": loggedInUser.token
                },
                body: form
            })
            .then(resp => resp.json())
            .then((updatedGroup) => {
                history.push(`/groups/${params.id}`)
            })
        }
    

        function handleOnChange(e) {
            setImage(e.target.files[0])
            setFilename(e.target.files[0].name)
        }

        return(
            <Modal
                onClose={() => {
                    setOpen(false)
                }}
                onOpen={() => setOpen(true)}
                open={open}
                size="small"
                dimmer="blurring"
                trigger={<Button>Change Group Photo</Button>}
            >
            <Modal.Header>Change Group Photo</Modal.Header>
            <Modal.Content>
                <div className="change-photo-modal">
                    <div className="upload-container group-container">
                        <form onSubmit={handleSubmit}>
                            <label className="upload-pic">
                                <Input required placeholder="Profile Picture" accept='image/*' type="file" onChange={(e) => handleOnChange(e)}/><br/>
                                <img src="https://i.imgur.com/roNCcSz.png" alt="upload"></img><br/>
                                { filename === "Upload Photo" ? filename : <span className="new-file">{filename}</span>}
                            </label><br/>
                                <div className="save-changes"><Button>Save Changes</Button></div>
                        </form>
                    </div>
                </div>
            </Modal.Content>
            </Modal>
        )
    } else {

        function handleSubmit(e) {
            e.preventDefault()
            const form = new FormData()
            form.append("profile_pic", image)

            fetch(`http://localhost:3000/users/${loggedInUser.id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": loggedInUser.token
                },
                body: form
            })
            .then(resp => resp.json())
            .then((updatedUser) => {
                setLoggedInUserProfPic(updatedUser.profile_pic)
                history.push(`/profile/${loggedInUser.id}`)
            })
        }

        function handleOnChange(e) {
            setImage(e.target.files[0])
            setFilename(e.target.files[0].name)
        }

        return(
            <Modal
                onClose={() => {
                    setOpen(false)
                    setImage("")
                }}
                onOpen={() => setOpen(true)}
                open={open}
                size="small"
                dimmer="blurring"
                trigger={<Button>Change Profile Picture</Button>}
            >
            <Modal.Header>Change Profile Picture</Modal.Header>
            <Modal.Content>
                <div className="change-photo-modal">
                    <div className="upload-container group-container">
                        <form onSubmit={handleSubmit}>
                            <label className="upload-pic">
                                <Input required placeholder="Profile Picture" accept='image/*' type="file" onChange={(e) => handleOnChange(e)}/><br/>
                                <img src="https://i.imgur.com/roNCcSz.png" alt="upload"></img><br/>
                                { filename === "Upload Photo" ? filename : <span className="new-file">{filename}</span>}
                            </label><br/>
                                <div className="save-changes"><Button>Save Changes</Button></div>
                        </form>
                    </div>
                </div>
            </Modal.Content>
            </Modal>
        )
    }
}

export default ChangePhotoModal