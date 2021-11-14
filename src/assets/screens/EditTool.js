import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditTool = () => {
    const history = useHistory();
    
    const { id } = useParams();
    const [pid, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [car, setCar] = useState("");
    const [amount, setAmount] = useState("");

    const [cars, setFetchedCars] = useState([]);
    const [categories, setFetchedCats] = useState([])

    useEffect(() => {
        (async() => {
            const getInfo = await fetch('http://46.101.219.134:3001/addTool/info');
            const response = await getInfo.json();
            setFetchedCars(response.cars.map((car) => ({
                license: car.license_plate
            })));
            setFetchedCats(response.categories.map((category) => ({
                category: category.category
            })));

            const getTool = await fetch(`http://46.101.219.134:3001/get/tool/${id}`);
            const responseTool = await getTool.json();
            responseTool.map((e) => {
                setId(e.id);
                setName(e.tool);
                setCategory(e.category);
                setCar(e.car);
                setAmount(e.amount);
            });
        })();
    },[]);

    return (
        <div className="add-stock-screen">
            <input type="text" value={name} placeholder="Product Name" className="add-stock-input" />
            <select value={category} className="add-stock-input">
                {categories.map((e, index) => (
                    <option key={index} value={e.category}>{e.category.length == 2 ? e.category.toUpperCase() : e.category.charAt(0).toUpperCase() + e.category.slice(1)} Tools</option>
                ))}
            </select>
            <select value={car} className="add-stock-input">
                {cars.map((car) => (
                    <option key={car.license} value={car.license}>{car.license}</option>
                ))}
            </select>
            <input type="number" value={amount} placeholder="Tools in box" className="add-stock-input" />

            <button className="add-stock-btn add-stock-finish">Finish</button>
            <button onClick={() => history.goBack()} className="add-stock-btn add-stock-cancel">Cancel</button>
        </div>
    )
}

export default EditTool;
