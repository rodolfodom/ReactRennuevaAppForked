
import React, { useState, useEffect, useContext } from "react";
import '../../styles/user/MenuUser.css'
import { TodoContext } from '../../context/index.js';
import { Modal } from './CreateUser.js';
import { OptionButton } from '../../components/OptionButton';
import UserTable from "../../components/Table";

function MenuUser() {
  const [datos, setDatos] = useState([]);
  const { totalListlUsers, openModalCreate, setOpenModalCreate , setOpenModalEdit,
     openModalEdit , setOpenModalDelete, openModalDelete} = useContext(TodoContext);

  useEffect(() => {
    
    setDatos(totalListlUsers);
  }, []);

  const style = {
    height: "100vh",  
  }
  return (
    <div style={style}>
      <h1 className="header" >Usuarios</h1>

      <UserTable />



      <div className="create-button">
      <OptionButton  setOpenModal={setOpenModalCreate} text = "Crear Usuario" color = "#40916C" />

      </div>
      
      
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
