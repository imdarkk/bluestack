import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Stack, Input, Box, Text, Flex, Container, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { TrashIcon, CloseIcon, LogoEuroIcon } from 'chakra-ui-ionicons';
import "../styles/createInvoice.scss";

const Invoices = () => {
	const monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];
	const [invoiceItems, setInvoiceItems] = useState(4);
	return (
		<div className="wrapper-createInvoice">
			<Link to="/invoices"><CloseIcon position="absolute" top="15px" right="15px" color="white" w={12} h={12} /></Link>
			<div className="wrapper-createBox">
				<Container mt={6}>
					<Flex>
						<Stack>
							<Text color="#888796" fontSize={18}>Invoice for</Text>
							<Input placeholder="Client Name" borderBottomWidth={1} borderBottomColor="black" w="80%" paddingLeft="0" top="-12px" />
						</Stack>
						<Stack>
							<Text color="#888796" fontSize={18}>Total Amount</Text>
							<Text color="#888796" fontWeight="bold">$ 310,00</Text>
						</Stack>
					</Flex>

					<Text color="#888796" fontSize={20} mt={8}>Invoice Details</Text>
					<Flex>
						<Stack>
							<Text color="#888796">Client's email</Text>
							<Input type="email" placeholder="Email" borderBottomWidth={1} borderBottomColor="black" w="170px" paddingLeft="0" top="-12px"/>
						</Stack>
						<Box />
						<Stack ml={10}>
							<Text color="#888796">Invoice Date</Text>
							<Text color="#888796">
								{new Date().getUTCDate() +
									" " +
									monthNames[new Date().getUTCMonth()] +
									", " +
									new Date().getUTCFullYear()}
							</Text>
						</Stack>
					</Flex>

					<Flex>
						<Flex w="50%">
							<Text color="black">Items</Text>
						</Flex>
						<Flex w="50%">
							<Text color="black">Price</Text>
						</Flex>
					</Flex>
					<Flex flexDirection="column">
						{Array.from(Array(invoiceItems)).map((item, index) => (
							<Flex key={index} flexDirection="column">
								<Flex alignItems="center">
									<Input placeholder="Item" />
									<InputGroup>
										<InputLeftElement children={<LogoEuroIcon />} />
										<Input placeholder="Price" type="number" />
									</InputGroup>
									<TrashIcon color="red" w={5} h={5}  onClick={() => setInvoiceItems(invoiceItems - 1)} />
								</Flex>
								<Box w="90vw" bg="#333" h={0.2}/>
							</Flex>
						))}
						{invoiceItems < 10 && (
							<div onClick={() => setInvoiceItems(invoiceItems + 1)} className="add-invoice-item-btn">+ Add Item</div>
						)}
					</Flex>
					<Box position="absolute" bottom="0" right="0" h={50} w="100%" bg="teal">
						<Flex justifyContent="center" alignItems="center" w="100%" h="100%">
							<Text color="white" fontWeight="bold">Send Invoice</Text>
						</Flex>
					</Box>
				</Container>
			</div>
		</div>
	);
};

export default Invoices;
