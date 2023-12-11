import { NavLink } from "react-router-dom"
import styles from "./ShelterManagementBar.module.css"
import useUser from "../context/UserContext"

function SeekerManagementBar() {
    const user = useUser()
    return (
        <div className={styles.shelterManagementBar}>
            <h1 className={styles.header}>
                Welcome, {user.first_name}!
            </h1>
            <div className={styles.shelterContainer}>
                <NavLink className={styles.optionsButton} activeClassName={styles.activeButton} to={`/seekermanagement`}>
                    Profile
                </NavLink>
                <NavLink className={styles.optionsButton} activeClassName={styles.activeButton} to={`/seekermanagement/applications`}>
                    Applications
                </NavLink>
            </div>
        </div>
    )
}

export default SeekerManagementBar
