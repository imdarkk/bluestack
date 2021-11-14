import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const AddCar = () => {
    const history = useHistory();

    const [license, setLicense] = useState("");
    const [model, setModel] = useState("");
    const [brand, setBrand] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    const [fuel, setFuel] = useState("");
    const [transmission, setTransmission] = useState("");
    const [hasAC, setHasAC] = useState("");
    const [hasGPS, setHasGPS] = useState("");
    const [status, setStatus] = useState("");

    const handleLicense = (e) => {
        setLicense(e.target.value);
    };
    const handleModel = (e) => {
        setModel(e.target.value);
    }
    const handleBrand = (e) => {
        setBrand(e.target.value);
    }
    const handleYear = (e) => {
        setYear(e.target.value);
    }
    const handleColor = (e) => {
        setColor(e.target.value);
    }
    const handleFuel = (e) => {
        setFuel(e.target.value);
    }
    const handleTransmission = (e) => {
        setTransmission(e.target.value);
    }
    const handleHasAC = (e) => {
        setHasAC(e.target.value);
    }
    const handleHasGPS = (e) => {
        setHasGPS(e.target.value);
    }
    const handleStatus = (e) => {
        setStatus(e.target.value);
    }

    const handleAddCar = () => {
        (async() => {
            const rawResponse = await fetch('http://46.101.219.134:3001/add/car', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    license: license,
                    model: model,
                    brand: brand,
                    year: year,
                    color: color,
                    fuel: fuel,
                    transmission: transmission,
                    hasAC: hasAC,
                    hasGPS: hasGPS,
                    status: status
                })
            });
            const content = await rawResponse.json();
            if(content.status == 200) {
                history.goBack();
            }
        })();
    }

    return (
        <div className="add-stock-screen">
            <p className="add-stock-text">Add Car</p>
            <input value={license} onChange={handleLicense} type="text" placeholder="License Plate" className="add-stock-input" />
            <input value={brand} onChange={handleBrand} type="text" placeholder="Brand" className="add-stock-input" />
            <input value={model} onChange={handleModel} type="text" placeholder="Model" className="add-stock-input" />
            <input value={color} onChange={handleColor} type="text" placeholder="Color" className="add-stock-input" />
            <input value={year} onChange={handleYear} type="number" placeholder="Year" className="add-stock-input" />
            <select value={fuel} onChange={handleFuel} className="add-stock-input">
                <option value="" disabled>-- Select fuel --</option>
                <option value="unleaded95">Unleaded 95</option>
                <option value="unleaded97">Unleaded 97</option>
                <option value="unleaded98">Unleaded 98</option>
                <option value="diesel">Diesel</option>
            </select>
            <select value={transmission} onChange={handleTransmission} className="add-stock-input">
                <option value="" disabled>-- Select transmission --</option>
                <option value="auto">Automatic</option>
                <option value="manual">Manual</option>
            </select>
            <select value={hasAC} onChange={handleHasAC} className="add-stock-input">
                <option value="" disabled>-- Has air conditioning --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <select value={hasGPS} onChange={handleHasGPS} className="add-stock-input">
                <option value="" disabled>-- Has gps --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <select value={status} onChange={handleStatus} className="add-stock-input">
                <option value="" disabled>-- Select status --</option>
                <option value="working">Working</option>
                <option value="mechanic">At mechanic</option>
            </select>

            <button className="add-stock-btn add-stock-finish" onClick={handleAddCar}>Finish</button>
            <button className="add-stock-btn add-stock-cancel"><Link to="/manage/cars">Cancel</Link></button>
        </div>
    );
};

export default AddCar;
