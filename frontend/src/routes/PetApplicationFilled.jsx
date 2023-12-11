import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import classes from "./PetApplicationFilled.module.css";
import axios from "axios";
import useUser from "../context/UserContext";
import Endpoints from "../constants/Endpoints";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";

function PetApplicationFilled() {
  const { pk } = useParams();
  const [newComment, setNewComment] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const user = useUser();
  const [petDetails, setPetDetails] = useState({});
  // have status as a state variable available to be updated
  const [status, setStatus] = useState("");

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

  const fetchData = async () => {
    try {
      // Fetch application details
      const applicationResponse = await axios.get(
        Endpoints.application,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        },
        { params: { pk: pk } }
      );

      const foundApplication = applicationResponse.data.results.find(
        (application) => application.id === parseInt(pk)
      );

      console.log("Found application", foundApplication);

      setFormData({
        pet: foundApplication.pet,
        seeker: foundApplication.seeker,
        shelter: foundApplication.shelter,
        first_name: foundApplication.first_name,
        last_name: foundApplication.last_name,
        email: foundApplication.email,
        phone: foundApplication.phone,
        country: foundApplication.country,
        province: foundApplication.province,
        address: foundApplication.address,
        postal_code: foundApplication.postal_code,
      });

      setStatus(foundApplication.status);

      // Fetch pet details
      const petResponse = await axios.get(
        Endpoints.pet.replace(":pk", foundApplication.pet),
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );

      setPetDetails(petResponse.data);
    } catch (error) {
      console.error("Error fetching details:", error);
      setErrorMessage("Failed to get application details. Please try again.");
      setShowAlert(true);
    }
  };

  const fetchComments = async (url) => {
    try {
      const response = await axios.get(
        url || Endpoints.applicationcomments.replace(":pk", pk),
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setSearchResults(response.data.results);
      setNextPageUrl(response.data.next);
      setPreviousPageUrl(response.data.previous);
      console.log("Fetched Comments Response", response);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setErrorMessage("Failed to get comments.");
      setShowAlert(true);
    }
    //   fetchComments();
  };

  useEffect(() => {
    fetchData();
    fetchComments();
  }, [pk, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        Endpoints.applicationcomments.replace(":pk", pk),
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Comment POST success response:", response);

      // Fetch comments again after submitting a new comment
      fetchComments();
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setErrorMessage("Failed to submit comment. Please try again.");
      setShowAlert(true);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // Make a PATCH request to update the application status
      const response = await axios.patch(
        Endpoints.applicationfilled.replace(":pk", pk),
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );

      console.log("Application status updated successfully:", response.data);

      // Update the local state with the new status
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  }

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

        <div className={classes["status-container"]}>
          <p>
            <b>Status of application: </b>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>

        <form className={classes["form"]} action="">
          <div class={classes["grid-container"]}>
            <div class={classes["grid-item"]}>
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
            <div class={classes["grid-item"]}>
              <input
                className="input"
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Last name"
                required
                disabled
                value={formData.last_name}
              />
            </div>
            <div class={classes["grid-item"]}>
              <input
                className="input"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled
                value={formData.email}
              />
            </div>
            <div class={classes["grid-item"]}>
              <input
                className="input"
                id="phonenum"
                type="text"
                name="phonenum"
                placeholder="Phone #"
                required
                disabled
                value={formData.phone}
              />
            </div>
            <div class={classes["grid-item"]}>
              <input
                className="input"
                id="country"
                type="text"
                name="country"
                placeholder="Country"
                required
                disabled
                value={formData.country}
              />
            </div>
            <div class={classes["grid-item"]}>
              <input
                className="input"
                id="province"
                type="text"
                name="province"
                placeholder="Province"
                required
                disabled
                value={formData.province}
              />
            </div>
            <div class={classes["grid-item"]}>
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
            <div class={classes["grid-item"]}>
              <input
                className="input"
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
        <div className={classes["status-buttons"]}>
          {user.account_type === "shelter" && status === "pending" && (
            <button
              className={classes["status-button"]}
              onClick={() => handleStatusChange("accepted")}
            >
              Accept
            </button>
          )}
          {user.account_type === "shelter" && status === "pending" && (
            <button
              className={classes["status-button"]}
              onClick={() => handleStatusChange("denied")}
            >
              Deny
            </button>
          )}
          {user.account_type === "seeker" && (status === "accepted" || status === "pending") && (
            <button
              className={classes["status-button"]}
              onClick={() => handleStatusChange("withdrawn")}
            >
              Withdraw
            </button>
          )}
        </div>

        <div className={classes["reviewContainer"]}>
          <hr></hr>
          <h2 className={classes["reviews"]}>Comments</h2>
          <form className={classes["newReview"]} onSubmit={handleSubmit}>
            <p id="review-name">
              {user.userId
                ? `${user.first_name} ${user.last_name}`
                : "Please log in"}
            </p>

            <div className={classes["gridItem"]}>
              <input
                id="review-content"
                type="text"
                name="review"
                placeholder="Leave your review here"
                required
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>

            <div className={classes["gridItem2"]}>
              <button
                className={classes["save"]}
                type="submit"
                disabled={!user.userId}
              >
                Submit
              </button>
            </div>
          </form>

          {searchResults &&
            searchResults.map((comment) => (
              <div
                key={comment.id}
                className={`${user.userId === formData.shelter.id
                  ? classes["shelterOwnerComment"]
                  : classes["commentItem"]
                  }`}
              >
                <p>
                  {comment.user &&
                    `${comment.user_name} (${comment.user_type})`}{" "}
                </p>
                <p>{comment.content}</p>
              </div>
            ))}
        </div>
        <div className={classes["footerContainer"]}>
          <button
            className={classes["paginationButton"]}
            onClick={() => fetchComments(previousPageUrl)}
          >
            {"<"}
          </button>
          <button
            className={classes["paginationButton"]}
            onClick={() => fetchComments(nextPageUrl)}
          >
            {">"}
          </button>
        </div>
      </content>
    </body>
  );
}

export default PetApplicationFilled;
