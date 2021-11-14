import React from "react";
import { Link } from "react-router-dom";

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
                <div><Link to={`/edit/${props.id}`}>Edit</Link></div>
            </div>
        </div>
    );
};

export default StockItem;
