import React, { useState, useEffect } from "react";
import HamburgerButton from "../components/HamburgerButton";
import Navigation from "../components/Navigation";
import StockItem from "../components/StockItem";
import { useAuth } from "../auth/auth-context";
import { Link } from "react-router-dom";
import "../styles/stock.scss";

const Stock = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async() => {
            const products = await fetch('http://localhost:3001/getProducts');
            const response = await products.json();
           setProducts(response.map((e) => ({
            id: e.id,
            product_name: e.product_name,
            inStock: e.in_stock
           })));
        })();
    }, [products]);

    const { menu } = useAuth();
    return (
        <div>
            {menu && <Navigation />}
            <HamburgerButton />
            <div className="add-stock-button">
               <Link to="/add/stock">Add Item</Link>
            </div>
            <div className="stock-cards-wrapper">
                {products.map((e) => (
                    <StockItem key={e.id} id={e.id} product_name={e.product_name} stock={e.inStock} />
                ))}
            </div>
        </div>
    );
};

export default Stock;
