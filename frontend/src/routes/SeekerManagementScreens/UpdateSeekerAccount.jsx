import styles from "./UpdateSeekerAccount.module.css";
import NavBar from "../../components/NavBar";
import useUser from "../../context/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";

function UpdateSeeker() {
    const user = useUser();
    const [formDataUpdated, setFormDataUpdated] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        seeker: {
        },
        first_name: "",
        last_name: "",
        email: "",
        account_type: "seeker",
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
            seeker: {
            },
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            password: "",
            account_type: "seeker",
            photo: user.photo || null,
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            seeker: {
                ...prevData.seeker,
            },
            [name]: value,
        }));
    };

    useEffect(() => {
        if (formDataUpdated) {
            const updateUser = async () => {
                try {
                    const endpoint = Endpoints.updateseeker.replace(":pk", user.userId);

                    const response = await axios.put(endpoint, formData, {
                        headers: {
                            "Authorization": "Bearer " + user.token,
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    console.log("User updated successfully:", response.data);

                    // Update user context
                    user.setUserInfo({
                        ...user,
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        email: response.data.email,
                        seeker: response.data.seeker,
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
            <div className={styles.seekerManagement}>
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
                                value={formData.email}
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
                    </div>
                    <button className={styles.save} type="submit">Save</button>
                </form>
            </div>
        </body>
    )
}

export default UpdateSeeker