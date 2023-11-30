import { NavLink } from "react-router-dom/dist"
import "./Login.css"
import useUser from "../../context/UserContext"

function Login() {
	const user = useUser()

	return (
		<main>
			<NavLink to={`/`}>
				<img src={require("../../images/logo.png")} class="logo" alt="logo" />
			</NavLink>
			<div class="something">
				<div class="signup">
					<h1 class="welcome">Welcome back!</h1>
					<img
						class="dogscats"
						src={require("../../images/signup1.png")}
						alt="Dog and cat"
					/>
					<div class="grid-container">
						<form action="index.html">
							<div class="grid-item">
								<input
									id="email"
									type="email"
									name="email"
									placeholder="Email"
									required
								/>
							</div>
							<div class="grid-item">
								<input
									id="password"
									type="password"
									name="password"
									placeholder="Password"
									required
								/>
							</div>
							<div class="grid-item">
								<button class="login" type="submit">
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
