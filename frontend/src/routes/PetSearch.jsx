import { useState, useEffect, useCallback } from "react"
import NavBar from "../components/NavBar"
import classes from "./PetSearch.module.css"
import axios from "axios"
import Endpoints from "../constants/Endpoints"
import { NavLink } from "react-router-dom"
import Alert from "../components/Alert"

function PetSearch() {
	const [filter, setFilter] = useState("")
	const [filterKeywords, setFilterKeywords] = useState("")
	const [order, setSort] = useState("")
	const [searchResults, setSearchResults] = useState([])
	const [nextPageUrl, setNextPageUrl] = useState(null)
	const [previousPageUrl, setPreviousPageUrl] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [showAlert, setShowAlert] = useState(false)

	const handleSearch = async (url) => {
		try {
			let endpoint = Endpoints.petresults
			if (url) {
				endpoint = url
			}

			console.log(order)
			const response = await axios.get(endpoint, {
				params: {
					[filter]: filterKeywords,
					order: order,
				},
			})

			console.log("search results", response.data)
			setSearchResults(response.data.results)
			setNextPageUrl(response.data.next)
			setPreviousPageUrl(response.data.previous)
		} catch (error) {
			console.error("Error during search:", error)
			setErrorMessage("Failed to search pets. Please try again.")
			setShowAlert(true)
		}
	}

	useEffect(() => {
		handleSearch()
	}, [])

	return (
		<body className={classes["page-container"]}>
			<Alert
				show={showAlert}
				success={false}
				message={errorMessage}
				onClose={() => setShowAlert(false)}
			/>
			<NavBar />
			<div className={classes["body"]}>
				<h1 className={classes["header"]}>Find your PetPal</h1>
				<div className={classes["search-container"]}>
					{/* <button
						className={classes["sign-up-button"]}
						onClick={() => handleSearch(previousPageUrl)}
					>
						{"<"}
					</button> */}
					<input
						className={classes["search"]}
						placeholder="Filter Keywords"
						value={filterKeywords}
						onChange={(e) => setFilterKeywords(e.target.value)}
					/>
					<select
						name="filter"
						className={classes["select"]}
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					>
						<option value="">Filter</option>
						<option value="status">Status</option>
						<option value="shelterId">ShelterId</option>
						<option value="breed">Breed</option>
						<option value="gender">Gender</option>
					</select>
					<select
						name="sort"
						className={classes["select"]}
						value={order}
						onChange={(e) => setSort(e.target.value)}
					>
						<option value="">Sort</option>
						<option value="name">Name</option>
						<option value="age">Age</option>
					</select>
					<button
						className={classes["search-icon"]}
						onClick={() => handleSearch(Endpoints.search)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="36"
							height="36"
							fill="#d0a1a1"
							className="bi bi-search-heart search-icon"
							viewBox="0 0 16 16"
						>
							<path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
							<path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
						</svg>
					</button>
					{/* <button
						className={classes["sign-up-button"]}
						onClick={() => handleSearch(nextPageUrl)}
					>
						{">"}
					</button> */}
				</div>
				<div className={classes["search-results"]}>
					{searchResults?.map((result) => (
						<div className={classes["search-item"]} key={result.id}>
							<img
								className={classes["search-img"]}
								src={result.photo ? result.photo : require("../images/temppet.png")}
								alt={result.name}
							/>
							<div className={classes["search-text-container"]}>
								<p>
									{result.name} <br />
									{result.age} year(s) old
								</p>
								<p>
									{result.status.charAt(0).toUpperCase() + result.status.slice(1)} <br />
									{result.breed}
								</p>
							</div>
							<NavLink className={classes["details-button"]} to={`/pets/${result.id}`}>
								See Details
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
		</body>
	)
}

export default PetSearch
