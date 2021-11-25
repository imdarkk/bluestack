import React from "react";
import Navigation from "../components/Navigation";
import HamburgerButton from "../components/HamburgerButton";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import { Container, Flex, Button, Text } from "@chakra-ui/react";
import "../styles/main.scss";

const Main = () => {
    const history = useHistory();
    const { menu } = useAuth();
    const user = JSON.parse(localStorage.getItem('details'));
    return (
        <Container bg="#10151A" maxW="100vw" h="100vh" color="white">
            <HamburgerButton />
            <Flex align="center" flexDirection="column">
                {menu && <Navigation />}
                <div className="main-page-content">
                    <Flex className="checklist-wrapper" direction="column">
                        {user.role === 'admin' && (
                            <Button mb={5} size="md" w="87vw" colorScheme="teal" onClick={() => history.push('/manage/cars')}>Manage Cars</Button>
                        )}

                        <Text fontWeight="bold" fontSize="22px" mt={5}>Checklists</Text>
                        <Button mt={4} size="md" w="87vw" colorScheme="teal"><Link to="/checklist/acInstall" className="link">A/C Install Checklist</Link></Button>
                        <Button mt={2} size="md" w="87vw" colorScheme="teal"><Link to="/checklist/acRepair" className="link">A/C Repair Checklist</Link></Button>
                        <Button mt={2} size="md" w="87vw" colorScheme="teal"><Link to="/checklist/heating" className="link">Heating Repair Checklist</Link></Button>
                        <Button mt={2} size="md" w="87vw" colorScheme="teal"><Link to="/checklist/plumbing" className="link">Plumbing Repair Checklist</Link></Button>

                        <Text fontWeight="bold" fontSize="22px" mt={5}>Appointments today</Text>
                    </Flex>
                </div>
            </Flex>
        </Container>
    );
};

export default Main;
