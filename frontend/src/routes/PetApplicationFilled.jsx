import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import classes from "./PetApplicationFilled.module.css";
import axios from "axios";
import useUser from "../context/UserContext";
import Endpoints from "../constants/Endpoints";
import { useNavigate, useParams } from "react-router-dom";

function PetApplicationFilled() {
  const { pk } = useParams();
  const [newComment, setNewComment] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const user = useUser();
  const [petDetails, setPetDetails] = useState({});

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

  useEffect(() => {
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

        // Update formData with application details
        // setFormData((prevData) => ({
        //   ...prevData,
        //   seeker: foundApplication.seeker,
        //   pet: foundApplication.pet,
        // }));
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
      }
    };

    fetchData();
  }, [pk, user.token]);

  const fetchComments = async (url) => {
    try {
      const response = await axios.get(
        url || Endpoints.applicationcomments.replace(":pk", pk)
      );
      setSearchResults(response.data.results);
      setNextPageUrl(response.data.next);
      setPreviousPageUrl(response.data.previous);
        console.log("Fetched Comments Response", response);
        
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  //   useEffect(() => {
  //     // Fetch application from the server

  //     const fetchApplication = async () => {
  //       try {
  //         const response = await axios.get(
  //           // Endpoints.application.replace(":pk", pk),
  //           Endpoints.application,
  //           {
  //             headers: {
  //               Authorization: "Bearer " + user.token,
  //             },
  //           },
  //           { params: { pk: pk } }
  //         );
  //         console.log("Application details", response.data.results);

  //         var foundApplication = null;

  //         response.data.results.forEach((application) => {
  //           if (application.id === parseInt(pk)) {
  //             foundApplication = application;
  //           }
  //         });

  //         console.log("Found application", foundApplication);

  //         // setFormData(foundApplication);
  //         setFormData((prevData) => ({
  //           ...prevData,
  //           seeker: foundApplication.seeker,
  //           pet: foundApplication.pet,
  //         }));
  //       } catch (error) {
  //         console.error("Error fetching application details:", error);
  //       }
  //     };

  //     fetchApplication();
  //   }, [pk, user.token]);

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
    }
  };

  //   useEffect(() => {
  //     const fetchPetDetails = async () => {
  //       try {
  //         const response = await axios.get(
  //           Endpoints.pet.replace(":pk", formData.pet),
  //           {
  //             headers: {
  //               Authorization: "Bearer " + user.token,
  //             },
  //           }
  //         );
  //         setPetDetails(response.data);
  //       } catch (error) {
  //         console.error("Error fetching pet details:", error);
  //       }
  //     };

  //     fetchPetDetails();
  //   }, [pk, user.token]);

  return (
    <body className={classes["page-container"]}>
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

        <div className={classes["reviewContainer"]}>
          <hr></hr>
          <h2 className={classes["reviews"]}>Comments</h2>
          <form className={classes["new-review"]} onSubmit={handleSubmit}>
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
                className={`${
                  user.userId === formData.shelter.id
                    ? classes["shelterOwnerComment"]
                    : classes["commentItem"]
                }`}
              >
                <p>
                  {comment.user &&
                    `${comment.user_name} (${comment.user_type})`}{" "}
                  -{" "}
                  {comment.rating ? `Rating: ${comment.rating}/5` : "No Rating"}
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
