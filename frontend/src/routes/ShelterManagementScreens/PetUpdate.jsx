import styles from "./PetUpdate.module.css";
import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../../context/UserContext";
import Endpoints from "../../constants/Endpoints";
import { useNavigate, useParams } from "react-router-dom";

function PetUpdate() {
    const user = useUser();
    const navigate = useNavigate();
    const { pk } = useParams(); // Assuming you are using React Router for the pk parameter
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

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await axios.get(Endpoints.specificpet.replace(":pk", pk));
                const petData = response.data;
                setFormData({
                    shelter: petData.shelter,
                    name: petData.name,
                    age: petData.age,
                    species: petData.species,
                    breed: petData.breed,
                    size: petData.size,
                    gender: petData.gender,
                    photo: petData.photo,
                    status: petData.status,
                    birthday: petData.birthday,
                    medical_history: petData.medical_history,
                    special_needs: petData.special_needs,
                    personality: petData.personality,
                    others: petData.others,
                });
            } catch (error) {
                console.error('Error fetching pet data:', error);
            }
        };

        fetchPetData();
    }, [pk]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    useEffect(() => {
        if (formDataUpdated) {
            const updatePet = async () => {
                try {
                    const endpoint = Endpoints.specificpet.replace(":pk", pk);
                    const response = await axios.put(endpoint, formData, {
                        headers: {
                            "Authorization": "Bearer " + user.token,
                        },
                    });
                    console.log("Pet updated successfully:", response.data);

                    // Redirect to the updated pet page
                    const updatedPetId = response.data.id;
                    navigate(`/pet/${updatedPetId}`);
                } catch (error) {
                    console.error("Error updating pet:", error);
                }
            };
            updatePet();
            setFormDataUpdated(false);
        }
    }, [formDataUpdated, formData, user.token, navigate, pk]);

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
            const endpoint = Endpoints.specificshelter.replace(":pk", user.userId);
            const shelterResponse = await axios.get(endpoint, {
                headers: {
                    "Authorization": "Bearer " + user.token,
                },
            });
            const shelterId = shelterResponse.data.id;
            setFormData((prevData) => ({
                ...prevData,
                shelter: shelterId,
            }));
            setFormDataUpdated(true);
        } catch (error) {
            console.error("Error getting shelter ID:", error);
        }
    };

    return (
        <body className={styles.pageContainer}>
            <NavBar />
            <div className={styles.shelterManagement}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.petImgContainer}>
                        <label htmlFor="petImg" className={styles.petImgLabel}>
                            <img
                                className={styles.petImg}
                                src={file ? URL.createObjectURL(file) : formData.photo || require("../../images/temppet.png")}
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
                            <select
                                className={styles.selectField}
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="available">Available</option>
                                <option value="adopted">Adopted</option>
                                <option value="pending">Pending</option>
                                <option value="withdrawn">Withdrawn</option>
                            </select>
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
                                placeholder="Age (in months)"
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
                                name="medicalhistory"
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
                                name="specialneeds"
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
                                name="behaviour"
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
                        <div className={styles.gridItem}>
                            <button className={styles.back} type="button" onClick={() => navigate(`/pet/${pk}`)}>Back</button>
                        </div>
                        <div className={styles.gridItem}>
                            <button className={styles.save} type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </body >
    )
}

export default PetUpdate
