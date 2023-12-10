import styles from "./PetCreation.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../../context/UserContext";
import Endpoints from "../../constants/Endpoints";
import { useNavigate } from "react-router-dom";

function PetCreation() {
    const user = useUser()
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [formDataUpdated, setFormDataUpdated] = useState(false);
    const [formData, setFormData] = useState({
        shelter: "",
        name: "",
        age: "",
        species: "",
        breed: "",
        size: "",
        gender: "Male",
        photo: null,
        status: "available",
        birthday: null,
        medical_history: "",
        special_needs: "",
        personality: "",
        others: "",
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    useEffect(() => {
        if (formDataUpdated) {
            console.log("Form data:", formData);
            setFormDataUpdated(false);
        }
    }, [formData, formDataUpdated]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "age" || name === "size" ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // get the shelter id by getting specific shelter
            const shelterResponse = await axios.get(Endpoints.specificshelter.replace(":pk", user.userId), {
                headers: {
                    "Authorization": "Bearer " + user.token,
                },
            });
            const shelterId = shelterResponse.data.id;

            // idk do something to image

            setFormData((prevData) => ({
                ...prevData,
                shelter: shelterId,
                photo: file,
            }));
            setFormDataUpdated(true);
        } catch (error) {
            console.error("Error getting shelter ID:", error);
        }
    };

    useEffect(() => {
        if (formDataUpdated) {
            const createPet = async () => {
                try {
                    const endpoint = Endpoints.pets;

                    const response = await axios.post(endpoint, formData, {
                        headers: {
                            "Authorization": "Bearer " + user.token,
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    console.log("Pet created successfully:", response.data);

                    // redirect to the actual pet page
                    const petId = response.data.id;
                    navigate(`/pets/${petId}`);
                } catch (error) {
                    console.error("Error creating pet:", error);
                }
            };
            createPet();
            setFormDataUpdated(false);
        }
    }, [formDataUpdated, formData, user.token, navigate]);


    return (
        <body className={styles.pageContainer}>
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.shelterManagement}>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="status"
                                type="text"
                                name="status"
                                placeholder="Status of adoption"
                                value="available"
                                onChange={handleChange}
                                disabled
                                required
                            />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="species"
                                type="text"
                                name="species"
                                placeholder="Species"
                                value={formData.species}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="breed"
                                type="text"
                                name="breed"
                                placeholder="Breed"
                                value={formData.breed}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="age"
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.gridItem}>
                            <select
                                className={styles.selectField}
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="size"
                                type="number"
                                name="size"
                                placeholder="Size (in kg)"
                                value={formData.size}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.gridItem}>
                            <input
                                id="birthday"
                                type="date"
                                name="birthday"
                                placeholder="Birthday"
                                value={formData.birthday}
                                onChange={handleChange}

                            />
                        </div>
                        <div className={styles.gridItem}>
                            <textarea
                                rows="4"
                                id="medicalhistory"
                                type="text"
                                name="medical_history"
                                placeholder="Medical history"
                                value={formData.medical_history}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className={styles.gridItem}>
                            <textarea
                                rows="4"
                                id="specialneeds"
                                type="text"
                                name="special_needs"
                                placeholder="Special needs or requirements"
                                value={formData.special_needs}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className={styles.gridItem}>
                            <textarea
                                rows="4"
                                id="behaviour"
                                type="text"
                                name="personality"
                                placeholder="Behaviour / Personality"
                                value={formData.personality}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className={styles.gridItem}>
                            <textarea
                                rows="4"
                                id="others"
                                type="text"
                                name="others"
                                placeholder="Other description"
                                value={formData.others}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                    <button className={styles.save} type="submit">Save</button>
                </form>
            </div>
        </body>
    )
}

export default PetCreation;