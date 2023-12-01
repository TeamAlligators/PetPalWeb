import styles from "./MyListings.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";

function ViewMyListings() {
    return (
        <body className={styles.body}>
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.listingsContainer}>
                <div className={styles.petItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.petTextContainer}>
                        <p>
                            Potato <br />
                            5months
                        </p>
                        <p>Some breed</p>
                    </div>
                    <a className={styles.detailsButton} href="shelter-pet-details.html">See Details</a>
                </div>
                <div className={styles.petItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.petTextContainer}>
                        <p>
                            Potato <br />
                            5months
                        </p>
                        <p>Some breed</p>
                    </div>
                    <a className={styles.detailsButton} href="shelter-pet-details.html">See Details</a>
                </div>
                <div className={styles.petItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.petTextContainer}>
                        <p>
                            Potato <br />
                            5months
                        </p>
                        <p>Some breed</p>
                    </div>
                    <a className={styles.detailsButton} href="shelter-pet-details.html">See Details</a>
                </div>
                <div className={styles.petItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.petTextContainer}>
                        <p>
                            Potato <br />
                            5months
                        </p>
                        <p>Some breed</p>
                    </div>
                    <a className={styles.detailsButton} href="shelter-pet-details.html">See Details</a>
                </div>
                <div className={styles.petItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.petTextContainer}>
                        <p>
                            Potato <br />
                            5months
                        </p>
                        <p>Some breed</p>
                    </div>
                    <a className={styles.detailsButton} href="shelter-pet-details.html">See Details</a>
                </div>
                <div className={styles.petItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.petTextContainer}>
                        <p>
                            Potato <br />
                            5months
                        </p>
                        <p>Some breed</p>
                    </div>
                    <a className={styles.detailsButton} href="shelter-pet-details.html">See Details</a>
                </div>
                <div className={styles.petItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.petTextContainer}>
                        <p>
                            Potato <br />
                            5months
                        </p>
                        <p>Some breed</p>
                    </div>
                    <a className={styles.detailsButton} href="shelter-pet-details.html">See Details</a>
                </div>
                <div className={styles.petItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.petTextContainer}>
                        <p>
                            Potato <br />
                            5months
                        </p>
                        <p>Some breed</p>
                    </div>
                    <a className={styles.detailsButton} href="shelter-pet-details.html">See Details</a>
                </div>
                <div className={styles.petItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.petTextContainer}>
                        <p>
                            Potato <br />
                            5months
                        </p>
                        <p>Some breed</p>
                    </div>
                    <a className={styles.detailsButton} href="shelter-pet-details.html">See Details</a>
                </div>
                <div className={styles.petItem}>
                    <img className={styles.petImg} src={require("../../images/derpycat.png")} />
                    <div className={styles.petTextContainer}>
                        <p>
                            Potato <br />
                            5months
                        </p>
                        <p>Some breed</p>
                    </div>
                    <a className={styles.detailsButton} href="shelter-pet-details.html">See Details</a>
                </div>
            </div>
        </body>
    )
}

export default ViewMyListings