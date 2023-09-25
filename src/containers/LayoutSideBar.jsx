// Sidebar.js
import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/index.js';
import '../styles/Sidebar.css';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';

function Sidebar(props) {
  const history = useNavigate();
  const changepath = (path) => {
    path === "Usuarios" ? history("/users") : history("/");
    path === "Grupos" ? history("/groups") : history("/");
    path === "Residuos" ? history("/residue") : history("/");
    path === "Transportistas" ? history("/groups") : history("/");
    path === "Conductor" ? history("/driver") : history("/");
    path === "Vehiculo" ? history("/vehicle") : history("/");
    path === "Donador" ? history("/groups") : history("/");
    path === "CentroReciclaje" ? history("/recycling-center") : history("/");
    path === "CentroRecoleccion" ? history("/recycling-center") : history("/");
    path === "Generadores" ? history("/generator") : history("/");

  };
  const { openSideBar, setOpenSideBar } = useContext(TodoContext);

  const toggleSidebar = () => {
    setOpenSideBar(!openSideBar);
    console.log("ASDASDAS###############33")

  };

  return (
    <div className={`sidebar ${openSideBar ? 'open' : ''}`}>

      <label className='h1-side' >Modelos</label>
      {/* Contenido de la barra lateral */}
      <ul >
        <button className='label-side' onClick={() => { changepath("Usuarios") }}>
          <FontAwesomeIcon icon={faUser} /> Usuarios
        </button>
        <button className='label-side' onClick={() => { changepath("Grupos") }}><FontAwesomeIcon icon={faUserGroup} />Grupos</button>
        <button className='label-side' onClick={() => { changepath("Residuos") }}><FontAwesomeIcon icon="fa-solid fa-trash-arrow-up" />Residuo</button>
        <label className='h1-side'>Viajes </label>
        <button className='label-side'>Transportista</button>
        <button className='label-side' onClick={() => { changepath("Conductor") }}>Conductor</button>
        <button className='label-side' onClick={() => { changepath("Vehiculo") }}>Vehiculo</button>
        <button className='label-side'>Donador</button>
        <button className='label-side' onClick={() => { changepath("Generadores") }}>Generador</button>
        <button className='label-side' onClick={() => { changepath("CentroReciclaje") }}>Centro de Reciclaje</button>
        <button className='label-side'>Centro de recoleccion</button>
      </ul>

    </div>

  );
}

export default Sidebar;