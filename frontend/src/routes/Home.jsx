import classes from "./Home.module.css"
import NavBar from "../components/NavBar"
import { NavLink } from "react-router-dom"

function Home() {
	return (
		<body class={classes["page-container"]}>
			<NavBar />
			<div class={classes["body"]}>
				<img
					class={classes["index-picture-2"]}
					src={require("../images/pink_paw_print.png")}
					alt="home2"
				/>
				<div class={classes["body-item"]}>
					<img
						class={classes["index-picture"]}
						src={require("../images/index1.png")}
						alt="home"
					/>
				</div>
				<div class={classes["body-item"]}>
					<div class={classes["sigh"]}>
						<h1 class={classes["header"]}>
							Bring <span class={classes["purple"]}>pawsitivity</span> in your life
							with a<span class={classes["purple"]}> PetPal</span>
						</h1>
						<p class={classes["paragraph"]}>
							At PetPal, we believe in the magic of unconditional love and the joy that
							a furry companion brings into our lives. Every wag of a tail, every purr,
							and every nuzzle is a reminder that love knows no bounds.
						</p>
					</div>
					<NavLink className={classes["button"]} to={`/search`}>
						Explore{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="currentColor"
							class="bi bi-search-heart"
							viewBox="0 0 16 16"
						>
							<path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
							<path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
						</svg>
					</NavLink>
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

export default Home
