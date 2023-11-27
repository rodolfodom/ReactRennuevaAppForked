import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/user/CreateUser.css';
import { TodoContext } from '../../context/index.js';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import Title from '../../components/Title';

import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';




function ModalUser({ children, mode }) {
  const [datos, setDatos] = useState([""]);
  const [groups, setGroups] = useState([""])
  const [users, setUsers] = useState([""])
  const [companies, setCompanies] = useState([""])
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [group, setGroup] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [street, setStreet] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [rfc, setRfc] = useState("");
  const [phone, setPhone] = useState("");
  const [address_num_int, setAddressNumInt] = useState("");
  const [old_user, setOldUser] = useState("")
  const [razon_social, setRazonSocial] = useState("")



  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };



  const { setUpdateUserInfo, openModalText, setTextOpenModalText, setOpenModalText, openModalCreate, setOpenModalCreate, openModalEdit, openModalDelete, setOpenModalEdit, setOpenModalDelete } = useContext(TodoContext);
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
    if (mode === "CREAR") {
      var rfcValue = e.target.rfc.value
      if (!rfcValue) {
        rfcValue = 'XAXX010101000'; // Aquí puedes poner el RFC por defecto que desees
      }
      const nuevoDato = {
        user: e.target.email.value,
        password: e.target.password.value,
        email: e.target.email.value,
        first_name: e.target.nombre.value,
        last_name: e.target.apellido.value,
        group: group,
        rfcValue: rfcValue,
        company: "Rennueva",
        phone: e.target.phone.value,
        address_state: e.target.state.value,
        address_city: e.target.city.value,
        address_locality: e.target.locality.value,
        address_street: e.target.street.value,
        address_postal_code: e.target.postal_code.value,
        address_num_int: e.target.address_num_int.value,
        address_lat: 0,
        address_lng: 0,
        razon_social: e.target.razon_social.value,
      };


      axios
        .post('http://10.10.200.12:8008/Rennueva/create-django-user/', nuevoDato)
        .then(response => {
          const data = response.data;
          console.log(data)
          setOpenModalText(true);
          setTextOpenModalText("Usuario creado correctamente")
          setUpdateUserInfo(true);
          e.target.reset();
          closeModal()

        })
        .catch(error => {
          console.error(error);
        })

    }
    if (mode === "EDITAR") {

      var rfcValue = e.target.rfc.value
      if (!rfcValue) {
        rfcValue = 'XAXX010101000'; // Aquí puedes poner el RFC por defecto que desees
      }

      const editarDato = {
        user: e.target.email.value,
        //password: e.target.password.value,
        email: e.target.email.value,
        first_name: e.target.nombre.value,
        last_name: e.target.apellido.value,
        group: group,
        rfc: rfcValue,
        company: "Rennueva",
        phone: e.target.phone.value,
        address_state: e.target.state.value,
        address_city: e.target.city.value,
        address_locality: e.target.locality.value,
        address_street: e.target.street.value,
        address_postal_code: e.target.postal_code.value,
        address_num_int: e.target.address_num_int.value,
        address_lat: 0,
        address_lng: 0,
        razon_social: e.target.razon_social.value,

        antiguoUser: old_user,
      };

      console.log("##SDAFSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDSDFSDFSDF")
      console.log(editarDato)

      axios
        .put('http://10.10.200.12:8008/Rennueva/update-django-user/', editarDato)
        .then(response => {
          const data = response.data;
          console.log(data)
          setOpenModalText(true);
          setTextOpenModalText("Usuario editado correctamente")
          setUpdateUserInfo(true);
          e.target.reset();
          closeModal()
          // Limpiar los campos del formulario
        })
        .catch(error => {
          console.error(error);
        })

    }
    if (mode === "BORRAR") {
      const antiguo_user = document.getElementById("user-select")
      var user_ant = antiguo_user ? antiguo_user.value : null;

      const deleteDato = {
        user: user
      }

      axios
        .put('http://10.10.200.12:8008/Rennueva/delete-django-user/', deleteDato)
        .then(response => {
          const data = response.data;
          console.log(data)
          setOpenModalText(true);
          setTextOpenModalText("Usuario borrado correctamente")
          setUpdateUserInfo(true);
          e.target.reset();
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

    // Basado en el modo, decidir si el campo de la contraseña debe ser visible
    if (mode === 'CREAR') {
      setIsPasswordVisible(true);
    } else {
      setIsPasswordVisible(false); // Esto cubre 'editar' y 'borrar'
    }


    // Definir las peticiones pero no ejecutarlas todavía
    const fetchGroups = axios.get('http://10.10.200.12:8008/Rennueva/get-all-groups/');
    const fetchUsers = axios.post('http://10.10.200.12:8008/Rennueva/get-all-users/', { group: "Administrador" });
    const fetchCompanies = axios.get('http://10.10.200.12:8008/Rennueva/get-all-companies/');
    // Ejecutar todas las peticiones en paralelo y establecer los estados una vez que todas hayan terminado
    Promise.all([fetchGroups, fetchUsers, fetchCompanies])
      .then((responses) => {
        // 'responses' es un array que contiene las respuestas de todas las peticiones
        // en el mismo orden en que fueron añadidas en Promise.all

        const groupsData = responses[0].data;
        const usersData = responses[1].data;
        const companiesData = responses[2].data;


        setGroups(groupsData);
        setUsers(usersData);
        console.log("###################### USER FETCHED ##################################")
        console.log(usersData)

        setCompanies(companiesData);


        console.log("###################### DATA FETCHED ##################################");
      })
      .catch((errors) => {
        // Manejar errores aquí si alguna de las promesas falla
        console.error(errors);
      });
  }, []);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value; // Obtener la opción seleccionada
    console.log(selectedOption)
    // Buscar el dato seleccionado en el arreglo de datos
    const datoEncontrado = users.find((users) => users.user === selectedOption);
    console.log("DATO3333333333333333333333333333")
    console.log(datoEncontrado.razon_social)
    setUser(datoEncontrado.user);
    setPassword(datoEncontrado.password);
    setEmail(datoEncontrado.email);
    setFirstName(datoEncontrado.first_name);
    setLastName(datoEncontrado.last_name);
    setGroup(datoEncontrado.groups[0]);
    setRfc(datoEncontrado.rfc);
    setCompany("Rennueva");
    setPhone(datoEncontrado.phone);
    setState(datoEncontrado.address_state);
    setCity(datoEncontrado.address_city);
    setLocality(datoEncontrado.address_locality);
    setStreet(datoEncontrado.address_street);
    setPostalCode(datoEncontrado.address_postal_code);
    setAddressNumInt(datoEncontrado.address_num_int);
    setOldUser(selectedOption);
    setRazonSocial(datoEncontrado.razon_social)



  }

  const handleInputChange = (e, setState, mode) => {
    const currentInputValue = e.target.value;

    if (mode !== "BORRAR") {

      setState(currentInputValue);
    }
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;

    // Permitir solo números y limitar la longitud a 10 caracteres
    if (value === '' || (/^\d+$/.test(value) && value.length <= 10)) {
      setPhone(value);
    }
  };
  const handleRfcChange = (event) => {
    const value = event.target.value.toUpperCase();

    // Permitir solo letras y números y limitar la longitud a 12-13 caracteres
    if (/^[0-9A-Z]*$/.test(value) && value.length <= 13) {
      setRfc(value);
    }
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
            <Title> Usuario</Title>
            {mode === "EDITAR" || mode === "BORRAR" ? (
              <FormControl fullWidth>
                <InputLabel id="user-select-label">Usuario</InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  onChange={(e) => {

                    handleSelectChange(e, setUser)


                  }}
                  required
                  //value={user}
                  w
                >
                  {users.map((name, index) => (
                    <MenuItem key={index} value={name.user}>{name.user}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
          </Box>
          <Box mt={2} mb={2} sx={{ overflowY: 'auto', maxHeight: 500 }}>
            <TextField
              label="Nombre"
              name="nombre"
              required
              fullWidth
              value={first_name}
              onChange={(e) => handleInputChange(e, setFirstName, mode)}
              margin="dense"
            />
            <TextField
              label="Apellido"
              name="apellido"
              required
              fullWidth
              value={last_name}
              onChange={(e) => handleInputChange(e, setLastName, mode)}
              margin="dense"
            />
            <TextField
              label="RFC"
              name="rfc"
              fullWidth
              value={rfc}
              onChange={handleRfcChange}
              margin="dense"
              inputProps={{
                maxLength: 13 // Opcional: si quieres forzar la longitud máxima en el HTML
              }}
              // Validación de error para la longitud del RFC
              error={rfc.length > 0 && (rfc.length < 12 || rfc.length > 13)}
              helperText={
                rfc.length > 0 && (rfc.length < 12 || rfc.length > 13)
                  ? "El RFC debe tener entre 12 y 13 caracteres"
                  : ""
              }
            />
            <TextField
              label="Razon social"
              name="razon_social"
              required
              fullWidth
              value={razon_social}
              onChange={(e) => handleInputChange(e, setRazonSocial, mode)}
              margin="dense"
            />
            <TextField
              label="Email Usuario"
              name="email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => handleInputChange(e, setEmail, mode)}
              margin="dense"
            />

            {mode === "CREAR" ? (
              <TextField
                label="Password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                required
                fullWidth
                value={password}
                onChange={(e) => handleInputChange(e, setPassword, mode)}
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ) : null}

            <FormControl fullWidth mt={2} mb={2}>
              <InputLabel id="rol-select-label">Grupo</InputLabel>
              <Select
                labelId="rol-select-label"
                id="rol-select"
                required
                value={group}
                onChange={(e) => handleInputChange(e, setGroup, mode)}
              >
                {groups.map((name, index) => (
                  <MenuItem key={index} value={name.name}>{name.name}</MenuItem>
                ))}
              </Select>



              <TextField
                label="Celular"
                name="phone"
                required
                fullWidth
                value={phone}
                onChange={handlePhoneChange}
                margin="dense"
                inputProps={{
                  // Opcional: usar el tipo "tel" para mejor semántica y compatibilidad móvil
                  type: "tel",
                  // maxLength: 10 // Opcional: si quieres forzar la longitud máxima en el HTML
                }}
                // Para mostrar un mensaje de error si la longitud es menor a 10
                error={phone.length > 0 && phone.length < 10}
                helperText={phone.length > 0 && phone.length < 10 ? "El número debe ser de 10 dígitos" : ""}
              />
            </FormControl>


            <Title>Ubicacion</Title>
            <TextField
              label="Estado"
              name="state"
              required
              fullWidth
              value={state}
              onChange={(e) => handleInputChange(e, setState, mode)}
              margin="dense"
            />
            <TextField
              label="Ciudad"
              name="city"
              required
              fullWidth
              value={city}
              onChange={(e) => handleInputChange(e, setCity, mode)}
              margin="dense"
            />
            <TextField
              label="Colonia"
              name="locality"
              required
              fullWidth
              value={locality}
              onChange={(e) => handleInputChange(e, setLocality, mode)}
              margin="dense"
            />
            <TextField
              label="Calle "
              name="street"
              required
              fullWidth
              value={street}
              onChange={(e) => handleInputChange(e, setStreet, mode)}
              margin="dense"
            />
            <TextField
              label="Numero interior"
              name="address_num_int"
              required
              fullWidth
              value={address_num_int}
              onChange={(e) => handleInputChange(e, setAddressNumInt, mode)}
              margin="dense"
            />


            <TextField
              label="Codigo postal"
              name="postal_code"
              required
              fullWidth
              value={postal_code}
              onChange={(e) => handleInputChange(e, setPostalCode, mode)}
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

export { ModalUser };
