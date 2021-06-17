import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Dropdown, Form, Input, Button, TextArea } from "semantic-ui-react"
import { Link } from "react-router-dom"

function CreateGroup({loggedInUser}) {
    const [games, setGames] = useState([])
    const [groupName, setGroupName] = useState("")
    const [groupAbout, setGroupAbout] = useState("")
    const [groupLocation, setGroupLocation] = useState("")
    const [groupDay, setGroupDay] = useState("")
    const [groupTime, setGroupTime] = useState("")
    const [open, setOpen] = useState("")
    const [groupImage, setGroupImage] = useState("")
    const [selectedGame, setSelectedGame] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory()

    useEffect(() => {
        fetch("http://localhost:3000/games")
        .then(resp => resp.json())
        .then(gamesArr => {
            setGames(gamesArr)
            setIsLoaded(true)
        })
    }, [])

    if (isLoaded) {

        function handleSubmit(e) {
            e.preventDefault()

            let combinedTime = [groupDay, groupTime].join(", ") 

            let data = {
                group_name: groupName,
                group_about: groupAbout,
                group_location: groupLocation,
                group_time: combinedTime,
                open: open,
                group_image: groupImage,
                game_id: selectedGame,
                user_id: loggedInUser.id
            }

            fetch("http://localhost:3000/groups", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": loggedInUser.token
                },
                body: JSON.stringify(data)
            })
            .then(resp => resp.json())
            .then(newGroup => {
                history.push(`/groups/${newGroup.id}`)
            })
        }

        const gameOptions = games.map(game => {
            return (
                {
                    key: game.name,
                    text: game.name,
                    value: game.id
                }
            )
        })

        const days = [
            {
                key: "Mondays",
                text: "Mondays",
                value: "Mondays",
            },
            {
                key: "Tuesdays",
                text: "Tuesdays",
                value: "Tuesdays",
            },
            {
                key: "Wednesdays",
                text: "Wednesdays",
                value: "Wednesdays",
            },
            {
                key: "Thursdays",
                text: "Thursdays",
                value: "Thursdays",
            },
            {
                key: "Fridays",
                text: "Fridays",
                value: "Fridays",
            },
            {
                key: "Saturdays",
                text: "Saturdays",
                value: "Saturdays",
            },
            {
                key: "Sundays",
                text: "Sundays",
                value: "Sundays",
            },
        ]
    
        const times = [
            {
                key: "12AM",
                text: "12AM",
                value: "12AM",
            },
            {
                key: "1AM",
                text: "1AM",
                value: "1AM",
            },
            {
                key: "2AM",
                text: "2AM",
                value: "2AM",
            },
            {
                key: "3AM",
                text: "3AM",
                value: "3AM",
            },
            {
                key: "4AM",
                text: "4AM",
                value: "4AM",
            },
            {
                key: "5AM",
                text: "5AM",
                value: "5AM",
            },
            {
                key: "6AM",
                text: "6AM",
                value: "6AM",
            },
            {
                key: "7AM",
                text: "7AM",
                value: "7AM",
            },
            {
                key: "8AM",
                text: "8AM",
                value: "8AM",
            },
            {
                key: "9AM",
                text: "9AM",
                value: "9AM",
            },
            {
                key: "10AM",
                text: "10AM",
                value: "10AM",
            },
            {
                key: "11AM",
                text: "11AM",
                value: "11AM",
            },
            {
                key: "12PM",
                text: "12PM",
                value: "12PM",
            },
            {
                key: "1PM",
                text: "1PM",
                value: "1PM",
            },
            {
                key: "2PM",
                text: "2PM",
                value: "2PM",
            },
            {
                key: "3PM",
                text: "3PM",
                value: "3PM",
            },
            {
                key: "4PM",
                text: "4PM",
                value: "4PM",
            },
            {
                key: "5PM",
                text: "5PM",
                value: "5PM",
            },
            {
                key: "6PM",
                text: "6PM",
                value: "6PM",
            },
            {
                key: "7PM",
                text: "7PM",
                value: "7PM",
            },
            {
                key: "8PM",
                text: "8PM",
                value: "8PM",
            },
            {
                key: "9PM",
                text: "9PM",
                value: "9PM",
            },
            {
                key: "10PM",
                text: "10PM",
                value: "10PM",
            },
            {
                key: "11PM",
                text: "11PM",
                value: "11PM",
            }
        ]
    
        const trueFalse = [
            {
                key: "Yes",
                text: "Yes",
                value: true,
            },
            {
                key: "No",
                text: "No",
                value: false,
            }
        ]

        return (
            <div className="page-container">
                <div className="page-content">
                <div className="edit-group">
                    <h1 className="profile-h1 username">New Group</h1>
                    <div className="line info-panel"></div>
                    <div className="form-container">
                    <Form onSubmit={handleSubmit} className="form">
                        <Input required fluid className="input" placeholder="Group Name" type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)}/><br/>
                        <Dropdown required fluid selection placeholder="Game" options={gameOptions} onChange={(e, r) => setSelectedGame(r.value)} value={selectedGame}/><br/>
                        <TextArea required placeholder="About" className="input" maxLength="250" type="text" value={groupAbout} onChange={(e) => setGroupAbout(e.target.value)}/><br/>
                        <Input required fluid className="input" placeholder="Location" id="location" type="text" value={groupLocation} onChange={(e) => setGroupLocation(e.target.value)}/><br/>
                        <div className="dropdown-container">
                            <Dropdown required selection className="dropdown" placeholder="Day" options={days} onChange={(e, r) => setGroupDay(r.value)} value={groupDay}/> <Dropdown selection className="dropdown" placeholder="Time" options={times} onChange={(e, r) => setGroupTime(r.value)} value={groupTime}/><br/>
                        </div>
                        <Dropdown required className="is-open" fluid selection placeholder="Accepting new members?" options={trueFalse} onChange={(e, r) => setOpen(r.value)} value={open}/><br/>
                        <Input required fluid className="input" placeholder="Group Picture" type="url" value={groupImage} onChange={(e) => setGroupImage(e.target.value)}/><br/>
                        <Button id="create">Create Group</Button>
                    </Form>
                    <Button className="cancel" as={Link} to={`/profile/${loggedInUser.id}`}>Cancel</Button>
                    </div>
                    </div> 
                </div>
            </div>
        )
    } else {
        return (
            <div className="page-container unloaded">
                <div className="page-content unloaded">
                    
                </div>
            </div>
        )
    }
}

export default CreateGroup