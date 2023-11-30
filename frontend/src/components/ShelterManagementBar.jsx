import { Link, NavLink } from "react-router-dom"
import "./ShelterManagementBar.css"

function ShelterManagementBar() {
	return (
        <div id="shelter-management-bar">
            <h1 class="header">
                Shelter Name
            </h1>
            <div class="shelter-container">
                <NavLink className="options-button" to={`/shelterprofile`}>
                    Profile
                </NavLink>
                <NavLink className="options-button" to={`/shelterpetlistings`}>
                    Your listings
                </NavLink>
                <NavLink className="options-button" to={`/petcreation`}>
                    Create new Listing
                </NavLink>
                <NavLink className="options-button" to={`/shelterapplications`}>
                    Applications
                </NavLink>
            </div>
        </div>
	)
}

export default ShelterManagementBar
