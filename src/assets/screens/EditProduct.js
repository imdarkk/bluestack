import {
	Container,
	Stack,
	Input,
	InputGroup,
	InputLeftElement,
	Button,
} from "@chakra-ui/react";
import { LogoEuroIcon, LogoDropboxIcon, TextIcon } from "chakra-ui-ionicons";
import React, { useState, useEffect } from "react";
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
		(async () => {
			const product = await fetch(
				`https://backend.mariosk.xyz:3001/getProduct/${id}`
			);
			const response = await product.json();
			setName(response[0].product_name);
			setStock(response[0].in_stock);
			setID(response[0].id + " (ID)");
			setBuyPrice(response[0].buyingPrice);
			setSellPrice(response[0].sellPrice);
		})();
	}, []);

	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handleStockChange = (e) => {
		setStock(e.target.value);
	};
	const handleBuyPrice = (e) => {
		setBuyPrice(e.target.value);
	};
	const handleSellPrice = (e) => {
		setSellPrice(e.target.value);
	};

	const handleDelete = () => {
		(async () => {
			const deleteProduct = await fetch(
				`https://backend.mariosk.xyz:3001/delete/product`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						"auth-token": localStorage.getItem("token"),
					},
					body: JSON.stringify({
						pid: pid,
					}),
				}
			);
			const responseDelete = await deleteProduct.json();
			if (responseDelete.status === 200) {
				history.goBack();
			}
		})();
	};

	const handleEdit = () => {
		(async () => {
			const edit = await fetch(
				`https://backend.mariosk.xyz:3001/edit/${pid}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify({
						name: name,
						stock: stock,
						id: pid,
						buyingPrice: buyPrice,
						sellPrice: sellPrice,
					}),
				}
			);
			const response = await edit.json();
			if (response.status === 200) {
				history.replace("/stock");
			}
		})();
	};

	return (
		<Container
			bg="#10151A"
			maxW="100vw"
			h="100vh"
			color="white"
			className="add-stock-screen"
		>
			<Stack spacing={3}>
				<Input
					type="text"
					value={pid}
					disabled
					w="87vw"
					variant="filled"
					bg="#1a2229"
				/>
				<InputGroup>
					<InputLeftElement children={<TextIcon />} />
					<Input
						type="text"
						value={name}
						onChange={handleNameChange}
						placeholder="Product Name"
						w="87vw"
						variant="filled"
						bg="#1a2229"
					/>
				</InputGroup>
				<InputGroup>
					<InputLeftElement children={<LogoDropboxIcon />} />
					<Input
						type="text"
						value={stock}
						onChange={handleStockChange}
						placeholder="Stock"
						w="87vw"
						variant="filled"
						bg="#1a2229"
					/>
				</InputGroup>
				<InputGroup>
					<InputLeftElement children={<LogoEuroIcon />} />
					<Input
						type="number"
						value={buyPrice}
						onChange={handleBuyPrice}
						placeholder="Buy Price"
						w="87vw"
						variant="filled"
						bg="#1a2229"
					/>
				</InputGroup>
				<InputGroup>
					<InputLeftElement children={<LogoEuroIcon />} />
					<Input
						type="number"
						value={sellPrice}
						onChange={handleSellPrice}
						placeholder="Sell Price"
						w="87vw"
						variant="filled"
						bg="#1a2229"
					/>
				</InputGroup>
			</Stack>

			<Button
				onClick={handleDelete}
				colorScheme="red"
				className="add-stock-delete"
				w="85vw"
			>
				Delete
			</Button>
			<Button
				onClick={handleEdit}
				colorScheme="teal"
				w="85vw"
				className="add-stock-finish"
			>
				Finish
			</Button>
			<Button className="add-stock-cancel" colorScheme="#333" w="85vw">
				<Link to="/stock" className="add-stock-cancel-text">
					Cancel
				</Link>
			</Button>
		</Container>
	);
};

export default EditProduct;
