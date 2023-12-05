import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styles from "./Login.module.css"
import useUser from "../../context/UserContext"
import axios from "axios"
import Endpoints from "../../constants/Endpoints"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

function Login() {
	const user = useUser()
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)

	const google = async (userResponse) => {
		console.log(userResponse)

		let decoded = jwtDecode(userResponse?.credential)
		const email = decoded?.email
		const name = decoded?.name

		// user.setUserInfo({
		// 	...user,
		// 	email: email,
		// 	first_name: name,
		// 	last_name: "",
		// 	token: userResponse.credential,
		// })

		try {
			const tokenResponse = await axios.post(Endpoints.token, {
				email: "admin@admin.com",
				password: "admin",
			})

			setError(false)
			getUser(email, tokenResponse.data.access)
			console.log("google Login token response:", tokenResponse.data)
		} catch (error) {
			setError(true)
			console.error("Error during login:", error)
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const tokenResponse = await axios.post(Endpoints.token, {
				email,
				password,
			})

			// user.setUserInfo({ ...user, token: tokenResponse.data.access })

			setError(false)
			getUser(null, tokenResponse.data.access)
			console.log("Login token response:", tokenResponse.data)
		} catch (error) {
			setError(true)
			console.error("Error during login:", error)
		}
	}

	const getUser = async (googleEmail, token) => {
		try {
			const seekersResponse = await axios.get(Endpoints.seekers)
			let newUser = null

			seekersResponse.data.forEach((currUser) => {
				if (currUser.email === email || currUser.email === googleEmail) {
					newUser = currUser
				}
			})

			if (!newUser) {
				const sheltersResponse = await axios.get(Endpoints.shelters)

				sheltersResponse.data.forEach((currUser) => {
					if (currUser.email === email || currUser.email === googleEmail) {
						newUser = currUser
					}
				})
			}

			user.setUserInfo({
				...user,
				userId: newUser.id,
				first_name: newUser.first_name,
				last_name: newUser.last_name,
				account_type: newUser.account_type,
				seeker: newUser.seeker,
				shelter: newUser.shelter,
				token: token,
			})
			console.log("loggedin user", newUser)

			setError(false)
			navigate("/")
		} catch (error) {
			setError(true)
			console.error("Error during login:", error)
		}
	}

	return (
		<main>
			<NavLink to={`/`}>
				<img
					src={require("../../images/logo.png")}
					className={styles.logo}
					alt="logo"
				/>
			</NavLink>
			<div className={styles.container}>
				<div className={styles.login}>
					<h1 className={styles.welcome}>Welcome back!</h1>
					<img
						className={styles.dogscats}
						src={require("../../images/signup1.png")}
						alt="Dog and cat"
					/>
					<div className={styles.gridContainer}>
						<form className={styles.form} onSubmit={handleLogin}>
							<div className={styles.gridItem}>
								<GoogleLogin onSuccess={google} onError={() => setError(true)} />
							</div>
							<div className={styles.gridItem}>
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
							<div className={styles.gridItem}>
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
							{error && <p>Invalid account, have you signed up yet?</p>}
							<div className={styles.gridItem}>
								<button className={styles.loginButton} type="submit">
									Log In
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Login
