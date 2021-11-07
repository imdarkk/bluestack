import React, { useState, useEffect } from "react";

const ToolsCard = (props) => {
    return (
        <div className="tool-card">
            <p><b>Tool: </b>{props.tool}</p>
            <p><b>Category: </b>{props.category.length == 2 ? props.category.toUpperCase() : props.category.charAt(0).toUpperCase() + props.category.slice(1)} Tools</p>
            <p><b>Car: </b>{props.car}</p>
            <p><b>Amount: </b>{props.amount}</p>
        </div>
    );
};

export default ToolsCard;
