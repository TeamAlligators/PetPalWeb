import React, { useState, useEffect } from 'react';
import styles from "./MyApplications.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";
import axios from 'axios';
import useUser from "../../context/UserContext";
import Endpoints from '../../constants/Endpoints';
import { NavLink } from "react-router-dom";

function ViewMyApplications() {
    const user = useUser();
    const [petDetails, setPetDetails] = useState({});
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [searchResults, setSearchResults] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState(null)
    const [previousPageUrl, setPreviousPageUrl] = useState(null)

    const fetchApplications = async (status) => {
        try {
            const response = await axios.get(Endpoints.applications, {
                params: {
                    status: status !== "all" ? status : undefined,
                },
                headers: {
                    "Authorization": "Bearer " + user.token,
                },
            });
            setSearchResults(response.data.results);
            setNextPageUrl(response.data.next)
            setPreviousPageUrl(response.data.previous)

            // Fetch pet details for all applications
            const petIds = response.data.results.map(application => application.pet);
            const petDetails = await fetchPetDetailsForMultiplePets(petIds);
            setPetDetails(petDetails);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const fetchPetDetailsForMultiplePets = async (petIds) => {
        const petDetails = {};
        try {
            const response = await axios.get(Endpoints.pets);
            const petResults = response.data || [];

            petResults.forEach(pet => {
                if (petIds.includes(pet.id)) {
                    petDetails[pet.id] = pet;
                }
            });
        } catch (error) {
            console.error('Error fetching pet details:', error);
        }
        return petDetails;
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setSelectedStatus(newStatus);
        fetchApplications(newStatus);
    };

    useEffect(() => {
        fetchApplications(selectedStatus);
    }, [user.token, selectedStatus]);

    return (
        <body className={styles.body}>
            <NavBar />
            <ShelterManagementBar />
            <div className={styles.filterContainer}>
                <label className={styles.selectFieldLabel} htmlFor="statusFilter">Filter:</label>
                <select
                    className={styles.selectField}
                    id="statusFilter"
                    name="statusFilter"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="denied">Denied</option>
                    <option value="withdrawn">Withdrawn</option>
                </select>
            </div>
            <div className={styles.allResults}>
                {searchResults.map(application => {
                    const petDetail = petDetails[application.pet];
                    return (
                        <div key={application.id} className={styles.applicationItem}>
                            <img className={styles.petImg} src={petDetail?.photo ? petDetail?.photo : require("../../images/temppet.png")} alt={petDetail?.name} />
                            <div className={styles.applicationTextContainer}>
                                <h2 className={styles.applicationTitle}> Pet Seeker: {application.first_name + ' ' + application.last_name}</h2>
                                <h2 className={styles.applicationTitle}> Wants to adopt... </h2>
                                <p className={styles.applicationText}> {petDetail?.name} - {petDetail?.breed}</p>
                                <p className={styles.applicationText}>{petDetail?.age} month(s) old</p>
                                <p className={styles.applicationText}>Status: {application.status.charAt(0).toUpperCase() + application.status.slice(1)}</p>
                                <p className={styles.applicationText}>Applied on: {application.application_date}</p>
                            </div>
                            <NavLink className={styles.detailsButton} to={`/petapplication/${application.id}`}> See Details </NavLink>
                        </div>
                    );
                })}
            </div>
            <div className={styles.footerContainer}>
                <button
                    className={styles.paginationButton}
                    onClick={() => fetchApplications(previousPageUrl)}
                >
                    {"<"}
                </button>
                <button
                    className={styles.paginationButton}
                    onClick={() => fetchApplications(nextPageUrl)}
                >
                    {">"}
                </button>
            </div>
        </body>
    );
}

export default ViewMyApplications;
