import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams();
    const history = useHistory();
    const [name, setName] = useState();
    const [stock, setStock] = useState();
    const [pid, setID] = useState();
    const [buyPrice, setBuyPrice] = useState();
    const [sellPrice, setSellPrice] = useState();

    useEffect(() => {
        (async() => {
            const product = await fetch(`http://46.101.219.134:3001/getProduct/${id}`);
            const response = await product.json();
            setName(response[0].product_name);
            setStock(response[0].in_stock);
            setID(response[0].id + ' (ID)');
            setBuyPrice(response[0].buyingPrice);
            setSellPrice(response[0].sellPrice);
        })();
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleStockChange = (e) => {
        setStock(e.target.value);
    }
    const handleBuyPrice = (e) => {
        setBuyPrice(e.target.value);
    }
    const handleSellPrice = (e) => {
        setSellPrice(e.target.value);
    }

    const handleDelete = () => {
        (async() => {
            const deleteProduct = await fetch(`http://46.101.219.134:3001/delete/product`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'auth-token': localStorage.getItem('token')},
                body: JSON.stringify({
                    pid: pid
                })
            });
            const responseDelete = await deleteProduct.json();
            if(responseDelete.status === 200) {
                history.goBack();
            }
        })();
    }

    const handleEdit = () => {
        (async() => {
            const edit = await fetch(`http://46.101.219.134:3001/edit/${pid}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
                body: JSON.stringify({
                    name: name,
                    stock: stock,
                    id: pid,
                    buyingPrice: buyPrice,
                    sellPrice: sellPrice
                })
            });
            const response = await edit.json();
            if(response.status === 200) {
                history.replace("/stock");
            }
        })();
    }

    return (
        <div className="add-stock-screen">
            <input type="text" value={pid} className="add-stock-input" disabled />
            <input type="text" value={name} onChange={handleNameChange} placeholder="Product Name" className="add-stock-input" />
            <input type="text" value={stock} onChange={handleStockChange} placeholder="Stock" className="add-stock-input" />
            <input type="number" value={buyPrice} onChange={handleBuyPrice} placeholder="Buy Price" className="add-stock-input" />
            <input type="number" value={sellPrice} onChange={handleSellPrice} placeholder="Sell Price" className="add-stock-input" />

            <button onClick={handleDelete} className="add-stock-btn add-stock-delete">Delete</button>
            <button onClick={handleEdit} className="add-stock-btn add-stock-finish">Finish</button>
            <button className="add-stock-btn add-stock-cancel"><Link to="/stock">Cancel</Link></button>
        </div>
    );
};

export default EditProduct;
