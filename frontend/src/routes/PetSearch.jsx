import NavBar from "../components/NavBar"
import classes from "./PetSearch.module.css"

function PetSearch() {
	return (
		<body class={classes["page-container"]}>
			<NavBar />
			<div class={classes["body"]}>
				<h1 class={classes["header"]}>Find your PetPal</h1>
				<div class={classes["search-container"]}>
					<input class={classes["search"]} placeholder="Search your PetPal" />
					<select name="filter" class={classes["select"]}>
						<option value="" disabled selected>
							Filters
						</option>
						<option value="location">Location</option>
						<option value="breed">Breed</option>
						<option value="age">Age</option>
						<option value="size">Size</option>
						<option value="color">Color</option>
						<option value="gender">Gender</option>
					</select>
					<input class={classes["search"]} placeholder="Filter Keywords" />
					<select name="sort" class={classes["select"]}>
						<option value="" disabled selected>
							Sort
						</option>
						<option value="name">Name</option>
						<option value="age">Age</option>
						<option value="size">Size</option>
					</select>
					<a class={classes["search-icon"]} href="./pet-search-2.html">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="48"
							height="48"
							fill="#ddd"
							class="bi bi-search-heart search-icon"
							viewBox="0 0 16 16"
						>
							<path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
							<path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
						</svg>
					</a>
				</div>
				<div class={classes["search-results"]}>
					<div class={classes["search-item"]}>
						<img
							class={classes["search-img"]}
							src={require("../images/derpycat.png")}
							alt="cat"
						/>
						<div class={classes["search-text-container"]}>
							<p>
								Potato <br />
								5months
							</p>
							<p>Some breed</p>
						</div>
						<a class={classes["details-button"]} href="pet-details.html">
							See Details
						</a>
					</div>
				</div>
			</div>
			<script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
				crossorigin="anonymous"
			></script>
		</body>
	)
}

export default PetSearch
