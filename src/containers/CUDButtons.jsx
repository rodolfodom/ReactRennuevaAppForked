
import React, { useState, useEffect, useContext } from "react";
import { TodoContext } from '../context/index.js';
import { OptionButton } from '../components/OptionButton';


const CUDButtons = ({ handleAdd, handleDelete, handleUpdate, model }) => {
    const {
      totalListlUsers,
      openModalCreate, setOpenModalCreate,
      openModalEdit, setOpenModalEdit,
      openModalDelete, setOpenModalDelete, theme, setTheme, themeStyle,
      openModalCreateGroup, setOpenModalCreateGroup,
      openModalEditGroup, setOpenModalEditGroup,
      openModalDeleteGroup, setOpenModalDeleteGroup,
      openModalCreateCarrier, setOpenModalCreateCarrier,
      openModalEditCarrier, setOpenModalEditCarreir,
      openModalDeleteCarrier, setOpenModalDeleteCarrier,
      openModalCreateCollectionCenter, setOpenModalCreateCollectionCenter,
      openModalEditCollectionCenter, setOpenModalEditCollectionCenter,
      openModalDeleteCollectionCenter, setOpenModalDeleteCollectionCenter,
      openModalCreateDonor, setOpenModalCreateDonor,
      openModalEditDonor, setOpenModalEditDonor,
      openModalDeleteDonor, setOpenModalDeleteDonor,
      openModalCreateDriver, setOpenModalCreateDriver,
      openModalEditDriver, setOpenModalEditDriver,
      openModalDeleteDriver, setOpenModalDeleteDriver,
      openModalCreateGenerator, setOpenModalCreateGenerator,
      openModalEditGenerator, setOpenModalEditGenerator,
      openModalDeleteGenerator, setOpenModalDeleteGenerator,
      openModalCreateRecyclingCenter, setOpenModalCreateRecyclingCenter,
      openModalEditRecyclingCenter, setOpenModalEditRecyclingCenter,
      openModalDeleteRecyclingCenter, setOpenModalDeleteRecyclingCenter,
      openModalCreateResidue, setOpenModalCreateResidue,
      openModalEditResidue, setOpenModalEditResidue,
      openModalDeleteResidue, setOpenModalDeleteResidue,
      openModalCreateVehicle, setOpenModalCreateVehicle,
      openModalEditVehicle, setOpenModalEditVehicle,
      openModalDeleteVehicle, setOpenModalDeleteVehicle,
    } = useContext(TodoContext);
    
    return (
        <div style={{display :"flex"}}>
        <div className="create-button">
        {model === 'User' ? (
        <OptionButton setOpenModal={setOpenModalCreate} text="Crear Usuario" color="#28a745" />
      ): null } 
      {model === 'Group' ? (
        <OptionButton setOpenModal={setOpenModalCreateGroup} text="Crear Grupo" color="#28a745" />
      ): null }
      {model === 'Carrier' ? (
        <OptionButton setOpenModal={setOpenModalCreateCarrier} text="Crear Transportista" color="#28a745" />
      ):null}
      {model === 'CollectionCenter' ? (
        <OptionButton setOpenModal={setOpenModalCreateCollectionCenter} text="Crear Centro de Acopio" color="##28a745" />
      ) : null}
      {model === 'Donor' ? (
        <OptionButton setOpenModal={setOpenModalCreateDonor} text="Crear Donador" color="##28a745" />
      ): null}
      {model === 'Driver' ? (
        <OptionButton setOpenModal={setOpenModalCreateDriver} text="Crear Conductor" color="#28a745" />
      ) : null}
      {model === 'Generator' ? (
        <OptionButton setOpenModal={setOpenModalCreateGenerator} text="Crear Generador" color="#40916C" />
      ): null}
      {model === 'RecyclingCenter' ? (
        <OptionButton setOpenModal={setOpenModalCreateRecyclingCenter} text="Crear Centro de Reciclaje" color="#40916C" />
      ) :null}
      {model === 'Residue' ? (
        <OptionButton setOpenModal={setOpenModalCreateResidue} text="Crear Residuo" color="#40916C" />
      ) : null}
      {model === 'Vehicle' ? (
        <OptionButton setOpenModal={setOpenModalCreateVehicle} text="Crear Vehicle" color="#40916C" />
      ) : null}

      </div>
        <div className="create-button">
        {model === "User"  ? (
          <OptionButton setOpenModal={setOpenModalEdit} text="Editar Usuario" color="#007bff" />
        ) : null}
        {model === "Group"  ? (
          <OptionButton setOpenModal={setOpenModalEditGroup} text="Editar Grupo" color="##007bff" />
        ) : null}
        {model === "Carrier"  ? (
          <OptionButton setOpenModal={setOpenModalEditCarreir} text="Editar Transportista" color="##007bff" />
        ) : null }
        {model === "CollectionCenter"  ? (
          <OptionButton setOpenModal={setOpenModalEditCollectionCenter} text="Editar Centro de Acopio" color="#eeef20" />
        ) : null}
        {model === "Donor"  ? (
          <OptionButton setOpenModal={setOpenModalEditDonor} text="Editar Donador" color="#eeef20" />
        ) : null}
        {model === "Driver"  ? (
          <OptionButton setOpenModal={setOpenModalEditDriver} text="Editar Conductor" color="#eeef20" />
        ) : null}
        {model === "Generator"  ? (
          <OptionButton setOpenModal={setOpenModalEditGenerator} text="Editar Generador" color="#eeef20" />
        ): null }
        {model === "RecyclingCenter"  ? (
          <OptionButton setOpenModal={setOpenModalEditRecyclingCenter} text="Editar Centro de Reciclaje" color="#eeef20" />
        ) : null}
        {model === "Residue"  ? (
          <OptionButton setOpenModal={setOpenModalEditResidue} text="Editar Residuo" color="#eeef20" />
        ) : null}
        {model === "Vehicle"  ? (
          <OptionButton setOpenModal={setOpenModalEditVehicle} text="Editar Vehicle" color="#eeef20" />
        ) : null}

      </div>
        <div className="create-button">
        {model === "User" ? (
          <OptionButton setOpenModal={setOpenModalDelete} text="Borrar Usuario" color="#dc3545" />
        ): null}
        {model === "Group" ? (
          <OptionButton setOpenModal={setOpenModalDeleteGroup} text="Borrar Grupo" color="#dc3545" />
        ): null}
        {model === "Carrier" ? (
          <OptionButton setOpenModal={setOpenModalDeleteCarrier} text="Borrar Transportista" color="#dc3545" />
        ): null}
        {model === "CollectionCenter" ? (
          <OptionButton setOpenModal={setOpenModalDeleteCollectionCenter} text="Borrar Centro de Acopio" color="red" />
        ): null}
        {model === "Donor" ? (
          <OptionButton setOpenModal={setOpenModalDeleteDonor} text="Borrar Donador" color="red" />
        ): null}
        {model === "Driver" ? (
          <OptionButton setOpenModal={setOpenModalDeleteDriver} text="Borrar Conductor" color="red" />
        ): null}
        {model === "Generator" ? (
          <OptionButton setOpenModal={setOpenModalDeleteGenerator} text="Borrar Generador" color="red" />
        ): null}
        {model === "RecyclingCenter" ? (
          <OptionButton setOpenModal={setOpenModalDeleteRecyclingCenter} text="Borrar Centro de Reciclaje" color="red" />
        ): null}
        {model === "Residue" ? (
          <OptionButton setOpenModal={setOpenModalDeleteResidue} text="Borrar Residuo" color="red" />
        ): null}
        {model === "Vehicle" ? (
          <OptionButton setOpenModal={setOpenModalDeleteVehicle} text="Borrar Vehicle" color="red" />
        ): null}

      </div>
        </div>
    );
    }
    
    export default CUDButtons;