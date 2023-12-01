import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styles from "./Login.module.css"
import useUser from "../../context/UserContext"
import axios from "axios"
import Endpoints from "../../constants/Endpoints"

function Login() {
	const user = useUser()
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const tokenResponse = await axios.post(Endpoints.token, {
				email,
				password,
			})

			user.setUserInfo({ ...user, token: tokenResponse.data.access })
			navigate("/")
			console.log("Login token response:", tokenResponse.data)
		} catch (error) {
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