import styles from "./ShelterReview.module.css";
import NavBar from "../components/NavBar";

function ShelterReview() {
    return (
        <body className={styles.pageContainer}>
            <NavBar />
            <div className={styles.shelterManagement}>
                <h1>Pleasant Puppies</h1>
                <div className={styles.gridContainer}>
                    <div className={styles.shelterImgContainer}>
                        <img className={styles.shelterImg} src={require("../images/saskatoon-spca.jpg")} alt="shelter" />
                    </div>
                    <p class="info" id="shelter-details-shelter-name">
                        Name: Pleasant Puppies
                    </p>
                    <p class="info" id="shelter-details-shelter-phone">Phone: 3061231234</p>
                    <p class="info" id="shelter-details-shelter-mission">
                        Our Mission: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Beatae amet velit corrupti exercitationem. Aliquam error quam culpa, sit
                        officia, at iusto, possimus quisquam repellat iste autem reprehenderit.
                        Quis, incidunt cum!
                    </p>
                    <p class="info" id="shelter-details-shelter-country">Country: Canada</p>
                    <p class="info" id="shelter-details-shelter-province">Province: Ontario</p>
                    <p class="info" id="shelter-details-shelter-postal">
                        Postal Code: 123 ABC
                    </p>
                    <p class="info" id="shelter-details-shelter-address">
                        Address: 123 Street St.
                    </p>
                </div>

                <div className={styles.reviewContainer}>
                    <h2>Reviews</h2>
    
                    <form class="new-review" action="">
                        <p id="review-name">FirstnameLastname</p>

                        <div class="grid-item">
                            <input
                                id="review-content"
                                type="text"
                                name="review"
                                placeholder="Leave your review here"
                                required
                            />
                        </div>

                        <div class="grid-item">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    <div class="new-review">
                        <p id="review-name">Amy Lu</p>
                        <p id="review-content">
                            1/5 Stars. Can't read Mission Statement because it's in Latin.
                            <br />
                            ୧༼ಠ益ಠ༽୨
                        </p>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default ShelterReview