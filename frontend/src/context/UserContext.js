import React, { createContext, useContext, useState } from "react"

const UserContext = createContext({
	userId: null,
	first_name: "",
	last_name: "",
	account_type: "",
	email: "",
	setUserInfo: () => {},
	token: "",
	seeker: {},
	shelter: {},
})

export const UserProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState({
		userId: null,
		first_name: "",
		last_name: "",
		account_type: "",
		email: "",
		token: "",
		seeker: {},
		shelter: {},
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
