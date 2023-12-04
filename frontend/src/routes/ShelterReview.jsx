import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./ShelterReview.module.css";
import NavBar from "../components/NavBar";
import axios from 'axios';
import Endpoints from '../constants/Endpoints';
import useUser from "../context/UserContext";

function ShelterReview() {
    const user = useUser();
    const { pk } = useParams();
    const [shelterData, setShelterData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shelterResponse = await axios.get(Endpoints.specificshelter.replace(":pk", pk));
                const commentsResponse = await axios.get(Endpoints.sheltercomments.replace(":pk", pk));

                setShelterData(shelterResponse.data);
                setComments(commentsResponse.data.results);

                const userIds = commentsResponse.data.results.map(comment => comment.user);

                const users = [];

                for (const userId of userIds) {
                    // Check if the user is a seeker
                    const seekerResponse = await axios.get(Endpoints.seekers);
                    const seekerUser = seekerResponse.data.find((currUser) => currUser.id === userId);
                    if (seekerUser) {
                        users.push(seekerUser);
                        continue; // Move to the next iteration
                    }

                    // Check if the user is a shelter
                    const shelterResponse = await axios.get(Endpoints.shelters);
                    const shelterUser = shelterResponse.data.find((currUser) => currUser.id === userId);
                    if (shelterUser) {
                        users.push(shelterUser);
                    }
                }

                setComments((prevComments) =>
                    prevComments.map((comment) => ({
                        ...comment,
                        user: users.find((user) => user.id === comment.user),
                    }))
                );
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pk]);


    // useEffect(() => {
    //     const fetchShelterInformation = async () => {
    //         try {
    //             const response = await axios.get(Endpoints.specificshelter.replace(":pk", pk));
    //             setShelterData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching shelter information:', error);
    //         }
    //     };

    //     const fetchComments = async () => {
    //         try {
    //             const response = await axios.get(Endpoints.sheltercomments.replace(":pk", pk));
    //             setComments(response.data.results);
    //         } catch (error) {
    //             console.error('Error fetching comments:', error);
    //         }
    //     };

    //     const fetchUserDetails = async (userIds) => {
    //         try {
    //             const users = [];

    //             for (const userId of userIds) {
    //                 // Check if the user is a seeker
    //                 const seekerResponse = await axios.get(Endpoints.seekers);
    //                 const seekerUser = seekerResponse.data.find((currUser) => currUser.id === userId);
    //                 if (seekerUser) {
    //                     users.push(seekerUser);
    //                     continue; // Move to the next iteration
    //                 }

    //                 // Check if the user is a shelter
    //                 const shelterResponse = await axios.get(Endpoints.shelters);
    //                 const shelterUser = shelterResponse.data.find((currUser) => currUser.id === userId);
    //                 if (shelterUser) {
    //                     users.push(shelterUser);
    //                 }
    //             }

    //             setComments((prevComments) =>
    //                 prevComments.map((comment) => ({
    //                     ...comment,
    //                     user: users.find((user) => user.id === comment.user),
    //                 }))
    //             );

    //         } catch (error) {
    //             console.error('Error fetching user details:', error);
    //         }
    //     };

    //     fetchShelterInformation();
    //     fetchComments()
    //         .then((comments) => {
    //             const userIds = comments.map((comment) => comment.user);
    //             fetchUserDetails(userIds);
    //         });
    // }, [pk]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to create a new comment
            const response = await axios.post(Endpoints.sheltercomments.replace(":pk", pk), {
                content: newComment,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const userDetailsResponse = {
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    account_type: user.account_type,
                },
            }
            const userDetails = userDetailsResponse.data;

            // Add the new comment to the existing comments with user details
            setComments((prevComments) => [
                ...prevComments,
                { id: response.data.id, user: userDetails, content: newComment },
            ]);

            // Clear the input field
            setNewComment("");
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleReplyClick = (commentId) => {
        console.log("Replying to comment:", commentId);
    }

    return (
        <body className={styles.pageContainer}>
            <NavBar />
            {shelterData ? (
                <div className={styles.shelterManagement}>
                    <h1>{shelterData.shelter.name}</h1>
                    <div className={styles.gridContainer}>
                        <div className={styles.shelterImgContainer}>
                            <img className={styles.shelterImg} src={shelterData.shelter.photo ? shelterData.shelter.photo : require("../images/saskatoon-spca.jpg")} alt={shelterData.shelter.name} />
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
                        <h2>Reviews</h2>
                        <form className={styles.newReview} onSubmit={handleSubmit}>
                            <p id="review-name">{user.userId ? `${user.first_name} ${user.last_name}` : 'Please log in'}</p>

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

                        {comments && comments.map(comment => (

                            <div key={comment.id} className={`${user.userId === pk ? styles.shelterOwnerComment : styles.commentItem}`}>
                                <p>{comment.user && `${comment.user.first_name} ${comment.user.last_name} (${comment.user.account_type})`}</p>
                                <p>{comment.content}</p>
                                <div className={styles.gridItem2}>
                                    <button className={styles.save} onClick={() => handleReplyClick(comment.id)} disabled={!user.userId}>Reply</button>
                                    {/* Add a reply form or handle reply logic */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading shelter information...</p>
            )}
        </body>
    )
}

export default ShelterReview