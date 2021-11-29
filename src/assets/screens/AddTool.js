import { Container } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/addTools.scss";

const AddTool = () => {
	const history = useHistory();
	const [fetchedCats, setFetchedCats] = useState([]);
	const [fetchedCars, setFetchedCars] = useState([]);
	const [category, setCategory] = useState("");
	const [car, setCar] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");

	useEffect(() => {
		(async () => {
			const getInfo = await fetch(
				"https://backend.mariosk.xyz:3001/addTool/info"
			);
			const response = await getInfo.json();
			setFetchedCars(
				response.cars.map((car) => ({
					license: car.license_plate,
				}))
			);
			setFetchedCats(
				response.categories.map((category) => ({
					category: category.category,
				}))
			);
		})();
	}, []);

	const handleCat = (e) => {
		setCategory(e.target.value);
	};
	const handleCar = (e) => {
		setCar(e.target.value);
	};
	const handleName = (e) => {
		setName(e.target.value);
	};
	const handleAmount = (e) => {
		setAmount(e.target.value);
	};

	const handleAddToolRequest = () => {
		(async () => {
			const addTool = await fetch(
				"https://backend.mariosk.xyz:3001/addTool/complete",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						"auth-token": localStorage.getItem("token"),
					},
					body: JSON.stringify({
						tool: name,
						category: category,
						car: car,
						amount: amount,
					}),
				}
			);
			const response = await addTool.json();
			if (response.status === 200) {
				history.goBack();
			}
		})();
	};

	return (
		<Container
			bg="#10151A"
			maxW="100vw"
			h="100vh"
			color="white"
			className="add-tools-screen"
		>
			<input
				type="text"
				className="general-input"
				placeholder="Tool"
				value={name}
				onChange={handleName}
			/>
			<select value={category} onChange={handleCat}>
				<option value="" disabled>
					-- Choose category --
				</option>
				{fetchedCats.map((e, index) => (
					<option key={index} value={e.category}>
						{e.category.length == 2
							? e.category.toUpperCase()
							: e.category.charAt(0).toUpperCase() +
							  e.category.slice(1)}{" "}
						Tools
					</option>
				))}
			</select>
			<select value={car} onChange={handleCar}>
				<option value="" disabled>
					-- Choose car --
				</option>
				{fetchedCars.map((e, index) => (
					<option key={index} value={e.license}>
						{e.license}
					</option>
				))}
			</select>
			<input
				type="text"
				className="general-input"
				placeholder="Amount"
				value={amount}
				onChange={handleAmount}
			/>

			<button
				className="btn-general-add-tool add"
				onClick={handleAddToolRequest}
			>
				Add Tool
			</button>
			<button
				className="btn-general-add-tool cancel"
				onClick={() => history.goBack()}
			>
				Cancel
			</button>
		</Container>
	);
};

export default AddTool;
