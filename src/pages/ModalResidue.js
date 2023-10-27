import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/user/CreateUser.css';
import { TodoContext } from '../context/index.js';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import Title from '../components/Title';

function ModalResidue({ children, mode }) {
  const [residues, setResidues] = useState([]);
  const [residue, setResidue] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const { openModalCreateResidue , setOpenModalCreateResidue, openModalEditResidue, setOpenModalEditResidue, openModalDeleteResidue, setOpenModalDeleteResidue } = useContext(TodoContext);

  const closeModal = () => {
    if (openModalCreateResidue) {
      setOpenModalCreateResidue(false);
    }
    if (openModalEditResidue) {
      setOpenModalEditResidue(false);
    }
    if (openModalDeleteResidue) {
      setOpenModalDeleteResidue(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();


  
     const nuevoDato = {
      nombre: e.target.name.value,
      descripcion: e.target.descripcion.value,
     };

  //   const antiguo_user = document.getElementById("mySelect")
  //   var user_ant = antiguo_user ? antiguo_user.value : null;

  //   const editarDato = {
  //     user: e.target.user.value,

  //   };

  //   const deleteDato = {
  //     user : user_ant
  //   }

      const crear = mode === "CREAR" ? (
        axios
          .post('http://127.0.0.1:8000/Rennueva/create-residue/', {
            nombre: e.target.nombre.value,
            descripcion: e.target.descripcion.value,
           })
          .then(response => {
            const data = response.data;
            console.log(data)
            // setOpenModalText(true);
            e.target.reset();
            

          })
          .catch(error => {
            console.error(error);
          })
      ) : null

  //     const editar = mode === "EDITAR" ? (
  //       axios
  //         .put('http://127.0.0.1:8000/Rennueva/update-django-user/', editarDato)
  //         .then(response => {
  //           const data = response.data;
  //           console.log(data)
  //           e.target.reset();
  //           closeModal()
  //           // Limpiar los campos del formulario
  //         })
  //         .catch(error => {
  //           console.error(error);
  //         })
  //     ) : null

  //     const borrar = mode === "BORRAR" ? (
  //       axios
  //         .put('http://127.0.0.1:8000/Rennueva/delete-django-user/', deleteDato)
  //         .then(response => {
  //           const data = response.data;
  //           console.log(data)
  //           e.target.reset();
  //           closeModal()

  //         })
  //         .catch(error => {
  //           console.error(error);
  //         })
  //     ) : null

    // Limpiar los campos del formulario
    e.target.reset();
   };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/Rennueva/get-all-groups/')
      .then(response => {
        const data = response.data;
        setResidues(data)
        console.log("######################GRUPOS##################################")

      })
      .catch(error => {
        console.error(error);
      });

  }, []);


//   const handleSelectChange = (event) => {
//     const selectedOption = event.target.value; // Obtener la opción seleccionada
//     console.log(selectedOption)
//     // Buscar el dato seleccionado en el arreglo de datos
//      const datoEncontrado = groups.find((groups) => groups.name === selectedOption);
//     // console.log(datoEncontrado)

//     setGroup(datoEncontrado.group);




//   }

  const handleInputChange = (e, setState, mode) => {
    const currentInputValue = e.target.value;

    if (mode !== "BORRAR") {
      setState(currentInputValue);
    }
  };

  return ReactDOM.createPortal(
    <Modal open={true} onClose={closeModal} >
      <Box className="ModalContent" sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,

      }}>
        <Button onClick={closeModal} sx={{ position: 'absolute', right: 2, top: 2 }}>&times;</Button>
        <form onSubmit={handleSubmit} >
          <Box mb={2}>
            <Title> Residuos</Title>
            {mode === "EDITAR" || mode === "BORRAR" ? (
              <FormControl fullWidth>
                <InputLabel id="user-select-label">Grupo</InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  // onChange={(e) => handleSelectChange(e, setUser)}
                  required
                >
                  {residues.map((name, index) => (
                    <MenuItem key={index} value={name.user}>{name.user}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
          </Box>
          <Box mt={2} mb={2} sx={{overflowY: 'auto', maxHeight : 500}}>

          <FormControl fullWidth mt={2} mb={2}>

          <TextField
            label="Nombre Residuo"
            name="nombre"
            required
            fullWidth
            value={residue}
            onChange={(e) => handleInputChange(e, setResidue,mode)}
            margin="dense"
          />
          <TextField
            label="Descripcion"
            name="descripcion"
            required
            fullWidth
            value={descripcion}
            onChange={(e) => handleInputChange(e, setDescripcion,mode)}
            margin="dense"
          />

          </FormControl>
          </Box>

          <Button type="submit" variant="contained" fullWidth>{mode}</Button>
        </form>
      </Box>


    </Modal>,

    document.getElementById('modal')

  );
}

export { ModalResidue };