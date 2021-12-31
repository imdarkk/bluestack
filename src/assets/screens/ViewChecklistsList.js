import React from "react";
import { Container, Box, Button, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "../auth/auth-context";
import { Link, useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";
import HamburgerButton from "../components/HamburgerButton";

const ViewChecklistsList = () => {
    const { menu } = useAuth();
    const history = useHistory();
    return (
        <Container bg="#10151A" maxW="100vw" minH="100vh" color="white">
			<HamburgerButton />
			<Flex align="center" flexDirection="column">
				{menu && <Navigation />}
                <Flex justify="center" align="center" direction="column" mt={24}>
                    <Button colorScheme="teal" w="87vw" onClick={() => history.push("/checklist/acInstall")}>A/C Installation</Button>
                    <Button colorScheme="teal" w="87vw" mt={2} onClick={() => history.push("/checklist/acRepair")}>A/C Repair</Button>
                    <Button colorScheme="teal" w="87vw" mt={2}>Heating</Button>
                    <Button colorScheme="teal" w="87vw" mt={2}>Plumbing</Button>
                </Flex>
            </Flex>
        </Container>
    );
};

export default ViewChecklistsList;