import styles from "./UpdateSeekerAccount.module.css";
import NavBar from "../../components/NavBar";
import useUser from "../../context/UserContext"
import { useState, useEffect } from "react";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";

function UpdateSeeker() {
    const user = useUser()

    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        seeker: {
            photo: null,
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
            seeker: {
                photo: null,
            },
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            password: "",
            account_type: "seeker",
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
            const endpoint = Endpoints.updateseeker.replace(":pk", user.userId);
            let newUserData = {};
            // if (file) {
            //     newUserData = {
            //         first_name: formData.first_name,
            //         last_name: formData.last_name,
            //         email: formData.email,
            //         password: formData.password,
            //         account_type: formData.account_type,
            //         seeker: {
            //             photo: file,
            //         },
            //     }
            // } else {
            //     newUserData = {
            //         first_name: formData.first_name,
            //         last_name: formData.last_name,
            //         email: formData.email,
            //         password: formData.password,
            //         account_type: formData.account_type,
            //         seeker: {},
            //     };
            // }

            // console.log(newUserData, "newUserData")

            // const response = await axios.put(endpoint, newUserData, {
            //     headers: {
            //         Authorization: `Bearer ${user.token}`,
            //     },
            // });

            const formData = new FormData();
            formData.append("first_name", formData.first_name);
            formData.append("last_name", formData.last_name);
            formData.append("email", formData.email);
            formData.append("password", formData.password);
            if (file) {
                formData.append("seeker[photo]", file);
            }

            console.log(formData, "formData");


            const response = await axios.put(endpoint, formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            user.setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                first_name: newUserData.first_name,
                last_name: newUserData.last_name,
                email: newUserData.email,
            }));

            console.log("User updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating user:", error);
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