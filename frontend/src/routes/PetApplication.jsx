// import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import classes from "./PetApplication.module.css";
import axios from "axios";
import useUser from "../context/UserContext";
import Endpoints from "../constants/Endpoints";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";

function PetApplication() {
  const navigate = useNavigate();
  const user = useUser();
  const { pk } = useParams();
  const [formDataUpdated, setFormDataUpdated] = useState(false);
  const [petDetails, setPetDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    pet: parseInt(pk),
    // seeker: user.userId,
    shelter: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",

    country: "",
    province: "",
    address: "",
    postal_code: "",
  });

  useEffect(() => {
    if (formDataUpdated) {
      console.log("Form data:", formData);
      setFormDataUpdated(false);
    }
  }, [formData, formDataUpdated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // get the shelter id by getting specific shelter
      const petResponse = await axios.get(Endpoints.pet.replace(":pk", pk), {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      const shelterId = petResponse.data.shelter;
      setFormData((prevData) => ({
        ...prevData,
        shelter: shelterId,
      }));
      setFormDataUpdated(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      setErrorMessage("Failed to submit application. You can only apply for available pets!");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (formDataUpdated) {
      const createApp = async () => {
        try {
          const endpoint = Endpoints.application;
          console.log("Endpoint:", endpoint);
          console.log("Form data:", formData);
          const response = await axios.post(endpoint, formData, {
            headers: {
              Authorization: "Bearer " + user.token,
            },
            params: { pet: formData.pet, shelter: formData.shelter },
          });
          console.log("Application created successfully:", response.data);

          // const petId = response.data.pet;
          const applicationId = response.data.id;
          navigate(`/petapplicationfilled/${applicationId}`);
        } catch (error) {
          console.log("Error response:", error.response.data);
          console.error("Error creating appplication:", error);
          setErrorMessage("Failed to submit application. You can only apply for available pets!");
          setShowAlert(true);
        }
      };
      createApp();
      setFormDataUpdated(false);
    }
  }, [formDataUpdated, formData, user.token, navigate]);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(Endpoints.pet.replace(":pk", pk), {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        });
        setPetDetails(response.data);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetDetails();
  }, [pk, user.token]);

  useEffect(() => {
    // set initial form data
    if (user) {
      setFormData(() => ({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      }));
    }
  }, [user]);

  return (
    <body className={classes["page-container"]}>
      <Alert
        show={showAlert}
        success={false}
        message={errorMessage}
        onClose={() => setShowAlert(false)}
      />
      <NavBar />
      <content className={classes["pet-application-content"]}>
        <h1 className={classes["title"]}>Adoption Application</h1>

        <div className={classes["profile-container"]}>
          <img
            className={classes["app-img"]}
            src={
              petDetails.photo
                ? petDetails.photo
                : require("../images/temppet.png")
            }
            alt={petDetails.name}
          />
        </div>

        <form className={classes["form"]} onSubmit={handleSubmit}>
          <div className={classes["grid-container"]}>
            <div className={classes["grid-item"]}>
              <input
                className="input"
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
                className="input"
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
                className="input"
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
                className="input"
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
                className="input"
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
                className="input"
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
                className="input"
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
                className="input"
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
            <button className={classes["adopt-button"]} type="submit">
              Apply
            </button>
          </div>
        </form>
      </content>
    </body>
  );
}

export default PetApplication;
