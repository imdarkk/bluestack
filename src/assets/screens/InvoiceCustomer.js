import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const InvoiceCustomer = () => {
    const { invoice_id } = useParams();
    	const monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];
    const [invoice, setInvoice] = useState([]);
    useEffect(() => {
        (async() => {
            const getInvoice = await fetch('https://backend.mariosk.xyz:3001/get/customer/invoice/' + invoice_id);
            const response = await getInvoice.json();
            setInvoice(response.map((e) => ({
                id: e.invoice_id,
                name: e.name,
                number: e.phone,
                date: e.date,
                total: e.total,
                items: JSON.parse(e.items),
                status: e.status,
            })))
        })();
    }, []);
    
    return (
		<>
			{invoice.map((e) => (
				<Box w="100vw" h="100vh" bg="#333" color="white">
					<Flex h="100%" w="100%" justify="center" align="center" direction="column">
						<Box>
							<Text><b>Invoice for: </b>{e.name}</Text>
							<Text>{new Date(e.date).getUTCDate() +
									" " +
									monthNames[new Date(e.date).getUTCMonth()] +
									", " +
									new Date(e.date).getUTCFullYear()}</Text>
							<Text><b>Total: </b> €{e.total.toFixed(2)}</Text>
                            {e.status == 1 && (
                                <Button colorScheme="teal" fontWeight="bold">Pay Now</Button>
                            )}
						</Box>
					</Flex>
				</Box>
			))}
		</>
	);
}

export default InvoiceCustomer;