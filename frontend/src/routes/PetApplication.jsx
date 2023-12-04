// import { NavLink } from "react-router-dom"
import { useState, useEffect} from "react"
import NavBar from "../components/NavBar"
import classes from "./PetApplication.module.css"
import axios from "axios"
import useUser from "../../context/UserContext";
import Endpoints from "../constants/Endpoints";
import { useNavigate } from "react-router-dom";

function PetApplication() {
    const navigate = useNavigate();
    const user = useUser()
    const [formDataUpdated, setFormDataUpdated] = useState(false);
    const [formData, setFormData] = useState({
        pet: "",
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (formDataUpdated) {
            console.log("Form data:", formData);
            setFormDataUpdated(false);
        }
    }, [formData, formDataUpdated]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // get the shelter id by getting specific shelter
            const shelterResponse = await axios.get(Endpoints.specificshelter.replace(":pk", user.userId), {
                headers: {
                    "Authorization": "Bearer " + user.token,
                },
            });
            const shelterId = shelterResponse.data.id;
            setFormData((prevData) => ({
                ...prevData,
                shelter: shelterId,
            }));
            setFormDataUpdated(true);

        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };
    
    useEffect(() => {
        if (formDataUpdated) {
            const createApp = async () => {
                try {
                    const endpoint = Endpoints.application;
                    // }
                    const response = await axios.post(endpoint, formData, {
                        headers: {
                            "Authorization": "Bearer " + user.token,
                        },
                    });
                    console.log("Pet created successfully:", response.data);

                    // redirect to the filled application page

                    const applicationId = response.data.id;
                    navigate(`/petapplication/${applicationId}`);

                } catch (error) {
                    console.error("Error creating appplication:", error);
                }
            };
            createApp();
            setFormDataUpdated(false);
        }
    }, [formDataUpdated, formData, user.token, navigate]);



    return (
        <body className={classes["page-container"]}>
          <NavBar />
          <content className={classes["pet-application-content"]}>
            <h1>Adoption Application</h1>
    
            <div className={classes["profile-container"]}>
              <img src={require("../images/derpycat.png")} alt="cat" />
            </div>
    
            <form onSubmit={handleSubmit}>
              <div className={classes["grid-container"]}>
                <div className={classes["grid-item"]}>
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div class={classes["grid-item"]}>
                    <input
                        id="last_name"
                        type="text"
                        name="last_name"
                        placeholder="Last name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class={classes["grid-item"]}>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class={classes["grid-item"]}>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        placeholder="Phone #"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class={classes["grid-item"]}>
                    <input
                        id="country"
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class={classes["grid-item"]}>
                    <input
                        id="province"
                        type="text"
                        name="province"
                        placeholder="Province"
                        value={formData.province}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class={classes["grid-item"]}>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class={classes["grid-item"]}>
                    <input
                        id="postal_code"
                        type="text"
                        name="postal_code"
                        placeholder="Postal Code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
              <div className={classes["button-holder"]}>
                <button className="login" type="submit">
                  Apply
                </button>
              </div>
            </form>
          </content>
        </body>
      );
}

export default PetApplication


