import React, { useState, useEffect } from 'react';
import styles from "./MyListings.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";
import axios from 'axios';
import useUser from "../../context/UserContext";
import Endpoints from '../../constants/Endpoints';
import { NavLink } from "react-router-dom";

function ViewMyListings() {
    const user = useUser();
    const [petListings, setPetListings] = useState([]);
    const [shelterId, setShelterId] = useState(null);

    const fetchShelterId = async () => {
        try {
            // Get the shelter id by getting specific shelter
            const shelterResponse = await axios.get(Endpoints.specificshelter.replace(":pk", user.userId), {
                headers: {
                    "Authorization": "Bearer " + user.token,
                },
            });
            setShelterId(shelterResponse.data.id);
        } catch (error) {
            console.error("Error getting shelter ID:", error);
        }
    };

    const fetchPetListings = async () => {
        if (!shelterId) return;

        try {
            const response = await axios.get(Endpoints.petresults, { params: { shelterId } });
            setPetListings(response.data.results);
            console.log(petListings, "hello?");
        } catch (error) {
            console.error('Error fetching pet listings:', error);
        }
    };

    useEffect(() => {
        fetchShelterId();
    }, []);

    useEffect(() => {
        fetchPetListings();
    }, [shelterId]);

    return (
        <body className={styles.body}>
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.listingsContainer}>
                {petListings.map((pet) => (
                    <div key={pet.id} className={styles.petItem}>
                        <img className={styles.petImg} src={pet.photo ? pet.photo : require("../../images/temppet.png")} alt={pet.name} />
                        <div className={styles.petTextContainer}>
                            <p>
                                {pet.name} <br />
                                {pet.age} month(s)
                            </p>
                            <p>{pet.status.charAt(0).toUpperCase() + pet.status.slice(1)} <br />
                                {pet.breed}
                            </p>
                        </div>
                        <NavLink to={`/petdetails/${pet.id}`}> See Details </NavLink>
                    </div>
                ))}
            </div>
        </body>
    )

}

export default ViewMyListings