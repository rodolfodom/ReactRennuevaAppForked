import React, {useEffect, useState} from "react";
import "../styles/Login.css";
import axios from "axios";
const Login = () => {

    const imageStyle = {
        width: '200px', // Modifica este valor para ajustar el ancho
        height: 'auto', // Mantenemos la proporción de aspecto
      };

    const handleLogin = () => {
        console.log("Login");
    };

    
    
    return (
        <div className="login">
           
            <div className="form-container">
            <div>
                <img
                    src={require('../assets/logos/Rennueva.jpg')}
                    alt="Rennueva Logo"
                    style={imageStyle} // Aplicamos los estilos a la imagen
                />
            </div>

                <h1 className="title">Bienvenido</h1>
                <p className="subtitle">Ingresa tus datos</p>
                <form action="/" className="form">
                    <label htmlFor="password" className="label">Email</label>
                    <input type="email" id="email" placeholder="example@gmail.com" className="input input-password" />
                    <label htmlFor="new-password" className="label">Password</label>
                    <input type="password" id="new-password" placeholder="*********" className="input input-password" />
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>

    );

};

export default Login;