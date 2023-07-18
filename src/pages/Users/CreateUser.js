import React, {useState, useContext}from 'react';
import ReactDOM from 'react-dom';
import '../../styles/user/CreateUser.css';
import { TodoContext } from '../../context/index.js';
function Modal({ children , mode}) {
  console.log(mode);
  const [datos, setDatos] = useState([]);
  const { openModalCreate, setOpenModalCreate, openModalEdit, openModalDelete, setOpenModalEdit, setOpenModalDelete} = useContext(TodoContext);
  const closeModal = () => {
    if (openModalCreate) {
      setOpenModalCreate(false);
    }
    if (openModalEdit) {
      setOpenModalEdit(false);
    }
    if (openModalDelete) {
      setOpenModalDelete(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Agregar los datos ingresados al arreglo de datos
    const nuevoDato = {
      nombre: e.target.nombre.value,
      email: e.target.email.value,
      registrado: e.target.registrado.checked,
      rol: e.target.rol.value,
    };
    setDatos([...datos, nuevoDato]);

    // Limpiar los campos del formulario
    e.target.reset();
  };
  return ReactDOM.createPortal(
    

    <div className="ModalBackground">
    
      <div className='DivModal'>
      <button className="ModalClose" onClick={closeModal}>
          <span>&times;</span>
        </button>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" required />
        </label>
        <label>
          Apellido:
          <input type="text" name="nombre" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>

        <label>
          Registrado:
          <input type="date" name="registrado" />
        </label>
        <label>
          Rol:
          <select name="rol" required>
            <option value="">Seleccionar</option>
            <option value="admin">Admin</option>
            <option value="usuario">Usuario</option>
          </select>
        </label>

        <button type="submit">{mode}</button>
      </form>
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };
