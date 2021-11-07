import React from "react";
import Navigation from "../components/Navigation";
import HamburgerButton from "../components/HamburgerButton";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import "../styles/main.scss";

const Main = () => {
    const { menu } = useAuth();
    return (
        <div>
            <HamburgerButton />
            {menu && <Navigation />}
            <div className="main-page-content">
                <div className="checklist-wrapper">
                    <p className="checklist-text">Checklists</p>
                    <Link to="/checklist/acInstall" className="checklist-btn">A/C Install Checklist</Link>
                    <Link to="/checklist/acRepair" className="checklist-btn">A/C Repair Checklist</Link>
                    <Link to="/checklist/heating" className="checklist-btn">Heating Repair Checklist</Link>
                    <Link to="/checklist/plumbing" className="checklist-btn">Plumbing Repair Checklist</Link>
                </div>
            </div>
        </div>
    );
};

export default Main;
