import React, { createContext, useContext, useState } from "react"

const UserContext = createContext({
	userId: null,
	first_name: "",
	last_name: "",
	account_type: "",
	setUserInfo: () => {},
})

export const UserProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState({
		userId: null,
		first_name: "",
		last_name: "",
		account_type: "",
	})

	return (
		<UserContext.Provider value={{ ...userInfo, setUserInfo }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => {
	return useContext(UserContext)
}
