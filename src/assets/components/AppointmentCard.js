import React from "react";
import { Button, Box, Flex, Text } from "@chakra-ui/react";
import { LocateIcon, PersonIcon, CalendarNumberIcon, ReaderIcon } from 'chakra-ui-ionicons';

const AppointmentCard = (props) => {
    const startDate = new Date(props.time);
    const startYear = startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear()
    const startTime = startDate.getHours() + ":" + ((`${startDate.getMinutes()}`.length == 1) ? startDate.getMinutes() + "0" : startDate.getMinutes());

    return (
        <Box bg="#182026" w="87vw" pb={6} mb={3} borderRadius={6} pl={8} pt={3}>
			<Flex>
				<Flex w="100%" h="100%" flexDirection="column" justifyContent="center">
					<Flex align="center" mt={4}>
						<PersonIcon w={6} h={6} mr={2} />
						<Text>{props.name}</Text>
					</Flex>
					<Flex align="center" mt={2}>
						<LocateIcon w={6} h={6} mr={2} />
						<Text>{props.address}</Text>
					</Flex>
					<Flex align="center" mt={2}>
						<CalendarNumberIcon w={6} h={6} mr={2} />
						<Text>{startYear + " - " + startTime}</Text>
					</Flex>
					<Flex align="center" mt={2}>
						<ReaderIcon w={6} h={6} mr={2} />
						<Text>{props.description}</Text>
					</Flex>
					<Flex align="center" mt={2}>
						<ReaderIcon w={6} h={6} mr={2} />
						<Text>{props.status}</Text>
					</Flex>
				</Flex>
				<Button variant="outline" colorScheme="teal" mt={3} mr={3} w={130}>Done</Button>
			</Flex>
		</Box>
	);
};

export default AppointmentCard;
