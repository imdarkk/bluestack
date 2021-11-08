import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import "../styles/employees.scss";

const EditEmployee = () => {
    const [employee, setEmployee] = useState([]);
    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        (async() => {
            const getEmployee = await fetch(`http://46.101.219.134:3001/getEmployee/${id}`);
            const response = await getEmployee.json();
            setEmployee(response.map((e) => ({
                id: e.id,
                username: e.username,
                name: e.name,
                surname: e.surname,
                email: e.email,
                phoneNumber: e.phoneNumber,
                role: e.role
            })));
        })();
    }, []);
    return (
        <>
            {employee.map((e) => (
                <div className="edit-employee-wrapper">
                    <p className="edit-employee-text">Manage employee account</p>
                    <p>ID</p>
                    <input type="text" className="general-input" value={e.id} disabled />
                    <p>Username</p>
                    <input type="text" className="general-input" value={e.username} placeholder="Username" />
                    <p>Name</p>
                    <input type="text" className="general-input" value={e.name} placeholder="Name" />
                    <p>Surname</p>
                    <input type="text" className="general-input" value={e.surname} placeholder="Surname" />
                    <p>Email</p>
                    <input type="text" className="general-input" value={e.email} placeholder="Email" />
                    <p>Phone Number</p>
                    <input type="text" className="general-input" value={e.phoneNumber} placeholder="Phone Number" />
                    <p>Role</p>
                    <select value={e.role}>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>

                    <div class="button-edit revoke" onClick={() => {
                        (async() => {
                            const revoke = await fetch('http://46.101.219.134:3001/revoke/employee', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json'
                                },
                                body: JSON.stringify({
                                    username: e.username
                                })
                            });
                            const response = await revoke.json();
                            if(response.status == 200) {
                                history.goBack();
                            }
                        })();
                    }}>Revoke Account</div>
                    <div class="button-edit save">Save Changes</div>
                    <div class="button-edit cancel" onClick={() => history.goBack()}>Cancel</div>
                </div>
            ))}
        </>
    );
};

export default EditEmployee;
