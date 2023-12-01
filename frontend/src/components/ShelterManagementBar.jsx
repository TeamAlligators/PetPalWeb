import { NavLink } from "react-router-dom"
import styles from "./ShelterManagementBar.module.css"

function ShelterManagementBar() {
	return (
        <div className={styles.shelterManagementBar}>
            <h1 className={styles.header}>
                Shelter Name
            </h1>
            <div className={styles.shelterContainer}>
                <NavLink className={styles.optionsButton} to={`/sheltermanagement`}>
                    Profile
                </NavLink>
                <NavLink className={styles.optionsButton} to={`/shelterpetlistings`}>
                    Your listings
                </NavLink>
                <NavLink className={styles.optionsButton} to={`/petcreation`}>
                    Create new Listing
                </NavLink>
                <NavLink className={styles.optionsButton} to={`/shelterapplications`}>
                    Applications
                </NavLink>
            </div>
        </div>
	)
}

export default ShelterManagementBar
