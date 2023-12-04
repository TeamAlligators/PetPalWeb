import { useState, useEffect} from "react"
import NavBar from "../components/NavBar"
import classes from "./PetApplication.module.css"
import axios from "axios"
import useUser from "../context/UserContext";
import Endpoints from "../constants/Endpoints";
import { useNavigate, useParams } from "react-router-dom";

function PetApplicationFilled() { 

    const { pk } = useParams();
    // const endpoint = Endpoints.application.replace(":pk", pk);
  
    // const navigate = useNavigate();
    const user = useUser()
    // const [formDataUpdated, setFormDataUpdated] = useState(false);

    const [formData, setFormData] = useState({
        pet: pk,
        seeker: user.userId,
        shelter: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        country: "",
        province: "",
        address: "",
        postal_code: "",

    });

    useEffect(() => {
      // Fetch application from the server
  
      const fetchApplication = async () => {
        try {
          const response = await axios.get(Endpoints.application, {params: {pk: pk}});
          console.log("Application details", response.data);
  
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching application details:", error);
        }
      };
  
      fetchApplication();
    }); // Empty dependency array ensures this effect runs once when the component mounts
  
    return (
        <body className={classes["page-container"]}>
            <NavBar />
            <content className={classes["pet-application-content"]}>
                <h1>Adoption Application</h1>

                <div className={classes["profile-container"]}>
                    <img src={require("../images/temppet.png")} alt="cat" />
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
                                value={formData.first_name}
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
                                value={formData.last_name}
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
                                value={formData.email}
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
                                value={formData.phone}
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
                                value={formData.country}
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
                                value={formData.province}
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
                                value={formData.address}
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
                                value={formData.postal_code}
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