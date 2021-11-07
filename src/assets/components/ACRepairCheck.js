import React, {useState, useEffect} from "react";
import ToolcardBox from "./ToolcardBox";

const ACRepairCheck = () => {
    return (
        <div className="check-wrapper">
            <p className="check-text">Check your tools, if there is anything missing, press <b>❌</b>, otherwise press <b>✔️</b></p>

            <ToolcardBox />
        </div>
    );
};

export default ACRepairCheck;
