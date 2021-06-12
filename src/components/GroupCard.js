import { Link } from "react-router-dom"

function GroupCard({ name, game, location, time, members, image, id }) {

    return(
        <Link className="group-card-link" to={`/groups/${id}`}>
            <div className="group-card">
                <div className="left-column">
                    <img src={image} alt={name} className="group-card-img"/>
                </div>
                <div className="right-column">
                    <h3 className="user-info label">{name}</h3>
                    <p><span className="bold">Game: </span>{game}</p>
                    <p><span className="bold">Where: </span>{location}</p>
                    <p><span className="bold">When: </span>{time}</p>
                    <p><span className="bold">Members: </span>{members + 1}</p>
                </div>
            </div>
        </Link>
    )
}

export default GroupCard