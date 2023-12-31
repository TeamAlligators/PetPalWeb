import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom/dist"
import classes from "./Signup.module.css"
import useUser from "../../context/UserContext"
import axios from "axios"
import AccountType from "../../constants/AccountType"
import Endpoints from "../../constants/Endpoints"

function Signup() {
	const user = useUser()
	const navigate = useNavigate()

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [photo, setPhoto] = useState(null)
	const [accountType, setAccountType] = useState(AccountType.SEEKER)
	const [error, setError] = useState(false)

	const [shelterName, setShelterName] = useState("")
	const [phoneNum, setPhoneNum] = useState("")
	const [country, setCountry] = useState("")
	const [province, setProvince] = useState("")
	const [address, setAddress] = useState("")
	const [postalCode, setPostalCode] = useState("")
	const [mission, setMission] = useState("")

	const handleSignup = async (event) => {
		event.preventDefault()
		let shelter = {}
		let seeker = {}

		try {
			let userData = {
				first_name: firstName,
				last_name: lastName,
				email,
				password,
				photo: null,
				account_type: accountType,
			}

			if (accountType === AccountType.SEEKER) {
				seeker = {
				}
			} else if (accountType === AccountType.SHELTER) {
				shelter = {
					// for now
					name: shelterName,
					phone: phoneNum,
					country,
					province,
					address,
					postal_code: postalCode,
					mission,
				}
			}

			userData = {
				first_name: firstName,
				last_name: lastName,
				email,
				password,
				photo: null,
				account_type: accountType,
				seeker,
				shelter,
			}

			const userResponse = await axios.post(
				accountType === AccountType.SEEKER ? Endpoints.seeker : Endpoints.shelter,
				userData
			)

			console.log("user response:", userResponse.data)

			const tokenResponse = await axios.post(Endpoints.token, {
				email,
				password,
			})

			console.log("token response:", tokenResponse.data.access)

			// temp since we cant return id from backend

			let userId = null

			if (accountType === AccountType.SEEKER) {
				const seekersResponse = await axios.get(Endpoints.seekers)
				seekersResponse.data.forEach((currUser) => {
					if (currUser.email === email) {
						userId = currUser.id
					}
				})
			} else if (accountType === AccountType.SHELTER) {
				const sheltersResponse = await axios.get(Endpoints.shelters)
				sheltersResponse.data.forEach((currUser) => {
					if (currUser.email === email) {
						userId = currUser.id
					}
				})
			}

			// if (photo) {
			// 	const form = new FormData()
			// 	form.append("photo", photo)
			// 	const photoResponse = await axios.put(
			// 		Endpoints.updateseeker.replace(":pk", userId),
			// 		form,
			// 		{
			// 			headers: {
			// 				Authorization: `Bearer ${tokenResponse.data.access}`,
			// 				"Content-Type": "multipart/form-data",
			// 			},
			// 		}
			// 	)
			// 	console.log("Photo updated successfully:", photoResponse.data)
			// }

			user.setUserInfo({
				userId: userId,
				first_name: firstName,
				last_name: lastName,
				email,
				password,
				photo: null,
				token: tokenResponse.data.access,
				account_type: accountType,
				seeker,
				shelter,
			})

			console.log("user info:", user)

			navigate("/")
			setError("")
		} catch (error) {
			console.error("Error during signup:", error)
			if (error?.response?.data?.email) {
				setError("User with email already exists")
			} else {
				setError("Issue with sign up, are your fields correct?")
			}
		}
	}

	return (
		<main>
			<NavLink to={`/`}>
				<img
					src={require("../../images/logo.png")}
					className={classes["logo"]}
					alt="logo"
				/>
			</NavLink>
			<div className={classes["something"]}>
				<div className={classes["signup"]}>
					<h1 className={classes["welcome"]}>Sign up</h1>
					<img
						className={classes["dogscats"]}
						src={require("../../images/signup2.png")}
						alt="Dog and cat"
					/>
					<div className={classes["grid-container"]}>
						<form onSubmit={handleSignup} encType="multipart/form-data">
							<div className={classes["grid-item"]}>
								<input
									id="firstname"
									type="text"
									name="firstname"
									placeholder="First name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</div>
							<div className={classes["grid-item"]}>
								<input
									id="lastname"
									type="text"
									name="lastname"
									placeholder="Last name"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</div>
							<div className={classes["grid-item"]}>
								<input
									id="email"
									type="email"
									name="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className={classes["grid-item"]}>
								<input
									id="password"
									type="password"
									name="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							{/* <div className={classes["grid-item"]}>
								<label htmlFor="photo">Upload Photo:</label>
								<input
									id="photo"
									type="file"
									name="photo"
									accept="image/*"
									onChange={(e) => setPhoto(e.target.files[0])}
								/>
							</div> */}
							<div className={classes["grid-item2"]}>
								<input
									type="radio"
									id="seeker"
									name="seekerorshelter"
									value="seeker"
									checked={accountType === "seeker"}
									onChange={() => setAccountType(AccountType.SEEKER)}
								/>
								I am a pet seeker
								<input
									type="radio"
									id="shelter"
									name="seekerorshelter"
									value="shelter"
									checked={accountType === "shelter"}
									onChange={() => setAccountType(AccountType.SHELTER)}
								/>
								I am a pet shelter
							</div>
							{accountType === AccountType.SHELTER && (
								<>
									<div className={classes["grid-item"]}>
										<input
											id="sheltername"
											type="text"
											name="sheltername"
											placeholder="Shelter name"
											value={shelterName}
											onChange={(e) => setShelterName(e.target.value)}
											required
										/>
									</div>
									<div className={classes["grid-item"]}>
										<input
											id="phonenum"
											type="text"
											name="phonenum"
											placeholder="Phone #"
											value={phoneNum}
											onChange={(e) => setPhoneNum(e.target.value)}
											required
										/>
									</div>
									<div className={classes["grid-item"]}>
										<input
											id="country"
											type="text"
											name="country"
											placeholder="Country"
											value={country}
											onChange={(e) => setCountry(e.target.value)}
											required
										/>
									</div>
									<div className={classes["grid-item"]}>
										<input
											id="province"
											type="text"
											name="province"
											placeholder="Province"
											value={province}
											onChange={(e) => setProvince(e.target.value)}
											required
										/>
									</div>
									<div className={classes["grid-item"]}>
										<input
											id="address"
											type="text"
											name="address"
											placeholder="Address"
											value={address}
											onChange={(e) => setAddress(e.target.value)}
											required
										/>
									</div>
									<div className={classes["grid-item"]}>
										<input
											id="postalcode"
											type="text"
											name="postalcode"
											placeholder="Postal Code"
											value={postalCode}
											onChange={(e) => setPostalCode(e.target.value)}
											required
										/>
									</div>
									<div className={classes["grid-item"]}>
										<textarea
											rows="4"
											id="mission"
											type="text"
											name="mission"
											placeholder="Mission statement - include what your vision and goals are!"
											value={mission}
											onChange={(e) => setMission(e.target.value)}
											required
										></textarea>
									</div>
								</>
							)}
							{error && <p className={classes.poop}>{error}</p>}
							<div className={classes["grid-item"]}>
								<button className={classes["login"]} type="submit">
									Continue
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Signup
