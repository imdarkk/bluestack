import React, { useState } from "react";
import { useAuth } from "../auth/auth-context";
import {
	Container,
	Button,
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import "../styles/login.scss";

const Login = () => {
	const { login, error } = useAuth();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<Container bg="#10151A" maxW="100vw" className="login-page">
			{error && (
				<div className="error-wrapper">
					<p>{error}</p>
				</div>
			)}
			<InputGroup w="85vw">
				<InputLeftElement children={<AtSignIcon color="gray.300" />} />
				<Input
					variant="filled"
					type="text"
					placeholder="Username"
					value={username}
					onChange={handleUsername}
                    bg="#222834"
                    color="white"
					_hover={{ bg: "#1a202c" }}
				/>
			</InputGroup>
			<InputGroup w="85vw" mt={2}>
				<InputLeftElement children={<LockIcon color="gray.300" />} />
				<Input
					variant="filled"
					type="password"
					placeholder="Password"
					value={password}
					onChange={handlePassword}
                    bg="#222834"
                    color="white"
					_hover={{ bg: "#1a202c" }}
				/>
			</InputGroup>
			<Button
				colorScheme="teal"
				size="lg"
				w="85vw"
				mt={10}
				onClick={() => login(username, password)}
			>
				Sign In
			</Button>
		</Container>
	);
};

export default Login;
