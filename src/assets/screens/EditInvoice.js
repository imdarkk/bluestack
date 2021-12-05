import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Stack, Input, Box, Text, Flex, Container, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { TrashIcon, CloseIcon, LogoEuroIcon } from 'chakra-ui-ionicons';
import "../styles/createInvoice.scss";

const EditInvoice = () => {
    const { id } = useParams();
	const monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [items, setItems] = useState({item0: [], item1: [], item2: [], item3: [], item4: [], item5: [], item6: [], item7: [], item8: [], item9: []});
    const [total, setTotal] = useState(0.00);
    const [date, setDate] = useState();
    const [iid, setID] = useState();
    const [loading, setLoading] = useState(true);

	const handleName = (e) => {
		setName(e.target.value);
	}
	const handleEmail = (e) => {
		setEmail(e.target.value);
	}
	const handleItem = (type, e) => {
		const item = e.target.name;
		setItems({...items, [item]: {...items[item], [type]: e.target.value}});
	}
	const removeElement = (item) => {
		const elementName = document.querySelector('input[data-key-name="'+item+'"]');
		const elementPrice = document.querySelector('input[data-key-price="'+item+'"]');
		elementName.value = "";
		elementPrice.value = "";
		setItems({...items, [item]: []});
	}

	const createInvoice = async () => {
		const updateInvoice = await fetch('https://backend.mariosk.xyz:3001/update/invoice', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'auth-token': localStorage.getItem('token')
			},
            body: JSON.stringify({
                id: iid,
				name: name,
				email: email,
				items: JSON.stringify(items),
				total: total
			})
		});
		const response = await updateInvoice.json();
		if (response.status === 200) {
			alert("Invoice updated successfully");
		} else {
			alert("Something went wrong");
		}
    }
    
    useEffect(() => {
		(async () => {
            try {
                const response = await fetch(
                    `https://backend.mariosk.xyz:3001/get/invoice/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            "auth-token": localStorage.getItem("token"),
                        },
                    }
                );
                const data = await response.json();
                const itemData = JSON.parse(data[0].items);
                setItems(itemData);
                setTotal(data[0].total);
                setEmail(data[0].email);
                setName(data[0].name);
                setDate(data[0].date);
                setID(data[0].id);
                setLoading(false);
            } catch (e) {
                alert(e);
            }
		})();
	}, []);

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

					<Text color="#888796" fontSize={20} mt={8}>Invoice Details</Text>
					<Flex>
						<Stack>
							<Text color="#888796">Client's email</Text>
							<Input type="email" placeholder="Email" value={email} onChange={handleEmail} borderBottomWidth={1} borderBottomColor="black" w="170px" paddingLeft="0" top="-12px"/>
						</Stack>
						<Box />
						<Stack ml={10}>
							<Text color="#888796">Invoice Date</Text>
							<Text color="#888796">
								{new Date(date).getUTCDate() +
									" " +
									monthNames[new Date(date).getUTCMonth()] +
									", " +
									new Date(date).getUTCFullYear()}
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
								<Input placeholder="Item" data-key-name={"item"+index} name={"item"+index} value={items["item" + index].name} onChange={(e) => {
									handleItem("name", e);
								}} />
								<InputGroup>
									<InputLeftElement children={<LogoEuroIcon />} />
                                    <Input placeholder="Price" type="number" data-key-price={"item" + index} name={"item" + index} value={items["item" + index].price} onChange={(e) => {
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
							<Text color="white" fontWeight="bold">Save & Resend Invoice</Text>
						</Flex>
					</Box>
				</Container>
			</div>
		</div>
	);
};

export default EditInvoice;
