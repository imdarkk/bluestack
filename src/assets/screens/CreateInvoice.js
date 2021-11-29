import React, { useState, useEffect } from "react";
import HamburgerButton from "../components/HamburgerButton";
import Navigation from "../components/Navigation";
import { useAuth } from "../auth/auth-context";
import { Link } from "react-router-dom";
import { Stack, Input, Box, Container, Text, Flex } from "@chakra-ui/react";
import { AddIcon } from "chakra-ui-ionicons";

const Invoices = () => {
	const { menu } = useAuth();
	return (
		<Container bg="#10151A" maxW="100vw" minH="100vh" color="white">
			<Box>
				<Flex>
					<Stack>
						<Text>Invoice for</Text>
						<Input placeholder="Client Name" />
                    </Stack>
                    <Stack>
                        <Text>Total Amount</Text>
                        <Text>$ 310,00</Text>
                    </Stack>
				</Flex>

				<Text>Invoice Details</Text>
				<Flex>
					<Stack>
						<Text>Client email</Text>
						<Input placeholder="Email" />
					</Stack>
					<Box />
					<Stack>
						<Text>Invoice Date</Text>
						<Text>
							{new Date().getUTCDate() +
								"/" +
								(new Date().getUTCMonth() + 1) +
								"/" +
								new Date().getUTCFullYear()}
						</Text>
					</Stack>
				</Flex>

				<Flex>
					<Flex>
						<Text>Items</Text>
					</Flex>
					<Flex>
						<Text>Price</Text>
					</Flex>
				</Flex>
			</Box>
		</Container>
	);
};

export default Invoices;
