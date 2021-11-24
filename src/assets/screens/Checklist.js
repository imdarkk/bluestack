import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

// Checklists
import ACRepairCheck from "../components/ACRepairCheck";
import ACInstallCheck from "../components/ACInstallCheck";
import HeatingCheck from "../components/HeatingCheck";
import PlumbingCheck from "../components/PlumbingCheck";

import "../styles/checklists.scss";
import { Container } from "@chakra-ui/react";

const Checklist = () => {
    const { type } = useParams();
    return (
        <Container bg="#10151A" maxW="100vw" h="100vh" color="white">
            {type == "acRepair" && <ACRepairCheck />}
            {type == "acInstall" && <ACInstallCheck />}
            {type == "heating" && <HeatingCheck />}
            {type == "plumbing" && <PlumbingCheck />}
            {(type != "acRepair" && type != "acInstall" && type != "heating" && type != "plumbing") && (
                <p>{type}</p>
            )}
        </Container>
    );
};

export default Checklist;
