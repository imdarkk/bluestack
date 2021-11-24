import { Container } from "@chakra-ui/react";
import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/addstock.scss";

const AddStock = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [instock, setStock] = useState("");
    const [buyPrice, setBuyPrice] = useState("");
    const [sellPrice, setSellPrice] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleStock = (e) => {
        setStock(e.target.value);
    }
    const handleBuyPrice = (e) => {
        setBuyPrice(e.target.value);
    }
    const handleSellPrice = (e) => {
        setSellPrice(e.target.value);
    }

    const handleAddProduct = () => {
        (async() => {
            const product = await fetch('http://46.101.219.134:3001/addProduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
                body: JSON.stringify({
                    product_name: name,
                    in_stock: instock,
                    buyPrice: buyPrice,
                    sellPrice: sellPrice
                })
            });
            const response = await product.json();
            if(response.status === 200) {
                history.replace("/stock");
            }
        })();
    }
    return (
        <Container bg="#10151A" maxW="100vw" h="100vh" color="white" className="add-stock-screen">
            <p className="add-stock-text">Add Product to Stock list</p>
            <input type="text" value={name} onChange={handleName} placeholder="Product Name" className="add-stock-input" />
            <input type="text" value={instock} onChange={handleStock} placeholder="Amount In Stock" className="add-stock-input" />
            <input type="number" value={buyPrice} onChange={handleBuyPrice} placeholder="Buy Price for item" className="add-stock-input" />
            <input type="number" value={sellPrice} onChange={handleSellPrice} placeholder="Sell Price for item" className="add-stock-input" />

            <button onClick={handleAddProduct} className="add-stock-btn add-stock-finish">Finish</button>
            <button className="add-stock-btn add-stock-cancel"><Link to="/stock">Cancel</Link></button>
        </Container>
    );
};

export default AddStock;
