import styles from "./PetUpdate.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";

function PetUpdate() {
    return (
        <body className={styles.body}>
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.shelterManagement}>
                <h1>Derpy Cat (m)</h1>
        
                <div className={styles.petImgContainer}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} alt="derpycat" />
                </div>
        
                <div className={styles.gridContainer}>
                    <p><b>Status: </b>Available</p>
                    <p><b>Birthday: </b>January 1st, 2023 (9 months)</p>
            
                    <p><b>Medical History: </b>Neutered, de-wormed, up to date on vaccines</p>
                    <p><b>Special Needs/Requirements: </b>N/A</p>
                    <p><b>Personality: </b>A handsome boy :&#41</p>
            
                    <a href="pet-application-edit.html">
                        <button className={styles.button} type="submit">EDIT</button>
                    </a>
                    <a href="shelter-listings.html">
                        <button className={styles.button} type="submit">CLOSE</button>
                    </a>
                </div>
            </div>
        </body>
    )
}

export default PetUpdate
