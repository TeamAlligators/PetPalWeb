import styles from "./PetCreation.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";
import { useState } from "react";

function PetCreation() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    return (
        <body className={styles.pageContainer}>
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.shelterManagement}>
                <form className={styles.form} action="">
                    <div className={styles.petImgContainer}>
                        <label htmlFor="petImg" className={styles.petImgLabel}>
                            <img
                                className={styles.petImg}
                                src={file ? URL.createObjectURL(file) : require("../../images/temppet.png")}
                                alt="Profile"
                            />
                        </label>
                        <input
                            id="petImg"
                            className={styles.petImgInput}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className={styles.gridContainer}>
                        <div className={styles.gridItem}>
                            <input id="name" type="text" name="name" placeholder="Name" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="status" type="text" name="status" placeholder="Status of adoption" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="species" type="text" name="species" placeholder="Species" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="breed" type="text" name="breed" placeholder="Breed" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="age" type="text" name="age" placeholder="Age" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="gender" type="text" name="gender" placeholder="Gender" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="size" type="text" name="size" placeholder="Size (in kg)" required />
                        </div>
                        <div className={styles.gridItem}>
                            <input id="birthday" type="text" name="birthday" placeholder="Birthday" required />
                        </div>
                        <div className={styles.gridItem}>
                            <textarea rows="4" id="medicalhistory" type="text" name="medicalhistory" placeholder="Medical history" required></textarea>
                        </div>
                        <div className={styles.gridItem}>
                            <textarea rows="4" id="specialneeds" type="text" name="specialneeds" placeholder="Special needs or requirements" required></textarea>
                        </div>
                        <div className={styles.gridItem}>
                            <textarea rows="4" id="behaviour" type="text" name="behaviour" placeholder="Behaviour / Personality" required></textarea>
                        </div>
                        <div className={styles.gridItem}>
                            <textarea rows="4" id="others" type="text" name="others" placeholder="Other description" required></textarea>
                        </div>
                    </div>
                    <button className={styles.save} type="submit">Save</button>
                </form>
            </div>
        </body>
    )
}

export default PetCreation;