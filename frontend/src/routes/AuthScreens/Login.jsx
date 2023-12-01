import { NavLink } from "react-router-dom/dist"
import styles from "./Login.module.css"
import useUser from "../../context/UserContext"

function Login() {
	const user = useUser()

	return (
		<main>
			<NavLink to={`/`}>
				<img src={require("../../images/logo.png")} className={styles.logo} alt="logo" />
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
						<form className={styles.form} action="index.html">
							<div className={styles.gridItem}>
								<input
									id="email"
									type="email"
									name="email"
									placeholder="Email"
									required
								/>
							</div>
							<div className={styles.gridItem}>
								<input
									id="password"
									type="password"
									name="password"
									placeholder="Password"
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
