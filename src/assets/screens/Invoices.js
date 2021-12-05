import React, { useState, useEffect } from "react";
import HamburgerButton from "../components/HamburgerButton";
import Navigation from "../components/Navigation";
import { useAuth } from "../auth/auth-context";
import { Link } from "react-router-dom";
import { Flex, Button, Container } from "@chakra-ui/react";
import { AddIcon } from "chakra-ui-ionicons";
import InvoiceCard from "../components/InvoiceCard";

const Invoices = () => {
	const { menu } = useAuth();
	const [invoices, setInvoices] = useState([]);
	useEffect(() => {
		(async () => {
			const request = await fetch('https://backend.mariosk.xyz:3001/get/invoices', {
				method: 'GET',
				headers: {
					'auth-token': localStorage.getItem('token')
				}
			});
			const response = await request.json();
			setInvoices(response.map((e) => ({
				id: e.id,
				date: e.date,
				total: e.total,
				status: e.status,
				name: e.name,
				email: e.email,
				items: JSON.parse(e.items)
			})));
		})();
	}, []);
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
			<Flex pt="82px" justifyContent="center" alignItems="center" w="100%" direction="column">
				{invoices.map((e) => (
					<InvoiceCard key={e.id} id={e.id} date={e.date} total={e.total} status={e.status} name={e.name} email={e.email} items={e.items} />
				))}
			</Flex>
		</Container>
	);
};

export default Invoices;
