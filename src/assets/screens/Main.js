import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import HamburgerButton from "../components/HamburgerButton";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import { Container, Flex, Button, Text } from "@chakra-ui/react";
import "../styles/main.scss";
import AppointmentCard from "../components/AppointmentCard";

const Main = () => {
	const history = useHistory();
	const { menu } = useAuth();
	const user = JSON.parse(localStorage.getItem("details"));
	const [today, setToday] = useState([]);
	useEffect(() => {
		(async () => {
			const app = await fetch(
				"https://backend.mariosk.xyz:3001/appointments/today"
			);
			const response = await app.json();
			setToday(
				response.map((item) => ({
					name: item.CustomerName,
					address: item.Address,
					phone: item.Phone,
					time: item.Time,
					description: item.Description,
					status: item.Status,
					id: item.Id,
				}))
			);
		})();
	}, []);
	return (
		<Container bg="#10151A" maxW="100vw" minH="100vh" color="white">
			<HamburgerButton />
			<Flex align="center" flexDirection="column">
				{menu && <Navigation />}
				<div className="main-page-content">
					<Flex className="checklist-wrapper" direction="column">
						{user.role === "admin" && (
							<>
								<Button
									mb={2}
									size="md"
									w="87vw"
									colorScheme="teal"
									onClick={() => history.push("/manage/cars")}
								>
									Manage Cars
								</Button>
								<Button
									mb={5}
									w="87vw"
									colorScheme="teal"
									onClick={() => history.push('/settings')}
								>
									Settings
								</Button>
							</>
						)}

						<Button mt={4} size="md" w="87vw" colorScheme="teal">
							<Link to="/checklists" className="link" disabled>
								Go to checklists
							</Link>
						</Button>
						<Button mt={2} size="md" w="87vw" colorScheme="teal">
							<Link to="/make/quote" className="link">
								Create quote
							</Link>
						</Button>

						<Text fontWeight="bold" fontSize="22px" mt={5} mb={5}>
							Appointments today
						</Text>
						<Flex
							justifyContent="center"
							alignItems="center"
							flexDirection="column"
						>
							{today.map((e) => (
								<AppointmentCard
									name={e.name}
									address={e.address}
									phone={e.phone}
									time={e.time}
									description={e.description}
									id={e.id}
									status={e.status}
									key={e.id}
								/>
							))}
						</Flex>
					</Flex>
				</div>
			</Flex>
		</Container>
	);
};

export default Main;
