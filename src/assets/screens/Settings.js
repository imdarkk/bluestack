import React, {useState} from "react";
import Navigation from "../components/Navigation";
import HamburgerButton from "../components/HamburgerButton";
import { Container, Text, Flex, FormLabel, Switch, Button, Input, Select } from "@chakra-ui/react";
import { useAuth } from "../auth/auth-context";
import { SaveIcon } from "chakra-ui-ionicons";

const Settings = () => {
    const { menu } = useAuth();
    const [save, setSave] = useState(false);
    const [messages, setMessages] = useState(false);
    
    const handleMessages = () => {
        setMessages(!messages);
        setSave(true);
    }

    return (
        <Container bg="#10151A" maxW="100vw" h="100vh" color="white">
			<HamburgerButton />
            <Flex align="center" flexDirection="column" overflow="hidden">
				{menu && <Navigation />}
                <Container position="absolute" top="50px" left="5px" overflow="hidden">
                    <Text fontWeight="bold" mt="30px" fontSize="28px">Settings</Text>
                    <Flex mt="10px">
                        <Flex justify="center" align="center">
                            <Switch id='message-alerts' size="lg" onChange={handleMessages} value={messages} />
                            <FormLabel htmlFor='message-alerts' ml="10px" fontSize="20px">
                                Message Alerts to Clients
                            </FormLabel>
                        </Flex>
                    </Flex>
                </Container>
                {save && (
                    <Button w="60px" h="60px" colorScheme="teal" borderRadius={360} position="absolute" bottom="25px" right="25px">
                        <SaveIcon w={5} h={5} />
                    </Button>
                )}
            </Flex>
        </Container>
    );
};

export default Settings;

// Skullcandy