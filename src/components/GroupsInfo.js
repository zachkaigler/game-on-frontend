import GroupCard from "./GroupCard"

function GroupsInfo({userData}) {

    const groups = userData.joined_groups.map((group) => {
        return <GroupCard key={group.id}
                          name={group.group_name}
                          game={group.game.name}
                          location={group.group_location}
                          time={group.group_time}
                          members={group.users.length}
                          image={group.group_image}
        />
    })

    return (
        <div className="groups-info">
            <h1 className="profile-h1" id="groups">Groups ({userData.joined_groups.length})</h1>
            <div className="line info-panel"></div>
            <div className="card-container">
                {groups}
            </div>
        </div>
    )
}

export default GroupsInfo