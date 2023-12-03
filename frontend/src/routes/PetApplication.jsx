// import { NavLink } from "react-router-dom"
import { useState } from "react"
import NavBar from "../components/NavBar"
import classes from "./PetApplication.module.css"
import axios from "axios"
import Endpoints from "../constants/Endpoints";

function PetApplication() {
    const [formData, setFormData] = useState({
        // pet: "",
        // seeker: "",
        // shelter: "",
        // first_name: "",
        // last_name: "",
        // email: "",
        // phone: "",
        // country: "",
        // province: "",
        // address: "",
        // postal_code: "",


        // pet: /* ID of the selected pet */,
        // seeker: /* ID of the current user or seeker */,
        // Shelter: /* ID of the shelter if applicable */,
        // first_name: formData.firstname,
        // last_name: formData.lastname,
        // phone: formData.phonenum,
        // email: formData.email,
        // address: formData.address,
        // country: formData.country,
        // province: formData.province,
        // postal_code: formData.postalcode,
        // You can set other fields as needed
    });

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Make a POST request to create a new application
        console.log("Form data:", formData);
        const response = await axios.post(Endpoints.application, formData);
        console.log("Application submitted successfully:", response.data);

        // Assuming you want to navigate to a new page after successful submission
        // You can use react-router-dom or any other navigation method here
        // For example, redirecting to a success page
        // window.location.href = "pet-applications-filled.html";
    } catch (error) {
        console.error("Error submitting application:", error);
    }
    };

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
                    // value={formData.first_name}
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
                        // value={formData.last_name}
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
                        // value={formData.email}
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
                        // value={formData.phone}
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
                        // value={formData.country}
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
                        // value={formData.province}
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
                        // value={formData.address}
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
                        // value={formData.postal_code}
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


    // return (
    //     <body class={classes["page-container"]}>
    //         <NavBar />
    //         <content class={classes["pet-application-content"]}>
    //             <h1>Adoption Application</h1>

    //             <div class={classes["profile-container"]}>
    //                 <img
    //                     src={require("../images/derpycat.png")}
    //                     alt="cat"
    //                 />
    //             </div>

    //             <form action="">
    //                 <div class={classes["grid-container"]}>
    //                     <div class={classes["grid-item"]}>
    //                         <input
    //                             id="firstname"
    //                             type="text"
    //                             name="firstname"
    //                             placeholder="First name"
    //                             required
    //                         />
                        // </div>
                    //     <div class={classes["grid-item"]}>
                    //         <input
                    //             id="lastname"
                    //             type="text"
                    //             name="lastname"
                    //             placeholder="Last name"
                    //             required
                    //         />
                    //     </div>
                    //     <div class={classes["grid-item"]}>
                    //         <input
                    //             id="email"
                    //             type="email"
                    //             name="email"
                    //             placeholder="Email"
                    //             required
                    //         />
                    //     </div>
                    //     <div class={classes["grid-item"]}>
                    //         <input
                    //             id="phonenum"
                    //             type="text"
                    //             name="phonenum"
                    //             placeholder="Phone #"
                    //             required
                    //         />
                    //     </div>
                    //     <div class={classes["grid-item"]}>
                    //         <input
                    //             id="country"
                    //             type="text"
                    //             name="country"
                    //             placeholder="Country"
                    //             required
                    //         />
                    //     </div>
                    //     <div class={classes["grid-item"]}>
                    //         <input
                    //             id="province"
                    //             type="text"
                    //             name="province"
                    //             placeholder="Province"
                    //             required
                    //         />
                    //     </div>
                    //     <div class={classes["grid-item"]}>
                    //         <input
                    //             id="address"
                    //             type="text"
                    //             name="address"
                    //             placeholder="Address"
                    //             required
                    //         />
                    //     </div>
                    //     <div class={classes["grid-item"]}>
                    //         <input
                    //             id="postalcode"
                    //             type="text"
                    //             name="postalcode"
                    //             placeholder="Postal Code"
                    //             required
                    //         />
                    //     </div>
                    // </div>
    //             </form>
    //             <div class={classes["button-holder"]}>
    //                 <a href="pet-applications-filled.html">
    //                     <button class="login" type="submit">Apply</button>
    //                 </a>
    //             </div>
    //         </content>
    //     </body>
    // )
}

export default PetApplication


