import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/user/CreateUser.css';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import Title from '../components/Title';
import { TodoContext } from '../context/index.js';

function ModalResidue({ children, mode }) {
  const [residues, setResidues] = useState([]);
  const [residue, setResidue] = useState("");
  const [oldResidue, setOldResidue] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const { setUpdateResidueInfo,openModalCreateResidue, setOpenModalText, setTextOpenModalText, setOpenModalCreateResidue, openModalEditResidue, setOpenModalEditResidue, openModalDeleteResidue, setOpenModalDeleteResidue } = useContext(TodoContext);

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
    if (mode === "CREAR") {
      axios
        .post('https://api.rennueva.com/Rennueva/create-residue/', {
          nombre: e.target.nombre.value,
          descripcion: e.target.descripcion.value,
        })
        .then(response => {
          const data = response.data;
          console.log(data)
          setOpenModalText(true);
          setTextOpenModalText("Residuo creado correctamente")
          setUpdateResidueInfo(true);
          
          closeModal()
          // setOpenModalText(true);
          e.target.reset();


        })
        .catch(error => {
          console.error(error);
        })
    }
    if (mode === "EDITAR") {
      axios
        .put('https://api.rennueva.com/Rennueva/update-residue/', { antiguoNombre : oldResidue, nombre: e.target.nombre.value, descripcion: e.target.descripcion.value})
        .then(response => {
          const data = response.data;
          console.log(data)
          setOpenModalText(true);
          setTextOpenModalText("Residuo editado correctamente")
          e.target.reset();
          closeModal()
          // Limpiar los campos del formulario
        })
        .catch(error => {
          console.error(error);
        })
    }
    if (mode === "BORRAR") {
      axios
        .put('https://api.rennueva.com/Rennueva/delete-residue/', { nombre: e.target.nombre.value})
        .then(response => {
          const data = response.data;
          console.log(data)
          setOpenModalText(true);
          setTextOpenModalText("Residuo borrado correctamente")
          e.target.reset();
          e.target.reset();
          closeModal()

        })
        .catch(error => {
          console.error(error);
        })
    }
    e.target.reset();
  };

  useEffect(() => {
    axios
      .get('https://api.rennueva.com/Rennueva/get-all-residue/')
      .then(response => {
        const data = response.data;
        setResidues(data)
        console.log("######################GRUPOS##################################")

      })
      .catch(error => {
        console.error(error);
      });

  }, []);


  const handleSelectChange = (event) => {
    const selectedOption = event.target.value; // Obtener la opción seleccionada
    console.log(selectedOption)
    setOldResidue(selectedOption)
    // Buscar el dato seleccionado en el arreglo de datos
    const datoEncontrado = residues.find((residues) => residues.nombre === selectedOption);
    console.log("dato encontrado")
    console.log(datoEncontrado)

    setResidue(datoEncontrado.nombre);
    setDescripcion(datoEncontrado.descripcion);




  }

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
                <InputLabel id="residue-select-label">Residuo</InputLabel>
                <Select
                  labelId="residue-select-label"
                  id="residue-select"
                  onChange={(e) => handleSelectChange(e, setResidue)}
                  required
                >
                  {residues.map((name, index) => (
                    <MenuItem key={index} value={name.nombre}>{name.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
          </Box>
          <Box mt={2} mb={2} sx={{ overflowY: 'auto', maxHeight: 500 }}>

            <FormControl fullWidth mt={2} mb={2}>

              <TextField
                label="Nombre Residuo"
                name="nombre"
                required
                fullWidth
                value={residue}
                onChange={(e) => handleInputChange(e, setResidue, mode)}
                margin="dense"
              />
              <TextField
                label="Descripcion"
                name="descripcion"
                required
                fullWidth
                value={descripcion}
                onChange={(e) => handleInputChange(e, setDescripcion, mode)}
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
