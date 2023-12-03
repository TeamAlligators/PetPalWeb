import styles from "./UpdateSeekerAccount.module.css";
import NavBar from "../../components/NavBar";
import useUser from "../../context/UserContext"

function UpdateSeeker() {
    const user = useUser()
    console.log(user)
    return (
        <body className={styles.pageContainer}>
            <NavBar />
            <div className={styles.seekerManagement}>
                <form className={styles.form} action="">
                    <div className={styles.profileContainer}>
                        <img className={styles.profileImg} src={require("../../images/profile1.png")} />
                    </div>
                    <div className={styles.gridContainer}>
                        <div className={styles.gridItem}>
                            <input id="firstname" type="text" name="firstname" placeholder="First name" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="lastname" type="text" name="lastname" placeholder="Last name" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="email" type="email" name="email" placeholder="Email" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="sheltername" type="text" name="sheltername" placeholder="Shelter name" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="phonenum" type="text" name="phonenum" placeholder="Phone #" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="country" type="text" name="country" placeholder="Country" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="province" type="text" name="province" placeholder="Province" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="address" type="text" name="address" placeholder="Address" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="postalcode" type="text" name="postalcode" placeholder="Postal Code" required />
                        </div>
                    </div>
                    <button className={styles.save} type="submit">Save</button>
                </form>
            </div>
        </body>
    )
}

export default UpdateSeeker