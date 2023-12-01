import "./UpdateShelterAccount.module.css";
import ShelterManagementBar from "../../components/ShelterManagementBar";
import NavBar from "../../components/NavBar";

function UpdateShelter() {
	return (
		<body class="page-container">
            <NavBar />
            <ShelterManagementBar />
            <div class="shelter-management">
                <form action="">
                    <div class="profile-container">
                        <img class="profile-img" src={require("../../images/profile1.png")}/>
                    </div>
                    <div class="grid-item2">
                        <textarea rows="4" id="mission" type="text" name="mission" placeholder="Mission statement - include what your vision and goals are!" required></textarea>
                    </div>
                    <div class="grid-container">
                        <div class="grid-item">
                            <input id="firstname" type="text" name="firstname" placeholder="First name" required />
                        </div>
                        <div class="grid-item">
                            <input id="lastname" type="text" name="lastname" placeholder="Last name" required />
                        </div>
                        <div class="grid-item">
                            <input id="email" type="email" name="email" placeholder="Email" required />
                        </div>
                        <div class="grid-item">
                            <input id="sheltername" type="text" name="sheltername" placeholder="Shelter name" required />
                        </div>
                        <div class="grid-item">
                            <input id="phonenum" type="text" name="phonenum" placeholder="Phone #" required />
                        </div>
                        <div class="grid-item">
                            <input id="country" type="text" name="country" placeholder="Country" required />
                        </div>
                        <div class="grid-item">
                            <input id="province" type="text" name="province" placeholder="Province" required />
                        </div>
                        <div class="grid-item">
                            <input id="address" type="text" name="address" placeholder="Address" required />
                        </div>
                        <div class="grid-item">
                            <input id="postalcode" type="text" name="postalcode" placeholder="Postal Code" required />
                        </div>
                    </div>
                    <button class="login" type="submit">Save</button>
                </form>
            </div>
        </body>
	)
}

export default UpdateShelter