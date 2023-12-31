import styles from "./UpdateShelterAccount.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";
import useUser from "../../context/UserContext"
import { useState, useEffect } from "react";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

function UpdateShelter() {
    const user = useUser()
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [formDataUpdated, setFormDataUpdated] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
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
            // setFormDataUpdated(false);
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
            photo: null,
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

                    console.log("Form data222:", formData);

                    const response = await axios.put(endpoint, formData, {
                        headers: {
                            "Authorization": "Bearer " + user.token
                        },
                    });
                    console.log("User updated successfully:", response.data);

                    // Update user info in context
                    user.setUserInfo({
                        ...user,
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                        email: formData.email,
                        shelter: {
                            ...user.shelter,
                            name: formData.shelter.name,
                            phone: formData.shelter.phone,
                            country: formData.shelter.country,
                            province: formData.shelter.province,
                            address: formData.shelter.address,
                            postal_code: formData.shelter.postal_code,
                            mission: formData.shelter.mission,
                        },
                    });
                    // Call handlePhotoSubmit if there is a file
                    if (file) {
                        await handlePhotoSubmit();
                    }
                } catch (error) {
                    console.error("Error updating user:", error);
                    setErrorMessage("Failed to update user. Please try again.");
                    setShowAlert(true);
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
                shelter: {
                    ...prevData.shelter,
                },
            }));

            setFormDataUpdated(true);
        } catch (error) {
            console.error("Error updating asdfasdfuser:", error);
            setErrorMessage("Failed to update user. Please try again.");
            setShowAlert(true);
        }
    };

    const handlePhotoSubmit = async () => {
        const photoFormData = new FormData();
        photoFormData.append('photo', file);

        try {
            const photoEndpoint = Endpoints.profilephoto.replace(":pk", user.userId);
            const photoResponse = await axios.put(photoEndpoint, photoFormData, {
                headers: {
                    "Authorization": "Bearer " + user.token,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("User photo updated successfully:", photoResponse.data);

            // Update user info in context
            user.setUserInfo({
                ...user,
                photo: photoResponse.data.photo,
            });
        } catch (error) {
            console.error("Error updating user photo:", error);
            setErrorMessage("Failed to update user. Please try again.");
            setShowAlert(true);
        }
    };

    useEffect(() => {
        console.log("User info:", user);
        if (user.photo) {
            console.log("User photo:", user.photo);
        }
    }, [user]);

    const handleDeleteAccount = async () => {
        try {
            const endpoint = Endpoints.specificshelter.replace(":pk", user.userId);
            await axios.delete(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                },
            });
            // remove user from context
            user.setUserInfo(null);
            // redirect to login page
            navigate("/login");
            console.log('Shelter deleted successfully');
        } catch (error) {
            console.error('Error deleting shelter:', error);
            setErrorMessage("Failed to delete shelter. Please try again.");
            setShowAlert(true);
        }
    };

    return (
        <body className={styles.pageContainer}>
            <Alert
                show={showAlert}
                success={false}
                message={errorMessage}
                onClose={() => setShowAlert(false)}
            />
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.shelterManagement}>
                <form className={styles.form} enctype="multipart/form-data" onSubmit={handleSubmit}>
                    <div className={styles.profileContainer}>
                        {/* <img className={styles.profileImg} src={require("../../images/profile1.png")} /> */}
                        <label htmlFor="profileImg" className={styles.profileImgLabel}>
                            <img
                                className={styles.profileImg}
                                src={user.photo ? user.photo : (file ? URL.createObjectURL(file) : require("../../images/profile1.png"))}
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
                    <div className={styles.buttonContainer}>
                        <button className={styles.back} type="delete" onClick={handleDeleteAccount}>Delete Account</button>
                        <button className={styles.save} type="submit">Save</button>
                    </div>
                </form>
            </div >
        </body >
    )
}

export default UpdateShelter