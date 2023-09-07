
import React, { useState, useEffect, useContext } from "react";
import { TodoContext } from '../context/index.js';
import { OptionButton } from '../components/OptionButton';

const CUDButtons = ({ handleAdd, handleDelete, handleUpdate }) => {
    const { totalListlUsers, openModalCreate, setOpenModalCreate, setOpenModalEdit,
        openModalEdit, setOpenModalDelete, openModalDelete } = useContext(TodoContext);
    
    return (
        <div style={{display :"flex"}}>
        <div className="create-button">
        <OptionButton setOpenModal={setOpenModalCreate} text="Crear Usuario" color="#40916C" />

      </div>
        <div className="create-button">
        <OptionButton setOpenModal={setOpenModalEdit} text="Editar Usuario" color="#eeef20" />

      </div>
        <div className="create-button">
        <OptionButton setOpenModal={setOpenModalDelete} text="Borrar Usuario" color="red" />

      </div>
        </div>
    );
    }
    
    export default CUDButtons;