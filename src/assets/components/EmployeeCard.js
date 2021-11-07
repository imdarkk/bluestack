import React from "react";

const EmployeeCard = (props) => {
    return (
        <div className="employee-card-wrapper">
            <b>Username: </b>{props.username}<br />
            <b>Name: </b>{props.name}<br />
            <b>Surname: </b>{props.surname}<br />
            <b>Phone: </b>{props.phoneNumber}<br />
            <b>Email: </b>{props.email}<br />
            <b>Role: </b>{props.role}
        </div>
    );
};

export default EmployeeCard;
