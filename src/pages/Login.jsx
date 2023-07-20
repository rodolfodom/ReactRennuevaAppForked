import React from "react";
import "../styles/Login.css";

const Login = () => {
    
    return (
        <div className="login">
        <div className="form-container">
            <img src="./logos/logo_yard_sale.svg" alt="logo" className="logo" />
            <h1 className="title">Welcome back!</h1>
            <p className="subtitle">Welcome back! Please enter your details</p>
            <form action="/" className="form">
                <label htmlFor="password" className="label">Email</label>
                <input type="email" id="email" placeholder="example@gmail.com" className="input input-password" />
                <label htmlFor="new-password" className="label">Password</label>
                <input type="password" id="new-password" placeholder="*********" className="input input-password" />
                <input type="submit" defaultValue="Confirm" className="primary-button login-button" />
            </form>
        </div>
    </div>
        
    );

};

export default Login;