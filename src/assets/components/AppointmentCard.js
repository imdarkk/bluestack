import React from "react";
import { Container, Box, Flex, Text } from "@chakra-ui/react";

const AppointmentCard = (props) => {
    const startDate = new Date(props.startTime);
    const startYear = startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear()
    const startTime = startDate.getHours() + ":" + ((`${startDate.getMinutes()}`.length == 1) ? startDate.getMinutes() + "0" : startDate.getMinutes());

    const endDate = new Date(props.endTime);
    const endYear = endDate.getDate() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getFullYear();
    const endTime = endDate.getHours() + ":" + ((`${endDate.getMinutes()}`.length == 1) ? endDate.getMinutes() + "0" : endDate.getMinutes());
    return (
        <Box bg="#182026" w="87vw" h="150px" mb={3} borderRadius={6} pt={4} pl={10}>
			<Flex flexDirection="column">
				<Text>{props.subject}</Text>
				<Text>{props.location}</Text>
				<Text>{startYear + " " + startTime}</Text>
				<Text>{endYear + " " + endTime}</Text>
				<Text>{props.description}</Text>
			</Flex>
		</Box>
	);
};

export default AppointmentCard;
