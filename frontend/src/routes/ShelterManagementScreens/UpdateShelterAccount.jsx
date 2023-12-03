import styles from "./UpdateShelterAccount.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";
import useUser from "../../context/UserContext"
import { useState, useEffect } from "react";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";

function UpdateShelter() {
    const user = useUser()

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endpoint = Endpoints.updateshelter.replace(":pk", user.id);
            const response = await axios.put(endpoint, formData);
            console.log("User updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <body className={styles.pageContainer}>
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.shelterManagement}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.profileContainer}>
                        <img className={styles.profileImg} src={require("../../images/profile1.png")} />
                    </div>
                    <div className={styles.gridItem2}>
                        <textarea
                            rows="4"
                            id="mission"
                            type="text"
                            name="mission"
                            placeholder="Mission statement - include what your vision and goals are!"
                            value={formData.mission}
                            onChange={handleChange}
                            required></textarea>
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
                                id="sheltername"
                                type="text"
                                name="sheltername"
                                placeholder="Shelter name"
                                value={formData.sheltername}
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
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="country"
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="province"
                                type="text"
                                name="province"
                                placeholder="Province"
                                value={formData.province}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="postalcode"
                                type="text"
                                name="postalcode"
                                placeholder="Postal Code"
                                value={formData.postalcode}
                                onChange={handleChange}
                                required />
                        </div>
                    </div>
                    <button className={styles.save} type="submit">Save</button>
                </form>
            </div>
        </body>
    )
}

export default UpdateShelter