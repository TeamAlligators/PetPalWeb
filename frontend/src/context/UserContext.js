import React, { createContext, useContext, useState } from "react"

const UserContext = createContext({
	userId: null,
	first_name: "",
	last_name: "",
	account_type: "",
	setUserInfo: () => {},
	token: "",
})

export const UserProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState({
		userId: null,
		first_name: "",
		last_name: "",
		account_type: "",
		token: "",
	})

	return (
		<UserContext.Provider value={{ ...userInfo, setUserInfo }}>
			{children}
		</UserContext.Provider>
	)
}

const useUser = () => {
	return useContext(UserContext)
}

export default useUser