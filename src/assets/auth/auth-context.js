import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

const AuthProvider = (props) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [menu, setMenu] = useState(false);
	const [error, setError] = useState("");
	const [details, setUserDetails] = useState("");

	useEffect(() => {
		// Pull saved state
		if (localStorage.getItem("token")) {
			const token = localStorage.getItem("token");

			(async () => {
				const check = await fetch(
					`https://backend.mariosk.xyz:3001/checkUser/${token}`
				);
				const response = await check.json();

				if (response.status === 200) {
					if (response.details.role === "revoked") {
						setLoggedIn(false);
						setError(
							"Account is revoked, please contact a supervisor"
						);
					} else {
						localStorage.setItem(
							"details",
							JSON.stringify(response.details)
						);
						setLoggedIn(response.token);
						setError("");
					}
				} else {
					setLoggedIn(false);
					setError("");
				}
			})();
		} else {
			setLoggedIn(false);
			setError("");
		}
	}, []);

	const login = (username, password) => {
		(async () => {
			if (username && password) {
				const login = await fetch(
					"https://backend.mariosk.xyz:3001/signin",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
						body: JSON.stringify({
							username: username,
							password: password,
						}),
					}
				);
				const response = await login.json();
				if (response.token) {
					if (response.details.role === "revoked") {
						setLoggedIn(false);
						setError(
							"Account is revoked, please contact a supervisor"
						);
					} else {
						localStorage.setItem(
							"details",
							JSON.stringify(response.details)
						);
						localStorage.setItem("token", response.token);
						setLoggedIn(response.token);
						setError("");
					}
				} else {
					setLoggedIn(false);
					setError(response.error);
				}
			} else {
				setLoggedIn(false);
				setError("Please enter a username and/or a password");
			}
		})();
	};
	const logout = () => {
		localStorage.removeItem("details");
		localStorage.removeItem("token");
		setLoggedIn(false);
	};
	const handleMenu = () => {
		setMenu(!menu);
	};

	const authContextValue = {
		login,
		logout,
		loggedIn,
		menu,
		handleMenu,
		error,
		setError,
		details,
	};

	return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
