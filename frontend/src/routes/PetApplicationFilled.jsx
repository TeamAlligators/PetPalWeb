import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import classes from "./PetDetails.module.css";
import Endpoints from "../constants/Endpoints"
import PetApplication from "./PetApplication";

function PetApplicationFilled() { 
    return (
        <body className={classes["page-container"]}>
            <NavBar />
            <content className={classes["pet-application-content"]}>
                <h1>Adoption Application</h1>

                <div className={classes["profile-container"]}>
                    <img src={require("../images/derpycat.png")} alt="cat" />
                </div>

                <form action="">
                    <div class={classes["grid-container"] }>
                        <div class={ classes["grid-item"]}>
                            <input
                                id="firstname"
                                type="text"
                                name="firstname"
                                placeholder="First name"
                                required
                                disabled
                                value="Derpy"
                            />
                        </div>
                        <div class={ classes["grid-item"]}>
                            <input
                                id="lastname"
                                type="text"
                                name="lastname"
                                placeholder="Last name"
                                required
                                disabled
                                value="Cat"
                            />
                        </div>
                        <div class={ classes["grid-item"]}>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                disabled
                                value="cat@gmail.com"
                            />
                        </div>
                        <div class={ classes["grid-item"]}>
                            <input
                                id="phonenum"
                                type="text"
                                name="phonenum"
                                placeholder="Phone #"
                                required
                                disabled
                                value="416-132-1521"
                            />
                        </div>
                        <div class={ classes["grid-item"]}>
                            <input
                                id="country"
                                type="text"
                                name="country"
                                placeholder="Country"
                                required
                                disabled
                                value="Canada"
                            />
                        </div>
                        <div class={ classes["grid-item"]}>
                            <input
                                id="province"
                                type="text"
                                name="province"
                                placeholder="Province"
                                required
                                disabled
                                value="Ontario"
                            />
                        </div>
                        <div class={ classes["grid-item"]}>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Address"
                                required
                                disabled
                                value="123 Main Street"
                            />
                        </div>
                        <div class={ classes["grid-item"]}>
                            <input
                                id="postalcode"
                                type="text"
                                name="postalcode"
                                placeholder="Postal Code"
                                required
                                disabled
                                value="M41 K2L"
                            />
                        </div>
                    </div>
                </form>

                <form class={ classes["new-review" ]} action="">
                    <p id="review-name">First Last</p>
                    <div class={ classes["grid-item"]}>
                        <input
                            id="review-content"
                            type="text"
                            name="review"
                            placeholder="Leave your comment here"
                            required
                        />
                    </div>
                    <div class={ classes["grid-item"]}>
                        <button type="submit">Submit</button>
                    </div>
                </form>

                <div class={ classes["new-review" ]}>
                    <p id="review-name">First Last</p>
                    <p id="review-content">Thank you I look forward to hearing more!</p>
                </div>

                <div class={ classes["new-review" ]}>
                    <p id="review-name">Shelter Name</p>
                    <p id="review-content">
                        Hi, thank you for applying, we are currently processing your application,
                        please wait for an update.
                    </p>
                </div>
            </content>
        </body>
    )
}

export default PetApplicationFilled