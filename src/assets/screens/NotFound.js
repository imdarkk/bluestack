import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
    const navigation = useHistory();
    return (
        <div>
            <p>404 Page Not Found</p>
            <p onClick={() => navigation.goBack()}>{"<"} Go Back</p>
        </div>
    );
};

export default NotFound;