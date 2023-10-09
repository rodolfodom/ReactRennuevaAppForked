import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/user/CreateUser.css';
import { TodoContext } from '../../context/index.js';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';

function ModalUser({ children, mode }) {
  console.log("#######################MODEMODEMDEO")
  console.log(mode);
  const [datos, setDatos] = useState([]);
  const [groups, setGroups] = useState([])
  const [users, setUsers] = useState([])

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");





  const { openModalCreate, setOpenModalCreate, openModalEdit, openModalDelete, setOpenModalEdit, setOpenModalDelete } = useContext(TodoContext);
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

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/Rennueva/get-all-groups/')
      .then(response => {
        const data = response.data;
        setGroups(data)
        console.log("######################GRUPOS##################################")





      })
      .catch(error => {
        console.error(error);
      });

  }, []);


  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/Rennueva/get-all-users/')
      .then(response => {
        const data = response.data;
        setUsers(data)
        console.log("######################GRUPOS##################################")





      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value; // Obtener la opción seleccionada
    console.log(selectedOption)
    // Buscar el dato seleccionado en el arreglo de datos
    const datoEncontrado = users.find((users) => users.user === selectedOption);
    console.log(datoEncontrado)
    setUser(datoEncontrado.user);
    setPassword(datoEncontrado.password);
    setEmail(datoEncontrado.email);
    setFirstName(datoEncontrado.first_name);
    setLastName(datoEncontrado.last_name);


  }


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
            {mode === "EDITAR" || mode === "BORRAR" ? (
              <FormControl fullWidth>
                <InputLabel id="user-select-label">Usuario</InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  onChange={handleSelectChange}
                  required
                >
                  {users.map((name, index) => (
                    <MenuItem key={index} value={name.user}>{name.user}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
          </Box>
          <Box mt={2} mb={2} sx={{overflowY: 'auto', maxHeight : 500}}>
          <TextField 
            label="Nombre" 
            name="nombre" 
            required 
            fullWidth 
            value={first_name} 
            onChange={(e) => setFirstName(e.target.value)}
            margin="dense"
          />
          <TextField 
            label="Apellido" 
            name="apellido" 
            required 
            fullWidth 
            value={last_name} 
            onChange={(e) => setLastName(e.target.value)}
            margin="dense"
          />
          <TextField 
            label="Nombre de Usuario" 
            name="user" 
            required 
            fullWidth 
            value={user} 
            onChange={(e) => setUser(e.target.value)}
            margin="dense"
          />
          <TextField 
            label="Email" 
            name="email" 
            type="email" 
            required 
            fullWidth 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            margin="dense"
          />
          <TextField 
            label="Password" 
            name="password" 
            type="password" 
            required 
            fullWidth 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
          />
          <FormControl fullWidth mt={2} mb={2}>
            <InputLabel id="rol-select-label">Rol</InputLabel>
            <Select
              labelId="rol-select-label"
              id="rol-select"
              required
            >
              {groups.map((name, index) => (
                <MenuItem key={index} value={name.name}>{name.name}</MenuItem>
              ))}
            </Select>

            
            <TextField 
            label="Nombre de Usuario" 
            name="user" 
            required 
            fullWidth 
            value={user} 
            onChange={(e) => setUser(e.target.value)}
            margin="dense"
          />
          <TextField 
            label="Nombre de Usuario" 
            name="user" 
            required 
            fullWidth 
            value={user} 
            onChange={(e) => setUser(e.target.value)}
            margin="dense"
          />
          <TextField 
            label="Nombre de Usuario" 
            name="user" 
            required 
            fullWidth 
            value={user} 
            onChange={(e) => setUser(e.target.value)}
            margin="dense"
          />
          <TextField 
            label="Nombre de Usuario" 
            name="user" 
            required 
            fullWidth 
            value={user} 
            onChange={(e) => setUser(e.target.value)}
            margin="dense"
          />
          <TextField 
            label="Nombre de Usuario" 
            name="user" 
            required 
            fullWidth 
            value={user} 
            onChange={(e) => setUser(e.target.value)}
            margin="dense"
          />
          <TextField 
            label="Nombre de Usuario" 
            name="user" 
            required 
            fullWidth 
            value={user} 
            onChange={(e) => setUser(e.target.value)}
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

export { ModalUser };
