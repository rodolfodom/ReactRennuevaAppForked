
import React, { useState, useEffect, useContext } from "react";
import '../styles/user/MenuUser.css'
import { TodoContext } from '../context/index.js';
import { Modal } from './Users/CreateUser';
import { OptionButton } from '../components/OptionButton';
import UserTable from "../components/Table";
import CUDButtons from "../containers/CUDButtons";
import BarsChart from "../components/BarsChart";
import BarsChartVehicle from "../components/BarsChartVehicle";
import ResidueTable from "../components/ResidueTable";
import VehicleTable from "../components/VehicleTable";

function MenuResidue() {

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
      <h1 >Residuos</h1>

      <CUDButtons model = "Driver"/>
      <ResidueTable />
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

export { MenuResidue };
