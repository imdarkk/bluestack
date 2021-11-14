import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import HamburgerButton from "../components/HamburgerButton";
import Navigation from "../components/Navigation";
import Car from "../components/Car";
import "../styles/carcard.scss";

const ManageCars = () => {
    const { menu } = useAuth();
    const [cars, setCars] = useState([]);
    useEffect(() => {
        (async() => {
            const getCars = await fetch('http://46.101.219.134:3001/getCars');
            const response = await getCars.json();
            setCars(response.map((e) => ({
                license: e.license_plate,
                fuel: e.fuel,
                transmission: e.transmission,
                status: e.status
            })));
        })();
    }, []);
    return (
        <div>
            <HamburgerButton />
            {menu && <Navigation />}
            <Link to="/add/car" className="add-tool-btn">Add Car</Link>
            <div className="car-container">
                {cars.map((e, index) => (
                    <Car key={index} license={e.license} fuel={e.fuel} transmission={e.transmission} status={e.status} />
                ))}
            </div>
        </div>
    )
};

export default ManageCars;
