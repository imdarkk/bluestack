import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

// Checklists
import ACRepairCheck from "../components/ACRepairCheck";
import ACInstallCheck from "../components/ACInstallCheck";
import HeatingCheck from "../components/HeatingCheck";
import PlumbingCheck from "../components/PlumbingCheck";

import "../styles/checklists.scss";

const Checklist = () => {
    const { type } = useParams();
    return (
        <div>
            {type == "acRepair" && <ACRepairCheck />}
            {type == "acInstall" && <ACInstallCheck />}
            {type == "heating" && <HeatingCheck />}
            {type == "plumbing" && <PlumbingCheck />}
            {(type != "acRepair" && type != "acInstall" && type != "heating" && type != "plumbing") && (
                <p>{type}</p>
            )}
        </div>
    );
};

export default Checklist;
