import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./routes/Home"
import PetSearch from "./routes/PetSearch"
import { UserProvider } from "./context/UserContext"
import Login from "./routes/AuthScreens/Login"
import Signup from "./routes/AuthScreens/Signup"
import PetCreation from "./routes/ShelterManagementScreens/PetCreation"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/search",
		element: <PetSearch />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/petcreation",
		element: <PetCreation />,
	},
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<UserProvider>
			<head>
				<meta charset="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<title>PetPal</title>

				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
					crossorigin="anonymous"
				/>
				<link rel="stylesheet" href="index-style.css" />
			</head>
			<RouterProvider router={router} />
		</UserProvider>
	</React.StrictMode>
)
