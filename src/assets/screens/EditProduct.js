import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams();
    const history = useHistory();
    const [name, setName] = useState();
    const [stock, setStock] = useState();
    const [pid, setID] = useState();
    useEffect(() => {
        (async() => {
            const product = await fetch(`http://localhost:3001/getProduct/${id}`);
            const response = await product.json();
            setName(response[0].product_name);
            setStock(response[0].in_stock);
            setID(response[0].id + ' (ID)');
        })();
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleStockChange = (e) => {
        setStock(e.target.value);
    }

    const handleEdit = () => {
        (async() => {
            const edit = await fetch(`http://localhost:3001/edit/${pid}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
                body: JSON.stringify({
                    name: name,
                    stock: stock,
                    id: pid
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

            <button onClick={handleEdit} className="add-stock-btn add-stock-finish">Finish</button>
            <button className="add-stock-btn add-stock-cancel"><Link to="/stock">Cancel</Link></button>
        </div>
    );
};

export default EditProduct;
