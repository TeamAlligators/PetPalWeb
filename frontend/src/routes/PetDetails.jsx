// import { NavLink } from "react-router-dom"
// import NavBar from "../components/NavBar";
// import classes from "./PetDetails.module.css";
// import axios from "axios"
// import Endpoints from "../../constants/Endpoints"
// import { useState } from "react"

// function PetDetails() { 

//     const [petResults, setPetResults] = useState([])

//     const handlePet = async () => { 
//         try {
//             const response = await axios.get(Endpoints.search, {
//                 // params: {...},
//             })

//             console.log("pet results", response.data)
//             setPetResults(response.data.results)

//         } catch (error) {
//             console.error("Error during search:", error)
//         }
//     }

//     return (
//         <body class={classes["page-container"]}>
//             <NavBar />
//             <content class={classes["pet-details-content"]}>
//                 <h1>Derpy Cat (m)</h1>

//                 <div class={classes["derpycat"]}>
//                     <img
//                         src={require("../images/derpycat.png")}
//                         alt="cat"
//                     />
//                 </div>

//                 <div class={classes["grid-container"]}>
//                 <p><b>Status: </b>Available</p>
//                 <p><b>Birthday: </b>January 1st, 2023 (9 months)</p>

//                 <p><b>Medical History: </b>Neutered, de-wormed, up to date on vaccines</p>
//                 <p><b>Special Needs/Requirements: </b>N/A</p>
//                 <p><b>Personality: </b>A handsome boy</p>
//                 <a  href="pet-applications.html">
//                         <button class={ classes["adopt-button"]}>ADOPT NOW</button>
//                 </a>
                
//                 </div>
//             </content>
//         </body>
//     )
// }

// export default PetDetails

import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import classes from "./PetDetails.module.css";
import Endpoints from "../constants/Endpoints"

function PetDetails() {
    const [petDetails, setPetDetails] = useState({
        name: "",
        gender: "",
        birthday: "",
        status: "",
        medical_history: "",
        special_needs: "",
        personality: "",
    });

    useEffect(() => {
        // Fetch pet details from the server
        const fetchPetDetails = async () => {
            try {
                const response = await axios.get(Endpoints.search); // Update with your actual API endpoint
                console.log("Pet details", response.data);

                // Assuming API response has a structure like { name, gender, birthday, status, medicalHistory, specialNeeds, personality }
                setPetDetails(response.data);
            } catch (error) {
                console.error("Error fetching pet details:", error);
            }
        };

        fetchPetDetails();
    }, []); // Empty dependency array ensures this effect runs once when the component mounts


  return (
    <body className={classes["page-container"]}>
      <NavBar />
      <content className={classes["pet-details-content"]}>
        <h1>{petDetails.name} ({petDetails.gender})</h1>

        <div className={classes["derpycat"]}>
          <img src={require("../images/derpycat.png")} alt="cat" />
        </div>

        <div className={classes["grid-container"]}>
          <p>
            <b>Status: </b>
            {petDetails.status}
          </p>
          <p>
            <b>Birthday: </b>
            {petDetails.birthday}
          </p>

          <p>
            <b>Medical History: </b>
            {petDetails.medical_history}
          </p>
          <p>
            <b>Special Needs/Requirements: </b>
            {petDetails.special_needs}
          </p>
          <p>
            <b>Personality: </b>
            {petDetails.personality}
          </p>
          <a href="pet-applications.html">
            <button className={classes["adopt-button"]}>ADOPT NOW</button>
          </a>
        </div>
      </content>
    </body>
  );
}

export default PetDetails;
