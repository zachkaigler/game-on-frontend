import { useEffect, useState } from "react"
import { useParams } from "react-router"
import GroupPageInfo from "./GroupPageInfo"
import MembersInfo from "./MembersInfo"

function GroupPage({ loggedInUser }) {
    const [groupData, setGroupData] = useState({})
    const [membersArray, setMembersArray] = useState([])
    const [membershipsArray, setMembershipsArray] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/groups/${params.id}`)
        .then(resp => resp.json())
        .then((serverData) => {
            setGroupData(serverData)
            setMembersArray(serverData.users)
            setMembershipsArray(serverData.memberships)
            setIsLoaded(true)
        })
    }, [params.id])

    if (isLoaded) {
        return (
            <div className="page-container">
                <div className="page-content">
                        <GroupPageInfo groupData={groupData} 
                                       loggedInUser={loggedInUser} 
                                       membersArray={membersArray} 
                                       setMembersArray={setMembersArray} 
                                       membershipsArray={membershipsArray}
                                       setMembershipsArray={setMembershipsArray}/>
                        <MembersInfo groupData={groupData} 
                                     membersArray={membersArray}
                                     loggedInUser={loggedInUser}

                                     setMembersArray={setMembersArray} 
                                     membershipsArray={membershipsArray}
                                     setMembershipsArray={setMembershipsArray}/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="page-container">
                <div className="page-content">
                        
                </div>
            </div>
        )
    }
}

export default GroupPage