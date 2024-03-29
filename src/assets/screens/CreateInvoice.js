import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Stack, Input, Box, Text, Flex, Container, InputGroup, InputLeftElement, Select } from "@chakra-ui/react";
import { TrashIcon, CloseIcon, LogoEuroIcon } from 'chakra-ui-ionicons';
import "../styles/createInvoice.scss";

const Invoices = () => {
	const monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [items, setItems] = useState({item0: [], item1: [], item2: [], item3: [], item4: [], item5: [], item6: [], item7: [], item8: [], item9: []});
	const [total, setTotal] = useState(0.00);
	const [status, setStatus] = useState();

	const handleName = (e) => {
		setName(e.target.value);
	}
	const handlePhone = (e) => {
		setPhone(e.target.value);
	}
	const handleItem = (type, e) => {
		const item = e.target.name;
		setItems({...items, [item]: {...items[item], [type]: e.target.value}});
	}
	const handleStatus = (e) => {
		setStatus(e.target.value);
	};
	const removeElement = (item) => {
		const elementName = document.querySelector('input[data-key-name="'+item+'"]');
		const elementPrice = document.querySelector('input[data-key-price="'+item+'"]');
		elementName.value = "";
		elementPrice.value = "";
		setItems({...items, [item]: []});
	}

	const createInvoice = async () => {
		const addInvoice = await fetch('https://backend.mariosk.xyz:3001/create/invoice', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'auth-token': localStorage.getItem('token')
			},
			body: JSON.stringify({
				name: name,
				phone: phone,
				items: JSON.stringify(items),
				total: total,
				status: status,
			})
		});
		const response = await addInvoice.json();
		if (response.status === 200) {
			alert("Invoice created successfully");
		} else {
			alert("Something went wrong");
		}
	}

	useEffect(() => {
		let totals = 0.00;
		Object.values(items).map((item, index) => {
			if (!isNaN(parseFloat(item.price))) {
				totals += parseFloat(item.price);
			}
		});
		setTotal(totals)
	}, [items]);

	return (
		<div className="wrapper-createInvoice">
			<Link to="/invoices"><CloseIcon position="absolute" top="15px" right="15px" color="white" w={12} h={12} /></Link>
			<div className="wrapper-createBox">
				<Container mt={6}>
					<Flex>
						<Stack>
							<Text color="#888796" fontSize={18}>Invoice for</Text>
							<Input placeholder="Client Name" value={name} onChange={handleName} borderBottomWidth={1} borderBottomColor="black" w="80%" paddingLeft="0" top="-12px" />
						</Stack>
						<Stack>
							<Text color="#888796" fontSize={18}>Total Amount</Text>
							<Text color="#888796" fontWeight="bold">€ {total.toFixed(2)}</Text>
						</Stack>
					</Flex>
					<Flex>
						<Stack>
							<Text color="#888796">Status</Text>
							<Select placeholder="Select status" onChange={handleStatus} value={status}>
								<option>Paid</option>
								<option>Unpaid</option>
							</Select>
						</Stack>
					</Flex>
					<Text color="#888796" fontSize={20} mt={8}>Invoice Details</Text>
					<Flex>
						<Stack>
							<Text color="#888796">Client's Phone Number</Text>
							<Input type="number" placeholder="Phone" value={phone} onChange={handlePhone} borderBottomWidth={1} borderBottomColor="black" w="170px" paddingLeft="0" top="-12px"/>
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
					<Flex flexDirection="column" id="parentBoxes">
						{Object.keys(items).map((item, index) => (
							<Flex key={index} flexDirection="column">
							<Flex alignItems="center">
								<Input placeholder="Item" data-key-name={"item"+index} name={"item"+index} onChange={(e) => {
									handleItem("name", e);
								}} />
								<InputGroup>
									<InputLeftElement children={<LogoEuroIcon />} />
									<Input placeholder="Price" type="number" data-key-price={"item"+index} name={"item"+index} onChange={(e) => {
									handleItem("price", e);
								}} />
								</InputGroup>
								<TrashIcon color="red" w={5} h={5}  onClick={() => {
									removeElement("item"+index);
								}} />
							</Flex>
							<Box w="90vw" bg="#333" h={0.2}/>
						</Flex>
						))}
					</Flex>
					<Box position="absolute" bottom="0" right="0" h={50} w="100%" bg="teal">
						<Flex justifyContent="center" alignItems="center" w="100%" h="100%" onClick={createInvoice}>
							<Text color="white" fontWeight="bold">Send Invoice</Text>
						</Flex>
					</Box>
				</Container>
			</div>
		</div>
	);
};

export default Invoices;
