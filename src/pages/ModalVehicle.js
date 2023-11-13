import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/user/CreateUser.css';
import { TodoContext } from '../context/index.js';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import Title from '../components/Title';

function ModalVehicle({ children, mode }) {
  const [vehicles, setVehicles] = useState([]);
  const [residue, setVehicle] = useState("");
  const [oldVehicle, setOldVehicle] = useState("");
  const [descripcion, setDescripcion] = useState("");

    const [nombre, setNombre] = useState("");
    const [placas, setPlacas] = useState("");
    const [capacidad, setCapacidad] = useState("");



  const {  setUpdateVehicleInfo ,openModalCreateVehicle, setOpenModalText, setTextOpenModalText, setOpenModalCreateVehicle, openModalEditVehicle, setOpenModalEditVehicle, openModalDeleteVehicle, setOpenModalDeleteVehicle } = useContext(TodoContext);

  const closeModal = () => {
    if (openModalCreateVehicle) {
      setOpenModalCreateVehicle(false);
    }
    if (openModalEditVehicle) {
      setOpenModalEditVehicle(false);
    }
    if (openModalDeleteVehicle) {
      setOpenModalDeleteVehicle(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();



    const nuevoDato = {
      modelo: e.target.nombre.value,
      placas: e.target.placas.value,
      capacidad: e.target.capacidad.value,
    };
    const editarDato = {
        modelo: e.target.nombre.value,
        placas: e.target.placas.value,
        capacidad: e.target.capacidad.value,
        antiguasPlacas: oldVehicle
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
        .post('http://127.0.0.1:8000/Rennueva/create-vehicle/', nuevoDato)
        .then(response => {
          const data = response.data;
          console.log(data)
          setOpenModalText(true);
          setTextOpenModalText("Vehiculo creado correctamente")
          setUpdateVehicleInfo(true)
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
        .put('http://127.0.0.1:8000/Rennueva/update-vehicle/', editarDato)
        .then(response => {
          const data = response.data;
          console.log(data)
          setOpenModalText(true);
          setTextOpenModalText("Vehiculo editado correctamente")
          setUpdateVehicleInfo(true)
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
        .post('http://127.0.0.1:8000/Rennueva/delete-vehicle/', { placas: oldVehicle})
        .then(response => {
          const data = response.data;
          console.log(data)
          setOpenModalText(true);
          setTextOpenModalText("Vehiculo borrado correctamente")
          setUpdateVehicleInfo(true)
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
      .get('http://127.0.0.1:8000/Rennueva/get-all-vehicle/')
      .then(response => {
        const data = response.data;
        setVehicles(data)
        console.log("######################GRUPOS##################################")

      })
      .catch(error => {
        console.error(error);
      });

  }, []);


  const handleSelectChange = (event) => {
    const selectedOption = event.target.value; // Obtener la opción seleccionada
    console.log(selectedOption)
    setOldVehicle(selectedOption)
    // Buscar el dato seleccionado en el arreglo de datos
    const datoEncontrado = vehicles.find((vehicles) => vehicles.placas === selectedOption);
    console.log("dato encontrado")
    console.log(datoEncontrado)

    setNombre(datoEncontrado.modelo);
    setPlacas(datoEncontrado.placas);
    setCapacidad(datoEncontrado.capacidad);



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
            <Title> Vehiculos</Title>
            {mode === "EDITAR" || mode === "BORRAR" ? (
              <FormControl fullWidth>
                <InputLabel id="vehicle-select-label">Vehiculo</InputLabel>
                <Select
                  labelId="vehicle-select-label"
                  id="vehicle-select"
                  onChange={(e) => handleSelectChange(e, oldVehicle)}
                  required
                >
                  {vehicles.map((name, index) => (
                    <MenuItem key={index} value={name.placas}>{name.placas}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
          </Box>
          <Box mt={2} mb={2} sx={{ overflowY: 'auto', maxHeight: 500 }}>

            <FormControl fullWidth mt={2} mb={2}>

              <TextField
                label="Modelo del Vehiculo"
                name="nombre"
                required
                fullWidth
                value={nombre}
                onChange={(e) => handleInputChange(e, setNombre, mode)}
                margin="dense"
              />
              <TextField
                label="Placas del Vehiculo"
                name="placas"
                required
                fullWidth
                value={placas}
                onChange={(e) => handleInputChange(e, setPlacas, mode)}
                margin="dense"
              />
              <TextField
                label="Capacidad del Vehiculo"
                name="capacidad"
                required
                fullWidth
                value={capacidad}
                onChange={(e) => handleInputChange(e, setCapacidad, mode)}
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

export { ModalVehicle };
