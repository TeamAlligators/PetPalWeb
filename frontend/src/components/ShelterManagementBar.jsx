import { NavLink } from "react-router-dom"
import styles from "./ShelterManagementBar.module.css"
import useUser from "../context/UserContext"

function ShelterManagementBar() {
    const user = useUser()
    return (
        <div className={styles.shelterManagementBar}>
            <h1 className={styles.header}>
                Welcome, {user.shelter.name}!
            </h1>
            <div className={styles.shelterContainer}>
                <NavLink className={styles.optionsButton} activeClassName={styles.activeButton} to={`/sheltermanagement`}>
                    Profile
                </NavLink>
                <NavLink className={styles.optionsButton} activeClassName={styles.activeButton} to={`/sheltermanagement/listings`}>
                    Your listings
                </NavLink>
                <NavLink className={styles.optionsButton} activeClassName={styles.activeButton} to={`/sheltermanagement/petcreation`}>
                    Create new Listing
                </NavLink>
                <NavLink className={styles.optionsButton} activeClassName={styles.activeButton} to={`/sheltermanagement/applications`}>
                    Applications
                </NavLink>
            </div>
        </div>
    )
}

export default ShelterManagementBar
