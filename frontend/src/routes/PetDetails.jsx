import { NavLink } from "react-router-dom"
import NavBar from "../components/NavBar";
import classes from "./PetDetails.module.css";

function PetDetails() { 
    return (
        <body class={classes["page-container"]}>
            <NavBar />
            <content class={classes["pet-details-content"]}>
                <h1>Derpy Cat (m)</h1>

                <div class={classes["derpycat"]}>
                    <img
                        src={require("../images/derpycat.png")}
                        alt="cat"
                    />
                </div>

                <div class={classes["grid-container"]}>
                <p><b>Status: </b>Available</p>
                <p><b>Birthday: </b>January 1st, 2023 (9 months)</p>

                <p><b>Medical History: </b>Neutered, de-wormed, up to date on vaccines</p>
                <p><b>Special Needs/Requirements: </b>N/A</p>
                <p><b>Personality: </b>A handsome boy</p>
                <a  href="pet-applications.html">
                        <button class={ classes["adopt-button"]}>ADOPT NOW</button>
                </a>
                
                </div>
            </content>
        </body>
    )
}

export default PetDetails