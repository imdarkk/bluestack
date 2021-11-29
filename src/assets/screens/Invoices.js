import React, { useState, useEffect } from "react";
import HamburgerButton from "../components/HamburgerButton";
import Navigation from "../components/Navigation";
import { useAuth } from "../auth/auth-context";
import { Link } from "react-router-dom";
import { ButtonGroup, Button, Container } from "@chakra-ui/react";
import { AddIcon } from "chakra-ui-ionicons";
import InvoiceCard from "../components/InvoiceCard";

const Invoices = () => {
	const { menu } = useAuth();
	return (
		<Container bg="#10151A" maxW="100vw" minH="100vh" color="white">
			{menu && <Navigation />}
			<HamburgerButton />
            <Button colorScheme="teal" position="absolute" right={25} mt={25}>
				<Link to="/create/invoice">
                    <AddIcon w={6} h={6} />
					Create Invoice
				</Link>
			</Button>
		</Container>
	);
};

export default Invoices;
