import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import HamburgerButton from "../components/HamburgerButton";
import Navigation from "../components/Navigation";
import Car from "../components/Car";
import { Container, Flex } from "@chakra-ui/react";
import "../styles/carcard.scss";

const ManageCars = () => {
	const { menu } = useAuth();
	const [cars, setCars] = useState([]);
	useEffect(() => {
		(async () => {
			const getCars = await fetch(
				"http://back.backend.mariosk.xyz:3001/getCars"
			);
			const response = await getCars.json();
			setCars(
				response.map((e) => ({
					license: e.license_plate,
					fuel: e.fuel,
					transmission: e.transmission,
					status: e.status,
				}))
			);
		})();
	}, []);
	return (
		<Container bg="#10151A" maxW="100vw" h="100vh" color="white">
			<HamburgerButton />
			{menu && <Navigation />}
			<Link to="/add/car" className="add-tool-btn">
				Add Car
			</Link>
			<Flex flexDirection="column" w="100%" align="center">
				<div className="car-container">
					{cars.map((e, index) => (
						<Car
							key={index}
							license={e.license}
							fuel={e.fuel}
							transmission={e.transmission}
							status={e.status}
						/>
					))}
				</div>
			</Flex>
		</Container>
	);
};

export default ManageCars;
