import styles from "./UpdateSeekerAccount.module.css";
import NavBar from "../../components/NavBar";
import useUser from "../../context/UserContext"
import { useState, useEffect } from "react";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";

function UpdateSeeker() {
    const user = useUser()
    console.log(user)

    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        mission: "",
        firstname: "",
        lastname: "",
        email: "",
        sheltername: "",
        phonenum: "",
        country: "",
        province: "",
        address: "",
        postalcode: "",
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        // Set the initial form data when the component mounts
        setFormData({
            mission: user.shelter.mission || "",
            firstname: user.first_name || "",
            lastname: user.last_name || "",
            email: user.email || "",
            sheltername: user.shelter.name || "",
            phonenum: user.shelter.phone || "",
            country: user.shelter.country || "",
            province: user.shelter.province || "",
            address: user.shelter.address || "",
            postalcode: user.postal_code || "",
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const endpoint = Endpoints.updateshelter.replace(":pk", user.id);
    //         const response = await axios.put(endpoint, formData);
    //         console.log("User updated successfully:", response.data);
    //     } catch (error) {
    //         console.error("Error updating user:", error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Include image data in the user update request
            const formDataWithImage = new FormData();
            formDataWithImage.append("profileImg", file);
            Object.entries(formData).forEach(([key, value]) => {
                formDataWithImage.append(key, value);
            });
            // Update user data and upload profile image
            const endpoint = Endpoints.updateshelter.replace(":pk", 1);
            const response = await axios.put(endpoint, formDataWithImage, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            console.log("User updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <body className={styles.pageContainer}>
            <NavBar />
            <div className={styles.seekerManagement}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.profileContainer}>
                        {/* <img className={styles.profileImg} src={require("../../images/profile1.png")} /> */}
                        <label htmlFor="profileImg" className={styles.profileImgLabel}>
                            <img
                                className={styles.profileImg}
                                src={file ? URL.createObjectURL(file) : require("../../images/profile1.png")}
                                alt="Profile"
                            />
                        </label>
                        <input
                            id="profileImg"
                            className={styles.profileImgInput}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className={styles.gridContainer}>
                        <div className={styles.gridItem}>
                            <input
                                id="firstname"
                                type="text"
                                name="firstname"
                                placeholder="First name"
                                value={formData.firstname}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="lastname"
                                type="text"
                                name="lastname"
                                placeholder="Last name"
                                value={formData.lastname}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="phonenum"
                                type="text"
                                name="phonenum"
                                placeholder="Phone #"
                                value={formData.phonenum}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="country"
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="province"
                                type="text"
                                name="province"
                                placeholder="Province"
                                value={formData.province}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="postalcode"
                                type="text"
                                name="postalcode"
                                placeholder="Postal Code"
                                value={formData.postalcode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button className={styles.save} type="submit">Save</button>
                </form>
            </div>
        </body>
    )
}

export default UpdateSeeker