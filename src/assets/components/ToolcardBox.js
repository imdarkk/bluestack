import React, { useState } from "react";

const ToolcardBox = () => {
    const [active, setActive] = useState("");
    return (
        <div className="toolcard-box">
            <p className="toolcard-text"><b>+ Screwdriver</b></p>
            <p><b>Amount in toolbox: </b>2</p>

            <div className="check-action-wrapper">
                <div onClick={() => setActive("no")} className={active == "no" ? "check-action white" : "check-action"}>❌</div>
                <div onClick={() => setActive("yes")} className={active == "yes" ? "check-action white" : "check-action"}>✔️</div>
            </div>
        </div>
    );
};

export default ToolcardBox;
