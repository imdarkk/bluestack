import React from "react";
import "../styles/navigation.scss";
import { useAuth } from "../auth/auth-context";
import { useLocation } from "react-router-dom";

const HamburgerMenu = () => {
    const { menu, handleMenu } = useAuth();
    const location = useLocation();
    return (
        <div className={menu ? "hamburger-wrapper ham-wrap-main" : "hamburger-wrapper"} onClick={handleMenu}>
            {menu ? (
                <div className="close-ham-wrapper">
                    <div className="ham-line-close line1-close"></div>
                    <div className="ham-line-close line2-close"></div>
                </div>
            ): (
                <div className={location.pathname == "/jobs" && "open-ham-wrapper-jobs"}>
                    <div className={location.pathname == "/jobs" ? "ham-line line1 black-lines" : "ham-line line1"}></div>
                    <div className={location.pathname == "/jobs" ? "ham-line line2 black-lines" : "ham-line line2"}></div>
                    <div className={location.pathname == "/jobs" ? "ham-line line3 black-lines" : "ham-line line3"}></div>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;