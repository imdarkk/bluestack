import React, {useState, useEffect} from 'react';
import HamburgerButton from "../components/HamburgerButton";
import Navigation from "../components/Navigation";
import ToolsCard from "../components/ToolsCard";
import { useAuth } from '../auth/auth-context';
import { Link } from "react-router-dom";
import "../styles/tools.scss";

const Tools = () => {
    const [cars, setCars] = useState([]);
    const [tools, setTools] = useState([]);
    const [showTools, setShowTools] = useState("");
    const { menu } = useAuth();

    useEffect(() => {
        (async() => {
            const car = await fetch('http://46.101.219.134:3001/getCars');
            const responseCars = await car.json();
            setCars(responseCars.map((e) => ({
                license: e.license_plate
            })));

            const tools = await fetch('http://46.101.219.134:3001/getTools');
            const responseTools = await tools.json();
            setTools(responseTools.map((e) => ({
                id: e.id,
                tool: e.tool,
                category: e.category,
                car: e.car,
                amount: e.amount
            })));
            
            const getOneCar = await fetch('http://46.101.219.134:3001/getOneCar');
            const responseOneCar = await getOneCar.json();
            setShowTools(responseOneCar[0].license_plate);
        })();
    }, []);

    return (
        <div>
            <HamburgerButton />
            {menu && <Navigation />}
            <Link to="/add/tools" className="add-tool-btn">Add Tool</Link>
            <div className="container-license">
                {cars.map((e) => (
                    <p className={showTools == e.license ? "car active-car" : "car"} onClick={() => setShowTools(e.license)}>{e.license}</p>
                ))}
            </div>
            <div className="container-cards">
                {tools.map((e) =>
                    showTools == e.car && (
                        <ToolsCard id={e.id} tool={e.tool} category={e.category} amount={e.amount} car={e.car} />
                    )
                )}
            </div>
        </div>
    );
};

export default Tools;
