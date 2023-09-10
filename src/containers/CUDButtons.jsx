
import React, { useState, useEffect, useContext } from "react";
import { TodoContext } from '../context/index.js';
import { OptionButton } from '../components/OptionButton';

const CUDButtons = ({ handleAdd, handleDelete, handleUpdate, model }) => {
    const {
      totalListlUsers,
      openModalCreate, setOpenModalCreate, openModalEdit,
      setOpenModalEdit, openModalDelete,
      setOpenModalDelete, theme, setTheme, themeStyle,
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
        {model === 'Group' ? (
        <OptionButton setOpenModal={setOpenModalCreateGroup} text="Crear Usuario" color="#40916C" />
      ): null }
      {model === 'Carrier' ? (
        <OptionButton setOpenModal={setOpenModalCreateCarrier} text="Crear Usuario" color="#40916C" />
      ):null}
      {model === 'CollectionCenter' ? (
        <OptionButton setOpenModal={setOpenModalCreateCollectionCenter} text="Crear Usuario" color="#40916C" />
      ) : null}
      {model === 'Donor' ? (
        <OptionButton setOpenModal={setOpenModalCreateDonor} text="Crear Usuario" color="#40916C" />
      ): null}
      {model === 'Driver' ? (
        <OptionButton setOpenModal={setOpenModalCreateDriver} text="Crear Usuario" color="#40916C" />
      ) : null}
      {model === 'Generator' ? (
        <OptionButton setOpenModal={setOpenModalCreateGenerator} text="Crear Usuario" color="#40916C" />
      ): null}
      {model === 'RecyclingCenter' ? (
        <OptionButton setOpenModal={setOpenModalCreateRecyclingCenter} text="Crear Usuario" color="#40916C" />
      ) :null}
      {model === 'Residue' ? (
        <OptionButton setOpenModal={setOpenModalCreateResidue} text="Crear Usuario" color="#40916C" />
      ) : null}
      {model === 'Vehicle' ? (
        <OptionButton setOpenModal={setOpenModalCreateVehicle} text="Crear Usuario" color="#40916C" />
      ) : null}

      </div>
        <div className="create-button">
        {model === "Group"  ? (
          <OptionButton setOpenModal={setOpenModalEditGroup} text="Editar Usuario" color="#eeef20" />
        ) : null}
        {model === "Carrier"  ? (
          <OptionButton setOpenModal={setOpenModalEditCarreir} text="Editar Usuario" color="#eeef20" />
        ) : null }
        {model === "CollectionCenter"  ? (
          <OptionButton setOpenModal={setOpenModalEditCollectionCenter} text="Editar Usuario" color="#eeef20" />
        ) : null}
        {model === "Donor"  ? (
          <OptionButton setOpenModal={setOpenModalEditDonor} text="Editar Usuario" color="#eeef20" />
        ) : null}
        {model === "Driver"  ? (
          <OptionButton setOpenModal={setOpenModalEditDriver} text="Editar Usuario" color="#eeef20" />
        ) : null}
        {model === "Generator"  ? (
          <OptionButton setOpenModal={setOpenModalEditGenerator} text="Editar Usuario" color="#eeef20" />
        ): null }
        {model === "RecyclingCenter"  ? (
          <OptionButton setOpenModal={setOpenModalEditRecyclingCenter} text="Editar Usuario" color="#eeef20" />
        ) : null}
        {model === "Residue"  ? (
          <OptionButton setOpenModal={setOpenModalEditResidue} text="Editar Usuario" color="#eeef20" />
        ) : null}
        {model === "Vehicle"  ? (
          <OptionButton setOpenModal={setOpenModalEditVehicle} text="Editar Usuario" color="#eeef20" />
        ) : null}

      </div>
        <div className="create-button">
        {model === "Group" ? (
          <OptionButton setOpenModal={setOpenModalDeleteGroup} text="Borrar Usuario" color="red" />
        ): null}
        {model === "Carrier" ? (
          <OptionButton setOpenModal={setOpenModalDeleteCarrier} text="Borrar Usuario" color="red" />
        ): null}
        {model === "CollectionCenter" ? (
          <OptionButton setOpenModal={setOpenModalDeleteCollectionCenter} text="Borrar Usuario" color="red" />
        ): null}
        {model === "Donor" ? (
          <OptionButton setOpenModal={setOpenModalDeleteDonor} text="Borrar Usuario" color="red" />
        ): null}
        {model === "Driver" ? (
          <OptionButton setOpenModal={setOpenModalDeleteDriver} text="Borrar Usuario" color="red" />
        ): null}
        {model === "Generator" ? (
          <OptionButton setOpenModal={setOpenModalDeleteGenerator} text="Borrar Usuario" color="red" />
        ): null}
        {model === "RecyclingCenter" ? (
          <OptionButton setOpenModal={setOpenModalDeleteRecyclingCenter} text="Borrar Usuario" color="red" />
        ): null}
        {model === "Residue" ? (
          <OptionButton setOpenModal={setOpenModalDeleteResidue} text="Borrar Usuario" color="red" />
        ): null}
        {model === "Vehicle" ? (
          <OptionButton setOpenModal={setOpenModalDeleteVehicle} text="Borrar Usuario" color="red" />
        ): null}

      </div>
        </div>
    );
    }
    
    export default CUDButtons;