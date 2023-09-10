
import React, { useState, useEffect, useContext } from "react";
import '../../styles/user/MenuUser.css'
import { TodoContext } from '../../context/index.js';
import { Modal } from './CreateUser.js';
import { OptionButton } from '../../components/OptionButton';
import UserTable from "../../components/Table";
import CUDButtons from "../../containers/CUDButtons";
import BarsChart from "../../components/BarsChart";
import BarsChartGroup from "../../components/BarsChartGroup";
import GroupTable from "../../components/GroupTable";

function MenuGroups() {

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

  const handleSubmit = (e) => {




    e.preventDefault();
    // Agregar los datos ingresados al arreglo de datos
    const nuevoDato = {
      user: e.target.user.value,
      password: e.target.password.value,
      email: e.target.email.value,
      first_name: e.target.nombre.value,
      last_name: e.target.apellido.value,
      group: e.target.rol.value
    };
    console.log(nuevoDato)
    console.log("E#################################R")
    console.log(document.getElementById("mySelect"))
    console.log(user)

    const antiguo_user = document.getElementById("mySelect")
    var user_ant = antiguo_user.value

    const editarDato = {
      user: e.target.user.value,
      password: e.target.password.value,
      email: e.target.email.value,
      first_name: e.target.nombre.value,
      last_name: e.target.apellido.value,
     
      antiguoUser:  user_ant
    };

    const deleteDato = {
      user : user_ant
    }


    

    // Realiza una petición GET a una URL específica

    
      const crear = mode === "CREAR" ? (
        axios
          .post('http://127.0.0.1:8000/Rennueva/create-django-user/', nuevoDato)
          .then(response => {
            const data = response.data;
            console.log(data)




          })
          .catch(error => {
            console.error(error);
          })
      ) : null
    
      const editar = mode === "EDITAR" ? (
        axios
          .put('http://127.0.0.1:8000/Rennueva/update-django-user/', editarDato)
          .then(response => {
            const data = response.data;
            console.log(data)
            e.target.reset();
            closeModal()
            // Limpiar los campos del formulario
   




          })
          .catch(error => {
            console.error(error);
          })
      ) : null
   
      const borrar = mode === "BORRAR" ? (

        axios
          .put('http://127.0.0.1:8000/Rennueva/delete-django-user/', deleteDato)
          .then(response => {
            const data = response.data;
            console.log(data)
            e.target.reset();
            closeModal()




          })
          .catch(error => {
            console.error(error);
          })
      ) : null
    




    // Limpiar los campos del formulario
    e.target.reset();
  };




  return (
    <div className="container" >
      <h1 >Grupos</h1>

      <CUDButtons />
      <GroupTable />
      <div  style={{ width: "450px", height: "225px",padding : "10px", margin: "10px" }}>
        <BarsChartGroup />
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

export { MenuGroups };
