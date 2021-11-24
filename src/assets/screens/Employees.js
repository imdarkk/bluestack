import React, { useState, useEffect } from "react";
import EmployeeCard from "../components/EmployeeCard";
import Navigation from "../components/Navigation";
import HamburgerButton from "../components/HamburgerButton";
import { useAuth } from "../auth/auth-context";
import "../styles/employees.scss";
import { Container, Flex } from "@chakra-ui/react";

const Employees = () => {
    const { menu } = useAuth();
    const [employees, setEmployees] = useState([]);
    const details = JSON.parse(localStorage.getItem('details'));
    useEffect(() => {
        (async() => {
            const employees = await fetch(`http://46.101.219.134:3001/getEmployees/${details.username}`);
            const response = await employees.json();

            setEmployees(response.map((e) => ({
                id: e.id,
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
        <Container bg="#10151A" maxW="100vw" h="100vh" color="white">
            <HamburgerButton />
            {menu && <Navigation />}
            <Flex flexDirection="column" w="100%" align="center">
                <div className="employees-wrapper">
                    {employees && (
                        employees.map((employee) => (
                            <EmployeeCard id={employee.id} username={employee.username} email={employee.email} name={employee.name} surname={employee.surname} phoneNumber={employee.phoneNumber} role={employee.role} />
                        ))
                    )}
                </div>
            </Flex>
        </Container>
    );
};

export default Employees;
