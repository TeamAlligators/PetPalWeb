import React, { useState, useEffect } from "react"
import axios from "axios"
import classes from "./ShelterListings.module.css"
import NavBar from "../../components/NavBar"
import useUser from "../../context/UserContext"
import Endpoints from "../../constants/Endpoints"
import { NavLink } from "react-router-dom"
import Alert from "../../components/Alert"

function ShelterListings() {
	const [shelters, setShelters] = useState([])
	const [nextPageUrl, setNextPageUrl] = useState(null)
	const [previousPageUrl, setPreviousPageUrl] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null);
	const [showAlert, setShowAlert] = useState(false);

	const user = useUser()

	const handleSearch = async (url) => {
		try {
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})
			console.log("shetlers repsonse", response)
			setShelters(response.data.results)
			setNextPageUrl(response.data.next)
			setPreviousPageUrl(response.data.previous)
		} catch (error) {
			console.error("Error fetching shelters:", error)
			setErrorMessage("Failed to get shelters. Please try again.");
			setShowAlert(true);
		}
	}

	useEffect(() => {
		const fetchShelters = async () => {
			try {
				const response = await axios.get(Endpoints.shelterlists, {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				})
				console.log("shetlers repsonse", response)
				setShelters(response.data.results)
				setNextPageUrl(response.data.next)
				setPreviousPageUrl(response.data.previous)
			} catch (error) {
				console.error("Error fetching shelters:", error)
				setErrorMessage("Failed to get shelters. Are you logged in?");
				setShowAlert(true);
			}
		}

		fetchShelters()
	}, [user.token])

	return (
		<div className={classes["page-container"]}>
			<Alert
				show={showAlert}
				success={false}
				message={errorMessage}
				onClose={() => setShowAlert(false)}
			/>
			<NavBar />
			<div className={classes.body}>
				<h1 className={classes.header}>Shelters & Reviews</h1>
				{/* <div className={classes.buttons}>
					<button
						className={classes["sign-up-button"]}
						onClick={() => handleSearch(previousPageUrl)}
					>
						{"<"}
					</button>
					<button
						className={classes["sign-up-button"]}
						onClick={() => handleSearch(nextPageUrl)}
					>
						{">"}
					</button>
				</div> */}
				<div className={classes["search-results"]}>
					{shelters.map((shelter) => (
						<div key={shelter.shelter.id} className={classes["search-item"]}>
							<img
								className={classes["search-img"]}
								src={shelter.photo ? shelter.photo : require("../../images/saskatoon-spca.jpg")}
								alt={`${shelter.shelter.name}-img`}
							/>
							<div className={classes["search-text-container"]}>
								<h2 className={classes.shelterName}>{shelter.shelter.name}</h2>
								<p className={classes.shelterDescription}>{shelter.shelter.mission}</p>
								<p className={classes.shelterAddress}>{shelter.shelter.address}, {shelter.shelter.province}, {shelter.shelter.country}</p>
							</div>
							<NavLink className={classes["details-button"]} to={`/shelters/${shelter.shelter.id}`}>
								Details
							</NavLink>
						</div>
					))}
				</div>
			</div>
			<script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
				crossOrigin="anonymous"
			></script>
			<div className={classes.footerContainer}>
				<button
					className={classes.paginationButton}
					onClick={() => handleSearch(previousPageUrl)}
				>
					{"<"}
				</button>
				<button
					className={classes.paginationButton}
					onClick={() => handleSearch(nextPageUrl)}
				>
					{">"}
				</button>
			</div>
		</div>
	)
}

export default ShelterListings
