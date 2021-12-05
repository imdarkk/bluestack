import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Text, Flex, Box } from "@chakra-ui/react";

const InvoiceCard = (props) => {
	const history = useHistory();
	const [showDropdown, setShowDropdown] = useState(false);
	const handleDropdown = () => {
		setShowDropdown(!showDropdown);
	}
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	/*
		id
		date
		total
		status
		name
		phone
		items
	*/
	return (
		<Container bg="#212b36" w="93vw" h="140px" color="white" borderRadius={6} mt={3} onClick={() => history.push(`/invoice/${props.id}`)}>
			<Flex justify="center" direction="column" h="100%">
				<Text>{props.name}</Text>
				<Text>{props.phone}</Text>
				<Text>
					{new Date(props.date).getUTCDate() +
						" " +
						monthNames[new Date(props.date).getUTCMonth()] +
						", " +
						new Date(props.date).getUTCFullYear()}
				</Text>
				<Text color="#888796" fontWeight="bold">
					€ {props.total.toFixed(2)}
				</Text>
				<Text position="absolute" right="10" mb="-80px" color={props.status == 0 ? "red" : "green"}>
					{props.status === "1" ? "Paid" : "Unpaid"}
				</Text>
			</Flex>
		</Container>
	);
};

export default InvoiceCard;
