import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./ShelterReview.module.css";
import NavBar from "../components/NavBar";
import axios from 'axios';
import Endpoints from '../constants/Endpoints';
import Alert from "../components/Alert";
import useUser from "../context/UserContext";

function ShelterReview() {
    const user = useUser();
    const { pk } = useParams();
    const [shelterData, setShelterData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(null);
    const [searchResults, setSearchResults] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState(null)
    const [previousPageUrl, setPreviousPageUrl] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const fetchShelterData = async () => {
        try {
            const response = await axios.get(Endpoints.specificshelter.replace(":pk", pk));
            setShelterData(response.data);
            console.log("shelterResponse", response);
        } catch (error) {
            console.error('Error fetching shelter data:', error);
            setErrorMessage("Failed to get shelter data. Please try again.");
            setShowAlert(true);
        }
    };

    const fetchComments = async (url) => {
        try {
            const response = await axios.get(url || Endpoints.sheltercomments.replace(":pk", pk));
            setSearchResults(response.data.results);
            setNextPageUrl(response.data.next);
            setPreviousPageUrl(response.data.previous);
            console.log("commentsResponse", response);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setErrorMessage("Failed to get comments.");
            setShowAlert(true);
        }
    };

    useEffect(() => {
        fetchShelterData();
        fetchComments();
    }, [pk]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Endpoints.sheltercomments.replace(":pk", pk), {
                content: newComment,
                rating: newRating
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log("Comment response:", response);

            // Fetch comments again after submitting a new comment
            fetchComments();
            setNewComment("");
            setNewRating(null);
        } catch (error) {
            console.error('Error submitting comment:', error);
            setErrorMessage("Failed to submit comment. Please try again.");
            setShowAlert(true);
        }
    };

    return (
        <body className={styles.pageContainer}>
            <Alert
                show={showAlert}
                success={false}
                message={errorMessage}
                onClose={() => setShowAlert(false)}
            />
            <NavBar />
            {shelterData ? (
                <div className={styles.shelterManagement}>
                    <h1 className={styles.shelterName}>{shelterData.shelter.name}</h1>
                    <div className={styles.gridContainer}>
                        <div className={styles.shelterImgContainer}>
                            <img className={styles.shelterImg} src={shelterData.photo ? shelterData.photo : require("../images/saskatoon-spca.jpg")} alt={shelterData.shelter.name} />
                        </div>
                        <p id="shelter-details-shelter-phone"><strong>Phone:</strong> {shelterData.shelter.phone}</p>
                        <p id="shelter-details-shelter-mission">
                            <strong>Shelter Mission:</strong> {shelterData.shelter.mission}
                        </p>
                        <p id="shelter-details-shelter-country"><strong>Country:</strong> {shelterData.shelter.country}</p>
                        <p id="shelter-details-shelter-province"><strong>Province:</strong> {shelterData.shelter.province}</p>
                        <p id="shelter-details-shelter-postal">
                            <strong>Postal Code:</strong> {shelterData.shelter.postal_code}
                        </p>
                        <p id="shelter-details-shelter-address">
                            <strong>Address:</strong> {shelterData.shelter.address}
                        </p>
                    </div>
                    <div className={styles.reviewContainer}>
                        <hr></hr>
                        <h2 className={styles.reviews}>Reviews</h2>
                        <form className={styles.newReview} onSubmit={handleSubmit}>
                            <p id="review-name">{user.userId ? `${user.first_name} ${user.last_name}` : 'Please log in'}</p>
                            <div className={styles.gridItem}>
                                <label className={styles.ratingLabel} htmlFor="review-rating">Rating:</label>
                                <select
                                    className={styles.rating}
                                    id="review-rating"
                                    name="rating"
                                    value={newRating}
                                    onChange={(e) => setNewRating(e.target.value === "noRating" ? null : parseInt(e.target.value))}
                                >
                                    <option value="noRating">No Rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div className={styles.gridItem}>
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

                            <div className={styles.gridItem2}>
                                <button className={styles.save} type="submit" disabled={!user.userId}>Submit</button>
                            </div>
                        </form>

                        {searchResults && searchResults.map(comment => (

                            <div key={comment.id} className={`${user.userId === shelterData.shelter.id ? styles.shelterOwnerComment : styles.commentItem}`}>
                                <p>{comment.user && `${comment.user_name} (${comment.user_type})`} - {comment.rating ? `Rating: ${comment.rating}/5` : 'No Rating'}</p>
                                <p>{comment.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.footerContainer}>
                        <button
                            className={styles.paginationButton}
                            onClick={() => fetchComments(previousPageUrl)}
                        >
                            {"<"}
                        </button>
                        <button
                            className={styles.paginationButton}
                            onClick={() => fetchComments(nextPageUrl)}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading shelter information...</p>
            )}
        </body>
    )
}

export default ShelterReview