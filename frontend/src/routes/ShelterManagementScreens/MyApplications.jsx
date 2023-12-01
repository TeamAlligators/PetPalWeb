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
                        <h2>
                            Pet Seeker: Herman Vuong <br />
                            Wants to adopt...
                        </h2>
                        <p>
                            Puss in boots <br />
                            5 months old - Some breed
                        </p>
                        <p>Application received on: 2023/09/23</p>
                    </div>
                    <a className={styles.detailsButton} href="pet-applications-filled.html">See Details</a>
                </div>
                <div className={styles.applicationItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.applicationTextContainer}>
                        <h2>
                            Pet Seeker: Herman Vuong <br />
                            Wants to adopt...
                        </h2>
                        <p>
                            Puss in boots <br />
                            5 months old - Some breed
                        </p>
                        <p>Application received on: 2023/09/23</p>
                    </div>
                    <a className={styles.detailsButton} href="pet-applications-filled.html">See Details</a>
                </div>
                <div className={styles.applicationItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.applicationTextContainer}>
                        <h2>
                            Pet Seeker: Herman Vuong <br />
                            Wants to adopt...
                        </h2>
                        <p>
                            Puss in boots <br />
                            5 months old - Some breed
                        </p>
                        <p>Application received on: 2023/09/23</p>
                    </div>
                    <a className={styles.detailsButton} href="pet-applications-filled.html">See Details</a>
                </div>
                <div className={styles.applicationItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.applicationTextContainer}>
                        <h2>
                            Pet Seeker: Herman Vuong <br />
                            Wants to adopt...
                        </h2>
                        <p>
                            Puss in boots <br />
                            5 months old - Some breed
                        </p>
                        <p>Application received on: 2023/09/23</p>
                    </div>
                    <a className={styles.detailsButton} href="pet-applications-filled.html">See Details</a>
                </div>
                <div className={styles.applicationItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.applicationTextContainer}>
                        <h2>
                            Pet Seeker: Herman Vuong <br />
                            Wants to adopt...
                        </h2>
                        <p>
                            Puss in boots <br />
                            5 months old - Some breed
                        </p>
                        <p>Application received on: 2023/09/23</p>
                    </div>
                    <a className={styles.detailsButton} href="pet-applications-filled.html">See Details</a>
                </div>
                <div className={styles.applicationItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.applicationTextContainer}>
                        <h2>
                            Pet Seeker: Herman Vuong <br />
                            Wants to adopt...
                        </h2>
                        <p>
                            Puss in boots <br />
                            5 months old - Some breed
                        </p>
                        <p>Application received on: 2023/09/23</p>
                    </div>
                    <a className={styles.detailsButton} href="pet-applications-filled.html">See Details</a>
                </div>
            </div>
        </body>
	)
}

export default ViewMyApplications