import { NavLink } from "react-router-dom/dist"
import classes from "./Signup.module.css"
import useUser from "../../context/UserContext"

function Signup() {
	const user = useUser()

	return (
		<main>
			<NavLink to={`/`}>
				<img
					src={require("../../images/logo.png")}
					class={classes["logo"]}
					alt="logo"
				/>
			</NavLink>
			<div class={classes["something"]}>
				<div class={classes["signup"]}>
					<h1 class={classes["welcome"]}>Sign up</h1>
					<img
						class={classes["dogscats"]}
						src={require("../../images/signup2.png")}
						alt="Dog and cat"
					/>
					<div class={classes["grid-container"]}>
						<form action="signup-shelter.html">
							<div class={classes["grid-item"]}>
								<input
									id="firstname"
									type="text"
									name="firstname"
									placeholder="First name"
									required
								/>
							</div>
							<div class={classes["grid-item"]}>
								<input
									id="lastname"
									type="text"
									name="lastname"
									placeholder="Last name"
									required
								/>
							</div>
							<div class={classes["grid-item"]}>
								<input
									id="email"
									type="email"
									name="email"
									placeholder="Email"
									required
								/>
							</div>
							<div class={classes["grid-item"]}>
								<input
									id="password"
									type="password"
									name="password"
									placeholder="Password"
									required
								/>
							</div>
							<div class={classes["grid-item2"]}>
								<input type="radio" id="seeker" name="seekerorshelter" value="seeker" />
								I am a pet seeker
								<input
									type="radio"
									id="shelter"
									name="seekerorshelter"
									value="shelter"
								/>
								I am a pet shelter
							</div>
							<div class={classes["grid-item"]}>
								<button class={classes["login"]} type="submit">
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
