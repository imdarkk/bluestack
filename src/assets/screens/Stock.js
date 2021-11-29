import React, { useState, useEffect } from "react";
import HamburgerButton from "../components/HamburgerButton";
import Navigation from "../components/Navigation";
import StockItem from "../components/StockItem";
import { useAuth } from "../auth/auth-context";
import { Link } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import "../styles/stock.scss";

const Stock = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		(async () => {
			const products = await fetch(
				"https://backend.mariosk.xyz:3001/getProducts"
			);
			const response = await products.json();
			setProducts(
				response.map((e) => ({
					id: e.id,
					product_name: e.product_name,
					inStock: e.in_stock,
					buyPrice: e.buyingPrice,
					sellPrice: e.sellPrice,
				}))
			);
		})();
	}, []);

	const { menu } = useAuth();
	return (
		<Container bg="#10151A" maxW="100vw" minH="100vh" color="white">
			{menu && <Navigation />}
			<HamburgerButton />
			<div className="add-stock-button">
				<Link to="/add/stock">Add Item</Link>
			</div>
			<div className="stock-cards-wrapper">
				{products.map((e) => (
					<StockItem
						key={e.id}
						id={e.id}
						buyPrice={e.buyPrice}
						sellPrice={e.sellPrice}
						product_name={e.product_name}
						stock={e.inStock}
					/>
				))}
			</div>
		</Container>
	);
};

export default Stock;
