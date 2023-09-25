
import React, { useState, useEffect, useContext } from "react";
import '../styles/user/MenuUser.css'
import { TodoContext } from '../context/index.js';
import { Modal } from './Users/ModalUser';
import { OptionButton } from '../components/OptionButton';
import UserTable from "../components/Table";
import CUDButtons from "../containers/CUDButtons";
import BarsChart from "../components/BarsChart";
import BarsChartVehicle from "../components/BarsChartVehicle";
import GroupTable from "../components/GroupTable";
import VehicleTable from "../components/VehicleTable";
function MenuVehicle() {

  const handleAdd = () => {
    // Lógica para agregar
    console.log("Agregando")

  };

  const handleUpdate = () => {
    console.log("Actualizando")
  };

  const handleDelete = () => {
    // Lógica para eliminar
    console.log("Eliminando")
  };
  const [datos, setDatos] = useState([]);
  const { totalListlUsers, openModalCreate, setOpenModalCreate, setOpenModalEdit,
    openModalEdit, setOpenModalDelete, openModalDelete } = useContext(TodoContext);

  useEffect(() => {

    setDatos(totalListlUsers);
  }, []);

  return (
    <div className="container" >
      <h1 >Vehiculos</h1>

      <CUDButtons model={"Vehicle"}/>
      <VehicleTable />
      <div  style={{ width: "450px", height: "225px",padding : "10px", margin: "10px" }}>
        <BarsChartVehicle />
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

export { MenuVehicle };
