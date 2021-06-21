import { useEffect, useState } from "react"
import { useParams } from "react-router"
import BanterBoard from "./BanterBoard"
import GroupPageInfo from "./GroupPageInfo"
import MembersInfo from "./MembersInfo"

function GroupPage({ loggedInUser, loggedInUserSentRequests, setLoggedInUserSentRequests }) {
    const [groupData, setGroupData] = useState({})
    const [membersArray, setMembersArray] = useState([])
    const [membershipsArray, setMembershipsArray] = useState([])
    const [posts, setPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/groups/${params.id}`)
        .then(resp => resp.json())
        .then((serverData) => {
            setGroupData(serverData)
            setMembersArray(serverData.users)
            setMembershipsArray(serverData.memberships)
            setPosts(serverData.posts)
            setIsLoaded(true)
        })
    }, [params.id])

    // console.log(new Date().toLocaleString())

    if (isLoaded) {
        return (
            <div className="page-container">
                <div className="page-content">
                        <GroupPageInfo groupData={groupData} 
                                       loggedInUser={loggedInUser} 
                                       membersArray={membersArray} 
                                       setMembersArray={setMembersArray} 
                                       membershipsArray={membershipsArray}
                                       setMembershipsArray={setMembershipsArray}
                                       loggedInUserSentRequests={loggedInUserSentRequests}
                                       setLoggedInUserSentRequests={setLoggedInUserSentRequests}/>
                        <MembersInfo groupData={groupData} 
                                     membersArray={membersArray}
                                     loggedInUser={loggedInUser}
                                     setMembersArray={setMembersArray} 
                                     membershipsArray={membershipsArray}
                                     setMembershipsArray={setMembershipsArray}/>
                        <BanterBoard membersArray={membersArray}
                                     loggedInUser={loggedInUser}
                                     posts={posts}
                                     setPosts={setPosts}
                                     groupData={groupData}
                                     />
                </div>
            </div>
        )
    } else {
        return (
            <div className="page-container">
                <div className="page-content loading">
                        
                </div>
            </div>
        )
    }
}

export default GroupPage