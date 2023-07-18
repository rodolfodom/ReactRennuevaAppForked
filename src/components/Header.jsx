import React from 'react';
import  Rennueva from '../assets/Rennueva.jpg';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      
      <nav>
        <img src={Rennueva} alt = "Rennueva" className='menu'  />
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/about">Acerca de</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;