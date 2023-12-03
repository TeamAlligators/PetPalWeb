import styles from "./UpdateShelterAccount.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";
import useUser from "../../context/UserContext"
import { useState, useEffect } from "react";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";

function UpdateShelter() {
    const user = useUser()
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        shelter: {
            photo: null,
            name: "",
            phone: "",
            country: "",
            province: "",
            address: "",
            postal_code: "",
            mission: "",
        },
        first_name: "",
        last_name: "",
        email: "",
        account_type: "shelter",
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        // Set the initial form data when the component mounts
        setFormData({
            shelter: {
                mission: user.shelter.mission || "",
                name: user.shelter.name || "",
                phone: user.shelter.phone || "",
                country: user.shelter.country || "",
                province: user.shelter.province || "",
                address: user.shelter.address || "",
                postal_code: user.shelter.postal_code || "",
            },
            password: "",
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            account_type: "shelter",
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
            console.log(user)
            const endpoint = Endpoints.updateshelter.replace(":pk", user.userId);
            console.log(formData, "withoutimg")
            const newUserData = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                account_type: formData.account_type,
                shelter: {
                    name: formData.shelter.name,
                    phone: formData.shelter.phone,
                    country: formData.shelter.country,
                    province: formData.shelter.province,
                    address: formData.shelter.address,
                    postal_code: formData.shelter.postal_code,
                    mission: formData.shelter.mission,
                }
            }
            console.log(newUserData, "withimg")
            const response = await axios.put(endpoint, newUserData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log("User updated successfully:", response.data);
            // add in file for photo
            if (file) {
                const form = new FormData();
                form.append("photo", file);
                const photoResponse = await axios.put(
                    Endpoints.updateshelter.replace(":pk", user.userId),
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log("Photo updated successfully:", photoResponse.data);
            }
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
                    <div className={styles.gridItem2}>
                        <textarea
                            rows="4"
                            id="mission"
                            type="text"
                            name="mission"
                            placeholder="Mission statement - include what your vision and goals are!"
                            value={formData.shelter.mission}
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
                                value={formData.first_name}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="lastname"
                                type="text"
                                name="lastname"
                                placeholder="Last name"
                                value={formData.last_name}
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
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="sheltername"
                                type="text"
                                name="sheltername"
                                placeholder="Shelter name"
                                value={formData.shelter.name}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="phonenum"
                                type="text"
                                name="phonenum"
                                placeholder="Phone #"
                                value={formData.shelter.phone}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="country"
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.shelter.country}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="province"
                                type="text"
                                name="province"
                                placeholder="Province"
                                value={formData.shelter.province}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.shelter.address}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="postalcode"
                                type="text"
                                name="postalcode"
                                placeholder="Postal Code"
                                value={formData.shelter.postal_code}
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