import React, {useState} from "react";
import Navigation from "../components/Navigation";
import HamburgerButton from "../components/HamburgerButton";
import { useAuth } from "../auth/auth-context";
import { Container, Flex, Box, Text, Textarea, Input, InputGroup, InputLeftElement, Select, Button } from "@chakra-ui/react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import { LogoEuroIcon } from "chakra-ui-ionicons";
import "../styles/muioverwrites.scss";

const CreateQuote = () => {
    const { menu } = useAuth();
    const total = 0;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [delivery, setDelivery] = useState("");

    const handleDelivery = (e) => {
        setDelivery(e.target.value.toLowerCase());
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Container bg="#10151A" maxW="100vw" h="100vh" color="white">
			<HamburgerButton />
            <Flex align="center" flexDirection="column" overflow="hidden">
				{menu && <Navigation />}
                <Flex justify="center" align="center" direction="column" mt={6}>
                    <Box w="67vw" h="8.4vh" bg="#333" right={-12} position="relative" borderTopLeftRadius={10} borderTopRightRadius={10}>
                        <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center" mt={2}>Quote</Text>
                    </Box>
                    <Box w="92vw" h="88vh" bg="#333" mt={-2} borderBottomLeftRadius={10} borderBottomRightRadius={10} borderTopLeftRadius={10}>
                        <Flex align="center" justify="center">
                            <Flex direction="column" mt={5}>
                                <Text fontWeight="bold" color="white">Date of quote</Text>
                                <Text color="white">{(new Date()).toLocaleDateString('en-GB')}</Text>
                            </Flex>
                            <Flex direction="column" mt={5} ml={9}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        disablePast
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Quote valid until"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Flex>
                        </Flex>
                        <Flex align="center" direction="column">
                            <Text fontWeight="bold" color="white" w="90%" mb={1}>Send to</Text>
                            <Flex w="84vw" justify="space-between">
                                <Select placeholder="Choose way to deliver" onChange={handleDelivery} w="30vw">
                                    <option>Email</option>
                                    <option>Message</option>
                                </Select>
                                {delivery === 'email' || delivery === '' ? (
                                    <Input type="email" placeholder="E-mail" w="52vw" />
                                ) : (
                                    <Input type="number" placeholder="Phone Number" w="52vw" />
                                )}
                            </Flex>
                        </Flex>
                        <Flex justify="center" align="center" direction="column">
                            <Text fontWeight="bold" color="white" ml={-14} mt={5} mb={2}>Comments or special instructions: </Text>
                            <Textarea borderColor="white" w="84vw" h="100px" />
                        </Flex>
                        <Flex direction="column" justify="center" align="center" mt={5}>
                            <Flex w="84vw" justify="space-between" mt={1}>
                                <Input placeholder="Item" w="61vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0" />
                                <InputGroup w="21vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0">
                                    <InputLeftElement children={<LogoEuroIcon />} w="10%" />
                                    <Input placeholder="Price" type="number" border="none" pl={4}  />
                                </InputGroup>
                            </Flex>
                            <Flex w="84vw" justify="space-between" mt={1}>
                                <Input placeholder="Item" w="61vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0" />
                                <InputGroup w="21vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0">
                                    <InputLeftElement children={<LogoEuroIcon />} w="10%" />
                                    <Input placeholder="Price" type="number" border="none" pl={4}  />
                                </InputGroup>
                            </Flex>
                            <Flex w="84vw" justify="space-between" mt={1}>
                                <Input placeholder="Item" w="61vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0" />
                                <InputGroup w="21vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0">
                                    <InputLeftElement children={<LogoEuroIcon />} w="10%" />
                                    <Input placeholder="Price" type="number" border="none" pl={4}  />
                                </InputGroup>
                            </Flex>
                            <Flex w="84vw" justify="space-between" mt={1}>
                                <Input placeholder="Item" w="61vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0" />
                                <InputGroup w="21vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0">
                                    <InputLeftElement children={<LogoEuroIcon />} w="10%" />
                                    <Input placeholder="Price" type="number" border="none" pl={4}  />
                                </InputGroup>
                            </Flex>
                            <Flex w="84vw" justify="space-between" mt={1}>
                                <Input placeholder="Item" w="61vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0" />
                                <InputGroup w="21vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0">
                                    <InputLeftElement children={<LogoEuroIcon />} w="10%" />
                                    <Input placeholder="Price" type="number" border="none" pl={4}  />
                                </InputGroup>
                            </Flex>
                            <Flex w="84vw" justify="space-between" mt={1}>
                                <Input placeholder="Item" w="61vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0" />
                                <InputGroup w="21vw" border="none" borderBottom="1px" borderBottomColor="white" borderRadius="0">
                                    <InputLeftElement children={<LogoEuroIcon />} w="10%" />
                                    <Input placeholder="Price" type="number" border="none" pl={4}  />
                                </InputGroup>
                            </Flex>
                        </Flex>
                        <Text fontWeight="bold" color="white" position="absolute" right="32px" mt={3}>Total Price: € {total.toFixed(2)}</Text>
                        <Button colorScheme="teal" w="82vw" h="50px" borderRadius="360px" position="absolute" bottom="25px" right="32px"></Button>
                    </Box>
                </Flex>
            </Flex>
        </Container>
    );
};

export default CreateQuote;