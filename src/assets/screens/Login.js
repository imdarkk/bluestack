import React, { useState } from "react";
import { useAuth } from "../auth/auth-context";
import "../styles/login.scss";

const Login = () => {
    const { login, error } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="login-page">
            {error && (
                <div className="error-wrapper">
                    <p>{error}</p>
                </div>
            )}
            <input className="login-input" type="text" placeholder="Username" value={username} onChange={handleUsername}/>
            <input className="login-input" type="password" placeholder="Password" value={password} onChange={handlePassword} />
            <button className="login-button" onClick={() => login(username, password)}>Sign In</button>
        </div>
    );
};

export default Login;
