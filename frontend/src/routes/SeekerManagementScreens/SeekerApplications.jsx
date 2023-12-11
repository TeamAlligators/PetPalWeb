import React, { useState, useEffect } from 'react';
import styles from "./SeekerApplications.module.css";
import SeekerManagementBar from "../../components/SeekerManagementBar";
import NavBar from "../../components/NavBar";
import axios from 'axios';
import useUser from "../../context/UserContext";
import Endpoints from '../../constants/Endpoints';
import { NavLink } from "react-router-dom";
import Alert from "../../components/Alert";

function ViewSeekerApplication() {
    const user = useUser();
    const [petDetails, setPetDetails] = useState({});
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedSort, setSelectedSort] = useState("application_date");
    const [searchResults, setSearchResults] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState(null)
    const [previousPageUrl, setPreviousPageUrl] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const fetchApplications = async (status, sort, url) => {
        try {
            let endpoint = Endpoints.applications;
            if (url) {
                endpoint = url;
            }
            const response = await axios.get(endpoint, {
                params: {
                    status: status !== "all" ? status : undefined,
                    sort: sort,
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
            setErrorMessage("Failed to get your applications. Are you logged in?");
            setShowAlert(true);
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
            setErrorMessage("Failed to get your applications. Are you logged in?");
            setShowAlert(true);
        }
        return petDetails;
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setSelectedStatus(newStatus);
        fetchApplications(newStatus, selectedSort);
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSelectedSort(newSort);
        fetchApplications(selectedStatus, newSort);
    };

    useEffect(() => {
        fetchApplications(selectedStatus, selectedSort);
    }, [user.token, selectedStatus, selectedSort]);

    return (
        <body className={styles.body}>
            <Alert
                show={showAlert}
                success={false}
                message={errorMessage}
                onClose={() => setShowAlert(false)}
            />
            <NavBar />
            <SeekerManagementBar />
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
                {/* sort by either application date or last updated. have a none option */}
                <label className={styles.sortFieldLabel} htmlFor="sortFilter">Sort by:</label>
                <select
                    className={styles.sortField}
                    id="sortFilter"
                    name="sortFilter"
                    value={selectedSort}
                    onChange={handleSortChange}
                >
                    <option value="application_date">Application Date</option>
                    <option value="last_updated">Last Updated</option>
                </select>
            </div>
            <div className={styles.allResults}>
                {searchResults.map(application => {
                    const petDetail = petDetails[application.pet];
                    return (
                        <div key={application.id} className={styles.applicationItem}>
                            <img className={styles.petImg} src={petDetail?.photo ? petDetail?.photo : require("../../images/temppet.png")} alt={petDetail?.name} />
                            <div className={styles.applicationTextContainer}>
                                <h2 className={styles.applicationTitle}> You've applied to adopt... </h2>
                                <p className={styles.applicationText}> {petDetail?.name} - {petDetail?.breed}</p>
                                <p className={styles.applicationText}>{petDetail?.age} year(s) old</p>
                                <p className={styles.applicationText}>Status: {application.status.charAt(0).toUpperCase() + application.status.slice(1)}</p>
                                <p className={styles.applicationText}>Applied on: {application.application_date}</p>
                            </div>
                            <NavLink className={styles.detailsButton} to={`/petapplicationfilled/${application.id}`}> See Details </NavLink>
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

export default ViewSeekerApplication;
