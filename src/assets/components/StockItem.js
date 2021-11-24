import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";

const StockItem = (props) => {
    return (
        <div className="stock-item-card">
            <div className="stock-left-section">
                <p className="stock-name">{props.product_name}</p>
                <p className="stock-amount"><b>Amount: </b>{props.stock}</p>
                <p className="stock-amount"><b>Buy Price: </b>€{props.buyPrice}</p>
                <p className="stock-amount"><b>Sell Price: </b>€{props.sellPrice}</p>
            </div>
            <div className="stock-right-section">
                <Button variant="outline" colorScheme="teal" size="md"><Link to={`/edit/${props.id}`}>Edit</Link></Button>
            </div>
        </div>
    );
};

export default StockItem;
