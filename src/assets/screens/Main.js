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
    const user = JSON.parse(localStorage.getItem('details'));
    const [today, setToday] = useState([]);
    useEffect(() => {
        (async () => {
            const app = await fetch("http://46.101.219.134:3001/appointments/today");
            const response = await app.json();
            setToday(response.map((item) => ({
                subject: item.Subject,
                location: item.Location,
                startTime: item.StartTime,
                endTime: item.EndTime,
                description: item.Description,
                id: item.Id,
            })));
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
							<Button
								mb={5}
								size="md"
								w="87vw"
								colorScheme="teal"
								onClick={() => history.push("/manage/cars")}
							>
								Manage Cars
							</Button>
						)}

						<Text fontWeight="bold" fontSize="22px" mt={5}>
							Checklists
						</Text>
						<Button mt={4} size="md" w="87vw" colorScheme="teal">
							<Link to="/checklist/acInstall" className="link">
								A/C Install Checklist
							</Link>
						</Button>
						<Button mt={2} size="md" w="87vw" colorScheme="teal">
							<Link to="/checklist/acRepair" className="link">
								A/C Repair Checklist
							</Link>
						</Button>
						<Button mt={2} size="md" w="87vw" colorScheme="teal">
							<Link to="/checklist/heating" className="link">
								Heating Repair Checklist
							</Link>
						</Button>
						<Button mt={2} size="md" w="87vw" colorScheme="teal">
							<Link to="/checklist/plumbing" className="link">
								Plumbing Repair Checklist
							</Link>
						</Button>

                        <Text fontWeight="bold" fontSize="22px" mt={5} mb={5}>
							Appointments today
						</Text>
						<Flex justifyContent="center" alignItems="center" flexDirection="column">
							{today.map((e) => (
								<AppointmentCard
									subject={e.subject}
									location={e.location}
									startTime={e.startTime}
									endTime={e.endTime}
									description={e.description}
									id={e.id}
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
