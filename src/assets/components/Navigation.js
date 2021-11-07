import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import "../styles/navigation.scss";

const Navigation = () => {
    const { handleMenu } = useAuth();
    const location = useLocation();
    const details = JSON.parse(localStorage.getItem('details'));
    return (
        <div className={location.pathname == "/jobs" ? "navigation-wrapper nav-bigger" : "navigation-wrapper"}>
            <Link onClick={handleMenu} to="/" className="navigation-text">Home</Link>
            <Link onClick={handleMenu} to="/stock" className="navigation-text">Stock</Link>
            <Link onClick={handleMenu} to="/tools" className="navigation-text">Tools</Link>
            <Link onClick={handleMenu} to="/jobs" className="navigation-text">Jobs</Link>
            {details.role === "admin" && (
                    <>
                        <Link onClick={handleMenu} to="/employees" className="navigation-text">Employees</Link>
                        <Link onClick={handleMenu} to="/create/checklist" className="navigation-text">Create Checklist</Link>
                    </>
            )}
        </div>
    );
};

export default Navigation;
