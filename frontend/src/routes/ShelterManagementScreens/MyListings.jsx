import React, { useState, useEffect } from 'react';
import styles from "./MyListings.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";
import axios from 'axios';
import useUser from "../../context/UserContext";
import Endpoints from '../../constants/Endpoints';
import { NavLink } from "react-router-dom";
import Alert from "../../components/Alert";

function ViewMyListings() {
    const user = useUser();
    const [shelterId, setShelterId] = useState(null);
    const [searchResults, setSearchResults] = useState([])
    const [errorMessage, setErrorMessage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState(null)
    const [previousPageUrl, setPreviousPageUrl] = useState(null)

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
            setErrorMessage("Failed to get your pet listings. Are you logged in?");
            setShowAlert(true);
        }
    };

    const fetchPetListings = async (url) => {
        if (!shelterId) return;

        try {
            let endpoint = Endpoints.petresults;
            if (url) {
                endpoint = url;
            }
            const response = await axios.get(endpoint, { params: { shelterId } });
            setSearchResults(response.data.results)
            console.log("pet listings response", response)
            setNextPageUrl(response.data.next)
            setPreviousPageUrl(response.data.previous)
        } catch (error) {
            console.error('Error fetching pet listings:', error);
            setErrorMessage("Failed to get your pet listings. Are you logged in?");
            setShowAlert(true);
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
            <Alert
                show={showAlert}
                success={false}
                message={errorMessage}
                onClose={() => setShowAlert(false)}
            />
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.listingsContainer}>
                {searchResults.map((pet) => (
                    <div key={pet.id} className={styles.petItem}>
                        <img className={styles.petImg} src={pet.photo ? pet.photo : require("../../images/temppet.png")} alt={pet.name} />
                        <div className={styles.petTextContainer}>
                            <p>
                                {pet.name} <br />
                                {pet.age} year(s) old
                            </p>
                            <p>{pet.status.charAt(0).toUpperCase() + pet.status.slice(1)} <br />
                                {pet.breed}
                            </p>
                        </div>
                        <NavLink className={styles.detailsButton} to={`/pets/${pet.id}`}> See Details </NavLink>
                    </div>
                ))}
            </div>
            <div className={styles.footerContainer}>
                <button
                    className={styles.paginationButton}
                    onClick={() => fetchPetListings(previousPageUrl)}
                >
                    {"<"}
                </button>
                <button
                    className={styles.paginationButton}
                    onClick={() => fetchPetListings(nextPageUrl)}
                >
                    {">"}
                </button>
            </div>
        </body>
    )
}

export default ViewMyListings