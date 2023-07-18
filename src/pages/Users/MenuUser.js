
import React, { useState, useEffect, useContext } from "react";
import '../../styles/user/MenuUser.css'
import { TodoContext } from '../../context/index.js';
import { Modal } from './CreateUser.js';
import { OptionButton } from '../../components/OptionButton';

function MenuUser() {
  const [datos, setDatos] = useState([]);
  const { totalListlUsers, openModalCreate, setOpenModalCreate , setOpenModalEdit,
     openModalEdit , setOpenModalDelete, openModalDelete} = useContext(TodoContext);

  useEffect(() => {
    
    setDatos(totalListlUsers);
  }, []);


  return (
    <div className="Container">
      <h1 className="Title">Usuarios</h1>
      <input className="Search" type="text" placeholder="Buscar" />

      <div className="TableContainer">
      <table className="HeaderTable">
        <thead>
          <tr>
            <th className="ComponentTable">ID</th>
            <th className="ComponentTable">Nombre</th>
            <th className="ComponentTable">Apellido</th>
            <th className="ComponentTable">Email</th>
            <th className="ComponentTable">Registrado</th>
            <th className="ComponentTable">Roles</th>
            <th className="ComponentTable">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id}>
              <td className="ComponentTable">{item.id}</td>
              <td className="ComponentTable">{item.name}</td>
              <td className="ComponentTable">{item.apellido}</td>
              <td className="ComponentTable">{item.email}</td>
              <td className="ComponentTable">{item.registered}</td>
              <td className="ComponentTable">{item.rol}</td>
              <td className="ComponentTable"> 
                <OptionButton setOpenModal={setOpenModalEdit} text = "Editar Usuario" color = "yellow" />  
                <OptionButton setOpenModal={setOpenModalDelete} text = "Borrar Usuario" color = "red" /> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
      <OptionButton setOpenModal={setOpenModalCreate} text = "Crear Usuario" color = "#40916C" />

      
      {openModalCreate && (
        <Modal mode={"CREAR"}>
          La funcionalidad de agregar TODO
        </Modal>
      )
      }
      {openModalEdit && (
        <Modal mode={"EDITAR"}>
          La funcionalidad de editar TODO
        </Modal>
      )
      }
      {openModalDelete && (
        <Modal mode={"BORRAR"}>
          La funcionalidad de borrar TODO
        </Modal>
      )
      }


    </div>
    


  );

}

export { MenuUser };
