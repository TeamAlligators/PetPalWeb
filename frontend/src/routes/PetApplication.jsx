// import { NavLink } from "react-router-dom"
import NavBar from "../components/NavBar"
import classes from "./PetApplication.module.css"

function PetApplication() {
    return (
        <body class={classes["page-container"]}>
            <NavBar />
            <content class={classes["pet-application-content"]}>
                <h1>Adoption Application</h1>

                <div class={classes["profile-container"]}>
                    <img
                        src={require("../images/derpycat.png")}
                        alt="cat"
                    />
                </div>

                <form action="">
                    <div class={classes["grid-container"]}>
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
                                id="phonenum"
                                type="text"
                                name="phonenum"
                                placeholder="Phone #"
                                required
                            />
                        </div>
                        <div class={classes["grid-item"]}>
                            <input
                                id="country"
                                type="text"
                                name="country"
                                placeholder="Country"
                                required
                            />
                        </div>
                        <div class={classes["grid-item"]}>
                            <input
                                id="province"
                                type="text"
                                name="province"
                                placeholder="Province"
                                required
                            />
                        </div>
                        <div class={classes["grid-item"]}>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Address"
                                required
                            />
                        </div>
                        <div class={classes["grid-item"]}>
                            <input
                                id="postalcode"
                                type="text"
                                name="postalcode"
                                placeholder="Postal Code"
                                required
                            />
                        </div>
                    </div>
                </form>
                <div class={classes["button-holder"]}>
                    <a href="pet-applications-filled.html">
                        <button class="login" type="submit">Apply</button>
                    </a>
                </div>
            </content>
        </body>
    )
}

export default PetApplication