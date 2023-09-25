
import React, { useState, useEffect, useContext } from "react";
import '../../styles/user/MenuUser.css'
import { TodoContext } from '../../context/index.js';
import { Modal } from './ModalGroup';
import { OptionButton } from '../../components/OptionButton';
import UserTable from "../../components/Table";
import CUDButtons from "../../containers/CUDButtons";
import BarsChart from "../../components/BarsChart";
import BarsChartGroup from "../../components/BarsChartGroup";
import GroupTable from "../../components/GroupTable";


function MenuGroups() {
  const { openModalCreateGroup, openModalEditGroup, openModalDeleteGroup, setOpenModalEditGroup, setOpenModalDeleteGroup } = useContext(TodoContext);
 
  

  return (
    <div className="container" >
      <h1 >Grupos</h1>

      <CUDButtons model = "Group" />
      <GroupTable />
      <div  style={{ width: "450px", height: "225px",padding : "10px", margin: "10px" }}>
        <BarsChartGroup />
      </div>



      {openModalCreateGroup && (
        <Modal mode={"CREAR"}>
          La funcionalidad de agregar TODO
        </Modal>
      )
      }
      {openModalEditGroup && (
        <Modal mode={"EDITAR"}>
          La funcionalidad de editar TODO
        </Modal>
      )
      }
      {openModalDeleteGroup && (
        <Modal mode={"BORRAR"}>
          La funcionalidad de borrar TODO
        </Modal>
      )
      }


    </div>



  );

}

export { MenuGroups };
