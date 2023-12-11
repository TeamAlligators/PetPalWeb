import { useState, useEffect } from "react"
import axios from "axios"
import NavBar from "../components/NavBar"
import classes from "./PetDetails.module.css"
import Endpoints from "../constants/Endpoints"
import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"
import useUser from "../context/UserContext";
import Alert from "../components/Alert"

function PetDetails() {
	const user = useUser()
	const [errorMessage, setErrorMessage] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [petDetails, setPetDetails] = useState({
		name: "",
		gender: "",
		birthday: "",
		status: "",
		medical_history: "",
		special_needs: "",
		personality: "",
	})

	const { pk } = useParams()
	const endpoint = Endpoints.pet.replace(":pk", pk)

	useEffect(() => {
		// Fetch pet details from the server
		const fetchPetDetails = async () => {
			try {
				const response = await axios.get(endpoint)
				console.log("Pet details", response.data)

				// Assuming API response has a structure like { name, gender, birthday, status, medicalHistory, specialNeeds, personality }
				setPetDetails(response.data);
			} catch (error) {
				console.error("Error fetching pet details:", error);
				setErrorMessage("Failed to get pet details. Please try again.");
				setShowAlert(true);
			}
		};

		fetchPetDetails();
	}, [endpoint]); // Empty dependency array ensures this effect runs once when the component mounts

	return (
		<body className={classes["page-container"]}>
			<Alert
				show={showAlert}
				success={false}
				message={errorMessage}
				onClose={() => setShowAlert(false)}
			/>
			<NavBar />
			<content className={classes["pet-details-content"]}>
				{/* <h1>{petDetails.name} ({petDetails.gender})</h1> */}
				<h1 className={classes["name"]}>{petDetails.name} </h1>

				<img
					className={classes["derpycat"]}
					src={
						petDetails.photo
							? petDetails.photo
							: require("../images/temppet.png")
					}
					alt={petDetails.name}
				/>

				<div className={classes["grid-container"]}>
					<p>
						<b>Status of Adoption: </b>
						{petDetails.status}
					</p>

					<p>
						<b>Species: </b>
						{petDetails.species}
					</p>

					<p>
						<b>Breed: </b>
						{petDetails.breed}
					</p>

					<p>
						<b>Age: </b>
						{petDetails.age}
					</p>

					<p>
						<b>Size (in kg): </b>
						{petDetails.size}
					</p>

					<p>
						<b>Gender: </b>
						{petDetails.gender}
					</p>

					<p>
						<b>Birthday: </b>
						{petDetails.birthday}
					</p>

					<p>
						<b>Medical History: </b>
						{petDetails.medical_history}
					</p>
					<p>
						<b>Special needs or requirements: </b>
						{petDetails.special_needs}
					</p>
					<p>
						<b>Behaviour / Personality: </b>
						{petDetails.personality}
					</p>

					<p>
						<b>Other description: </b>
						{petDetails.others}
					</p>
					<div className={classes["button-item"]}>
						{user.account_type === "shelter" && user.shelter.id === petDetails.shelter ? <NavLink className={classes["adopt-button"]} to={`/petupdate/` + pk}>
							EDIT LISTING
						</NavLink> : null}
						{user.account_type === "seeker" ? <NavLink className={classes["adopt-button"]} to={`/petapplication/` + pk}>
							ADOPT NOW
						</NavLink> : null}
					</div>
				</div>
			</content>
		</body>
	)
}

export default PetDetails;
