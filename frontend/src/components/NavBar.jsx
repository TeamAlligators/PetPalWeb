import { Link, NavLink } from "react-router-dom"
import styles from "./NavBar.module.css"
import useUser from "../context/UserContext"
import axios from "axios"
import { useEffect, useState } from "react"
import Endpoints from "../constants/Endpoints"
import AccountType from "../constants/AccountType"

// /applications/{application.id}/comment/
function NavBar() {
	const user = useUser()
	const [notifications, setNotifications] = useState([])
	const [read, setRead] = useState("False")
	const [nextPageUrl, setNextPageUrl] = useState(null)
	const [previousPageUrl, setPreviousPageUrl] = useState(null)

	const fetchNotifications = async (url) => {
		try {
			const response = await axios.get(`http://localhost:80/notifications/`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})

			const filteredNotifications = response.data.results.filter(
				(notification) => {
					const val = read === "False" ? false : true
					return notification.is_read === val
				}
			)

			setNotifications(filteredNotifications)
			setNextPageUrl(response.data.next)
			setPreviousPageUrl(response.data.previous)
			console.log("notifs response", response)
		} catch (error) {
			console.error("Error fetching notifications:", error)
		}
	}

	// useEffect(() => {
	// 	setInterval(() => {
	// 		fetchNotifications(Endpoints.notifs)
	// 	}, 10000)
	// }, [])

	useEffect(() => {
		fetchNotifications(Endpoints.notifs)
	}, [read])

	const handleNotificationClick = async (notificationId, index) => {
		try {
			const response = await axios.get(
				`http://localhost:80/notifications/${notificationId}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			)

			setNotifications((prevNotifications) => {
				const updatedNotifications = [...prevNotifications]
				updatedNotifications.splice(index, 1)
				return updatedNotifications
			})
			console.log("Notification details:", response.data)
		} catch (error) {
			console.error(
				`Error fetching notification details for ID ${notificationId}:`,
				error
			)
		}
	}

	return (
		<nav id={styles.navigationBar}>
			<span id={styles.navItemLeft}>
				<NavLink className={styles.navLink} to={`/`}>
					<img
						src={require("../images/logo.png")}
						class={styles["logo"]}
						alt="logo"
					/>
				</NavLink>
			</span>
			<span id={styles.navItem}>
				<div className={styles["notification-container"]}>
					{notifications.length > 0 && <div className={styles["red-dot"]}></div>}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						className="bi bi-bell-fill notification"
						viewBox="0 0 16 16"
					>
						<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
					</svg>
					<div className={styles["notification-list"]}>
						<div className={styles["poop"]}>
							<select
								name="filter"
								className={styles["select"]}
								value={read}
								onChange={(e) => setRead(e.target.value)}
							>
								<option value={"False"}>Unread</option>
								<option value={"True"}>Read</option>
							</select>
							<button
								className={styles["sign-up-button"]}
								onClick={() => fetchNotifications(Endpoints.notification)}
							>
								{"Refresh"}
							</button>
						</div>
						{notifications.map((notification, index) => {
							// /applications/{application.id}/comment/
							let appUrl = notification.url.replace(/applications/g, "petapplication")
							appUrl = appUrl.replace(/\/coment\//g, "")

							const appResponse = axios.get(
								`http://localhost:80/applications/${notification.application}/`,
								{
									headers: {
										Authorization: `Bearer ${user.token}`,
									},
								}
							)
							return (
								<div key={Math.random()}>
									<p className={styles["lol"]} key={Math.random()}>
										{notification.content}
									</p>
									<div
										key={Math.random()}
										className={styles["notification-list-coninater"]}
									>
										<NavLink
											className={styles["sign-up-button"]}
											to={appUrl}
											key={Math.random()}
											onClick={() => handleNotificationClick(notification.id, index)}
										>
											To App
										</NavLink>
										<NavLink
											className={styles["sign-up-button"]}
											to={
												user.account_type === AccountType.SHELTER
													? "/sheltermanagement" // make this shetler detials when done
													: "/pets/" + appResponse.data.pet
											}
											key={Math.random()}
											onClick={() => handleNotificationClick(notification.id, index)}
										>
											To{" "}
											{user.account_type === AccountType.SHELTER ? "Shelter" : "Listing"}
										</NavLink>
									</div>
								</div>
							)
						})}
						{notifications.length > 0 && (
							<div className={styles["notification-list-coninater"]}>
								{
									<button
										className={styles["sign-up-button"]}
										onClick={() => fetchNotifications(previousPageUrl)}
									>
										{"<"}
									</button>
								}
								{
									<button
										className={styles["sign-up-button"]}
										onClick={() => fetchNotifications(nextPageUrl)}
									>
										{">"}
									</button>
								}
							</div>
						)}
					</div>
				</div>
				<NavLink className={styles.navLink} to={`/search`}>
					Search
				</NavLink>
				<NavLink className={styles.navIcon} to={`/search`}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						class="bi bi-search-heart-fill"
						viewBox="0 0 16 16"
					>
						<path d="M6.5 13a6.474 6.474 0 0 0 3.845-1.258h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.008 1.008 0 0 0-.115-.1A6.471 6.471 0 0 0 13 6.5 6.502 6.502 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13Zm0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
					</svg>
				</NavLink>

				<NavLink className={styles.navLink} to={`/shelterlistings`}>
					Shelters
				</NavLink>
				<NavLink className={styles.navIcon} to={`/shelterlistings`}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						class="bi bi-houses-fill"
						viewBox="0 0 16 16"
					>
						<path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.51 2.51 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354L7.207 1Z" />
						<path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Z" />
					</svg>
				</NavLink>
				{/* <a className={styles.navLink} href="faq-page.html">
					FAQ
				</a>
				<a className={styles.navIcon} href="faq-page.html">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						class="bi bi-clipboard-heart-fill"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"
						/>
						<path
							fill-rule="evenodd"
							d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm4 5.982c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"
						/>
					</svg>
				</a> */}
				{user.token ? (
					<NavLink
						className={styles["nav-name"]}
						to={
							user.account_type === "seeker"
								? "/seekermanagement"
								: "/sheltermanagement"
						}
					>
						{user.first_name} {user.last_name}
					</NavLink>
				) : (
					<>
						<NavLink className={styles.signUpButton} to={`/signup`}>
							Sign up
						</NavLink>
						<NavLink className={styles.signUpButton} to={`/login`}>
							Login
						</NavLink>
					</>
				)}
			</span>
		</nav>
	)
}

export default NavBar
