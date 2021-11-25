import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Flex, Text } from "@chakra-ui/react";

const StockItem = (props) => {
    return (
        <Container bg="#171E24" mt={5} p={5}>
            <Flex flexDirection="row">
                <div className="stock-left-section">
                    <p className="stock-name">{props.product_name}</p>
                    <p className="stock-amount"><b>In Stock: </b>{props.stock}</p>
                    <Flex mt={5}>
                        <Text color="red" fontWeight="bold" fontSize="17px" mr={3}><Text color="white">Buy: </Text>€{props.buyPrice.toFixed(2)}</Text>
                        <Text color="teal" fontWeight="bold" fontSize="17px"><Text color="white">Sell: </Text>€{props.sellPrice.toFixed(2)}</Text>
                    </Flex>
                </div>
                <div className="stock-right-section">
                    <Button variant="outline" colorScheme="teal" size="md"><Link to={`/edit/${props.id}`}>Edit</Link></Button>
                </div>
            </Flex>
        </Container>
    );
};

export default StockItem;
