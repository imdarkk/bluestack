import React, { useState, useEffect } from "react";
import EmployeeCard from "../components/EmployeeCard";
import Navigation from "../components/Navigation";
import HamburgerButton from "../components/HamburgerButton";
import { useAuth } from "../auth/auth-context";
import "../styles/employees.scss";

const Employees = () => {
    const { menu } = useAuth();
    const [employees, setEmployees] = useState([]);
    const details = JSON.parse(localStorage.getItem('details'));
    useEffect(() => {
        (async() => {
            const employees = await fetch(`http://localhost:3001/getEmployees/${details.username}`);
            const response = await employees.json();

            setEmployees(response.map((e) => ({
                username: e.username,
                email: e.email,
                name: e.name,
                surname: e.surname,
                phoneNumber: e.phoneNumber,
                role: e.role
            })));
        })();
    }, []);
    return (
        <div>
            <HamburgerButton />
            {menu && <Navigation />}
            <div className="employees-wrapper">
                {employees && (
                    employees.map((employee) => (
                        <EmployeeCard username={employee.username} email={employee.email} name={employee.name} surname={employee.surname} phoneNumber={employee.phoneNumber} role={employee.role} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Employees;
