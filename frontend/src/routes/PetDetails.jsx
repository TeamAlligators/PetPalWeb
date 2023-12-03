import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import classes from "./PetDetails.module.css";
import Endpoints from "../constants/Endpoints"
import { useParams } from 'react-router-dom';

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

    const { pk } = useParams();

    useEffect(() => {
        // Fetch pet details from the server
       
        const fetchPetDetails = async () => {
            try {

                const response = await axios.get(Endpoints.pet); 
                console.log("Pet details", response.data);

                // Assuming API response has a structure like { name, gender, birthday, status, medicalHistory, specialNeeds, personality }
                setPetDetails(response.data);
            } catch (error) {
                console.error("Error fetching pet details:", error);
            }
        };

        fetchPetDetails();
    }, [pk]); // Empty dependency array ensures this effect runs once when the component mounts


  return (
    <body className={classes["page-container"]}>
      <NavBar />
      <content className={classes["pet-details-content"]}>
              {/* <h1>{petDetails.name} ({petDetails.gender})</h1> */}
              <h1>{petDetails.name} </h1>

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
