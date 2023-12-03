import styles from "./MyApplications.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";

function ViewMyApplications() {
    return (
        <body className={styles.body}>
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.allResults}>
                <div className={styles.applicationItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.applicationTextContainer}>
                        <h2 className={styles.applicationTitle}> Pet Seeker: Herman Vuong </h2>
                        <h2 className={styles.applicationTitle}> Wants to adopt... </h2>
                        <p className={styles.applicationText}> Puss in boots </p>
                        <p className={styles.applicationText}> 5 months old - Some breed </p>
                        <p className={styles.applicationText}>2023/09/23</p>
                    </div>
                    <a className={styles.detailsButton} href="pet-applications-filled.html">See Details</a>
                </div>
            </div>
        </body >
    )
}

export default ViewMyApplications