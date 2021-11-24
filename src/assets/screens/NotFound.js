import React from "react";
import { useHistory } from "react-router-dom";
import { Container } from "@chakra-ui/react";

const NotFound = () => {
    const navigation = useHistory();
    return (
        <Container bg="#10151A" maxW="100vw" h="100vh" color="white">
            <p>404 Page Not Found</p>
            <p onClick={() => navigation.goBack()}>{"<"} Go Back</p>
        </Container>
    );
};

export default NotFound;