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
    const [formDataUpdated, setFormDataUpdated] = useState(false);
    const [formData, setFormData] = useState({
        shelter: {
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
        password: "",
        account_type: "shelter",
        photo: null,
    });

    useEffect(() => {
        if (formDataUpdated) {
            console.log("Form data:", formData);
            setFormDataUpdated(false);
        }
    }, [formData, formDataUpdated]);

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
            photo: user.photo || null,
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            shelter: {
                ...prevData.shelter,
                [name]: value,
            },
            [name]: value,
        }));
    };

    useEffect(() => {
        if (formDataUpdated) {
            const updateUser = async () => {
                try {
                    const endpoint = Endpoints.updateshelter.replace(":pk", user.userId);

                    const response = await axios.put(endpoint, formData, {
                        headers: {
                            "Authorization": "Bearer " + user.token,
                            // "Content-Type": "multipart/form-data",
                        },
                    });
                    console.log("User updated successfully:", response.data);

                    // Update user info in context
                    user.setUserInfo({
                        ...user,
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        email: response.data.email,
                        shelter: response.data.shelter,
                        photo: response.data.photo,
                    });
                } catch (error) {
                    console.error("Error updating user:", error);
                }
            };
            updateUser();
            setFormDataUpdated(false);
        }
    }, [formDataUpdated, formData, user.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setFormData((prevData) => ({
                ...prevData,
                photo: file,
                shelter: {
                    ...prevData.shelter,
                },
            }));

            setFormDataUpdated(true);
        } catch (error) {
            console.error("Error updating asdfasdfuser:", error);
        }
    };

    return (
        <body className={styles.pageContainer}>
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.shelterManagement}>
                <form className={styles.form} enctype="multipart/form-data" onSubmit={handleSubmit}>
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
                                name="first_name"
                                placeholder="First name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="lastname"
                                type="text"
                                name="last_name"
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
                                value={user.email}
                                disabled />
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
                                name="name"
                                placeholder="Shelter name"
                                value={formData.shelter.name}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="phonenum"
                                type="text"
                                name="phone"
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
                                name="postal_code"
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