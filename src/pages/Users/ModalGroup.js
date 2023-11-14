import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/user/CreateUser.css';
import { TodoContext } from '../../context/index.js';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import Title from '../../components/Title';

function ModalGroup({ children, mode }) {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [old_group, setOldGroup] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [groupKey, setGroupKey] = useState("")

  const { setUpdateGroupInfo,openModalCreateGroup, setOpenModalText, setTextOpenModalText, setOpenModalCreateGroup, openModalEditGroup, setOpenModalEditGroup, openModalDeleteGroup, setOpenModalDeleteGroup } = useContext(TodoContext);

  const closeModal = () => {
    if (openModalCreateGroup) {
      setOpenModalCreateGroup(false);
    }
    if (openModalEditGroup) {
      setOpenModalEditGroup(false);
    }
    if (openModalDeleteGroup) {
      setOpenModalDeleteGroup(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoDato = {
      name: group,
      group_key: groupKey
    };

    const antiguo_user = document.getElementById("mySelect")
    var user_ant = antiguo_user ? antiguo_user.value : null;

    const editarDato = {
      name: group,
      antiguoName: old_group ? old_group : user_ant,
      group_key: groupKey
    };
    const borrarDato = {
      name: old_group ? old_group : user_ant,
    };

    if (mode === "CREAR") {
      axios
        .post('http://127.0.0.1:8000/Rennueva/create-django-group/', nuevoDato)
        .then(response => {
          const data = response.data;
          console.log(data)
          // setOpenModalText(true);
          setOpenModalText(true);
          setTextOpenModalText("Grupo creado correctamente")
          e.target.reset();
          setUpdateGroupInfo(true)
          closeModal()
          

        })
        .catch(error => {
          console.error(error);
        })
    }
    if (mode === "EDITAR") {
      axios
        .put('http://127.0.0.1:8000/Rennueva/update-django-group/', editarDato)
        .then(response => {
          const data = response.data;
          console.log(data)
          e.target.reset();
          setOpenModalText(true);
          setTextOpenModalText("Grupo editado correctamente")
          setUpdateGroupInfo(true);
          closeModal()
          // Limpiar los campos del formulario
        })
        .catch(error => {
          console.error(error);
        })
    }
    if (mode === "BORRAR") {
      axios
        .put('http://127.0.0.1:8000/Rennueva/delete-django-group/', borrarDato)
        .then(response => {
          const data = response.data;
          console.log(data)
          e.target.reset();
          setOpenModalText(true);
          setTextOpenModalText("Donador borrado correctamente")
          setUpdateGroupInfo(true)
          closeModal()

        })
        .catch(error => {
          console.error(error);
        })
    }

    // Limpiar los campos del formulario
    e.target.reset();
  };

  useEffect(() => {
    if (mode === "BORRAR") {
      setIsVisible(false)
    }
    axios
      .get('http://127.0.0.1:8000/Rennueva/get-all-groups/')
      .then(response => {
        const data = response.data;
        setGroups(data)
        console.log("######################GRUPOS##################################")
        console.log(data)

      })
      .catch(error => {
        console.error(error);
      });

  }, []);



  const handleSelectChange = (event) => {
    const selectedOption = event.target.value; // Obtener la opción seleccionada
    console.log(selectedOption)
    // Buscar el dato seleccionado en el arreglo de datos
    const datoEncontrado = groups.find((groups) => groups.name === selectedOption);
    console.log("#DFSDFSDFSDDAto encotntrado")
    setOldGroup(datoEncontrado.name)
    






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
            <Title> Grupo</Title>
            {mode === "EDITAR" || mode === "BORRAR" ? (
              <FormControl fullWidth>
                <InputLabel id="user-select-label">Grupo</InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  onChange={(e) => handleSelectChange(e, group)}
                  required
                >
                  {groups.map((name, index) => (
                    <MenuItem key={index} value={name.name}>{name.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
          </Box>
          <Box mt={2} mb={2} sx={{ overflowY: 'auto', maxHeight: 500 }}>

            <FormControl fullWidth mt={2} mb={2}>
              {isVisible ? (
                <TextField
                  label="Nombre Grupo"
                  name="name"
                  required
                  fullWidth
                  value={group}
                  onChange={(e) => handleInputChange(e, setGroup, mode)}
                  margin="dense"

                />

                
              ) : null}
            </FormControl>
            <TextField
                  label="Clave de Grupo"
                  name="name"
                  required
                  fullWidth
                  value={groupKey}
                  onChange={(e) => handleInputChange(e, setGroupKey, mode)}
                  margin="dense"

                />

          </Box>

          <Button type="submit" variant="contained" fullWidth>{mode}</Button>
        </form>
      </Box>


    </Modal>,

    document.getElementById('modal')

  );
}

export { ModalGroup };
