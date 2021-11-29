import { Container } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../styles/employees.scss";

const EditEmployee = () => {
	const [uid, setId] = useState();
	const [username, setUsername] = useState();
	const [name, setName] = useState();
	const [surname, setSurname] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();
	const [role, setRole] = useState();
	const history = useHistory();
	const { id } = useParams();
	useEffect(() => {
		(async () => {
			const getEmployee = await fetch(
				`https://backend.mariosk.xyz:3001/getEmployee/${id}`
			);
			const response = await getEmployee.json();
			response.map((e) => {
				setId(e.id);
				setUsername(e.username);
				setName(e.name);
				setSurname(e.surname);
				setEmail(e.email);
				setPhone(e.phoneNumber);
				setRole(e.role);
			});
		})();
	}, []);

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleName = (e) => {
		setName(e.target.value);
	};
	const handleSurname = (e) => {
		setSurname(e.target.value);
	};
	const handlePhoneNumber = (e) => {
		setPhone(e.target.value);
	};
	const handleRole = (e) => {
		setRole(e.target.value);
	};

	const handleSave = () => {
		(async () => {
			const save = await fetch(
				"https://backend.mariosk.xyz:3001/save/employee",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						"auth-token": localStorage.getItem("token"),
					},
					body: JSON.stringify({
						uid,
						username,
						name,
						surname,
						email,
						phone,
						role,
					}),
				}
			);
			const responseSave = await save.json();
			if (responseSave.status == 200) {
				history.goBack();
			}
		})();
	};

	return (
		<>
			<Container
				bg="#10151A"
				maxW="100vw"
				h="100vh"
				color="white"
				className="edit-employee-wrapper"
			>
				<p className="edit-employee-text">Manage employee account</p>
				<p>ID</p>
				<input
					type="text"
					className="general-input"
					value={uid}
					disabled
				/>
				<p>Username</p>
				<input
					type="text"
					className="general-input"
					value={username}
					onChange={handleUsername}
					placeholder="Username"
				/>
				<p>Name</p>
				<input
					type="text"
					className="general-input"
					value={name}
					onChange={handleName}
					placeholder="Name"
				/>
				<p>Surname</p>
				<input
					type="text"
					className="general-input"
					value={surname}
					onChange={handleSurname}
					placeholder="Surname"
				/>
				<p>Email</p>
				<input
					type="text"
					className="general-input"
					value={email}
					onChange={handleEmail}
					placeholder="Email"
				/>
				<p>Phone Number</p>
				<input
					type="text"
					className="general-input"
					value={phone}
					onChange={handlePhoneNumber}
					placeholder="Phone Number"
				/>
				<p>Role</p>
				<select value={role} onChange={handleRole}>
					<option value="admin">Admin</option>
					<option value="employee">Employee</option>
				</select>

				<div
					class="button-edit revoke"
					onClick={() => {
						(async () => {
							const revoke = await fetch(
								"https://backend.mariosk.xyz:3001/revoke/employee",
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json",
										Accept: "application/json",
									},
									body: JSON.stringify({
										username: username,
									}),
								}
							);
							const response = await revoke.json();
							if (response.status == 200) {
								history.goBack();
							}
						})();
					}}
				>
					Revoke Account
				</div>
				<div class="button-edit save" onClick={handleSave}>
					Save Changes
				</div>
				<div
					class="button-edit cancel"
					onClick={() => history.goBack()}
				>
					Cancel
				</div>
			</Container>
		</>
	);
};

export default EditEmployee;
