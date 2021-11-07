import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/addstock.scss";

const AddStock = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [instock, setStock] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleStock = (e) => {
        setStock(e.target.value);
    }

    const handleAddProduct = () => {
        (async() => {
            const product = await fetch('http://localhost:3001/addProduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
                body: JSON.stringify({
                    product_name: name,
                    in_stock: instock
                })
            });
            const response = await product.json();
            if(response.status === 200) {
                history.replace("/stock");
            }
        })();
    }
    return (
        <div className="add-stock-screen">
            <p className="add-stock-text">Add Product to Stock list</p>
            <input type="text" value={name} onChange={handleName} placeholder="Product Name" className="add-stock-input" />
            <input type="text" value={instock} onChange={handleStock} placeholder="Amount In Stock" className="add-stock-input" />

            <button onClick={handleAddProduct} className="add-stock-btn add-stock-finish">Finish</button>
            <button className="add-stock-btn add-stock-cancel"><Link to="/stock">Cancel</Link></button>
        </div>
    );
};

export default AddStock;
