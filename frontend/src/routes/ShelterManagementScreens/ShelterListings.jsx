import React, { useState, useEffect } from "react"
import axios from "axios"
import classes from "./ShelterListings.module.css"
import NavBar from "../../components/NavBar"
import useUser from "../../context/UserContext"
import Endpoints from "../../constants/Endpoints"
import { NavLink } from "react-router-dom"

function ShelterListings() {
	const [shelters, setShelters] = useState([])
	const [nextPageUrl, setNextPageUrl] = useState(null)
	const [previousPageUrl, setPreviousPageUrl] = useState(null)

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
			}
		}

		fetchShelters()
	}, [user.token])

	return (
		<div className={classes["page-container"]}>
			<NavBar />
			<div className={classes.body}>
				<h1 className={classes.header}>Shelters & Reviews</h1>
				<div className={classes.buttons}>
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
				</div>
				<div className={classes["search-results"]}>
					{shelters.map((shelter) => (
						<div key={shelter.shelter.id} className={classes["search-item"]}>
							<img
								className={classes["search-img"]}
								src={shelter.shelter.photo}
								alt={`${shelter.shelter.name}-img`}
							/>
							<div className={classes["search-text-container"]}>
								<h2>{shelter.shelter.name}</h2>
								<p>{shelter.shelter.address}</p>
							</div>
							<NavLink className={classes["details-button"]} to={"/shelters/review"}>
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
		</div>
	)
}

export default ShelterListings
