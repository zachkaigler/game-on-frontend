function GroupCard({ name, game, location, time, members, image }) {
    return(
        <div className="group-card">
            <img src={image} alt={name} style={{ height: "100px" }}/>
            <h3 className="user-info label">{name}</h3>
            <p><span className="bold">Game: </span>{game}</p>
            <p><span className="bold">Where: </span>{location}</p>
            <p><span className="bold">When: </span>{time}</p>
            <p><span className="bold">Members: </span>{members}</p>
        </div>
    )
}

export default GroupCard