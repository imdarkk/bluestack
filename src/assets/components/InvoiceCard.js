import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Text, Flex } from "@chakra-ui/react";

const InvoiceCard = (props) => {
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
		email
		items
	*/
	return (
		<Container bg="#212b36" w="93vw" h="140px" color="white" br={12} mt={3}>
			<Flex justify="center" direction="column" h="100%">
				<Text>{props.name}</Text>
				<Text>{props.email}</Text>
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
				<Text position="absolute" right="10" mb="-60px">
					{props.status === "1" ? "Paid" : "Unpaid"}
				</Text>
			</Flex>
		</Container>
	);
};

export default InvoiceCard;
