import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/user/CreateUser.css';
import { TodoContext } from '../context/index.js';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel, Grid } from '@mui/material';
import Title from '../components/Title';

function ModalReport({ children, mode }) {
    const [datos, setDatos] = useState([]);
    const [groups, setGroups] = useState([])
    const [users, setUsers] = useState([])
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
    const [nameGenerator, setNameGenerator] = useState([]);
    const { openModalCreateReport, setOpenModalCreateReport, openModalEditReport, setOpenModalEditReport, openModalDeleteReport, setOpenModalDeleteReport } = useContext(TodoContext);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/Rennueva/get-all-generator/')
            .then(response => {
                const data = response.data;

                var nameGenerator = data.map(function (item) {
                    var name = item.first_name + " " + item.last_name;
                    return {
                        rfc: item.rfc,
                        user: item.user,
                        name: name,
                        email: item.email,
                        first_name: item.first_name,
                        last_name: item.last_name,
                        company: item.company,
                        address_street: item.address_street,
                        address_locality: item.address_locality,
                        address_city: item.address_city,
                        address_state: item.address_state,
                        address_postal_code: item.address_postal_code,

                    };

                });
                setNameGenerator(nameGenerator);
                console.log(nameGenerator);


            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    const closeModal = () => {
        if (openModalCreateReport) {
            setOpenModalCreateReport(false);
        }
        if (openModalEditReport) {
            setOpenModalEditReport(false);
        }
        if (openModalDeleteReport) {
            setOpenModalDeleteReport(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "CREAR") {
            console.log("CREAR")
            console.log(user)
            axios
                .post('http://127.0.0.1:8000/Rennueva/create-initial-report/', {
                    username : user,
                }) 
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };


    
    const handleInputChange = (e, setState, mode) => {
        const currentInputValue = e.target.value;

        if (mode !== "BORRAR") {
            setState(currentInputValue);
        }
    };

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value; // Obtener la opción seleccionada
        console.log(selectedOption)
        console.log("NAme Generador")
        console.log(nameGenerator)
        // Buscar el dato seleccionado en el arreglo de datos
        const datoEncontrado = nameGenerator.find((users) => users.name  === selectedOption);
        console.log(datoEncontrado)
        setUser(datoEncontrado.user);
        setPassword(datoEncontrado.password);
        setEmail(datoEncontrado.email);
        setFirstName(datoEncontrado.first_name);
        setLastName(datoEncontrado.last_name);
        setGroup(datoEncontrado.group);
        setRfc(datoEncontrado.rfc);
        setCompany(datoEncontrado.company);
        setPhone(datoEncontrado.phone);
        setState(datoEncontrado.address_state);
        setCity(datoEncontrado.address_city);
        setLocality(datoEncontrado.address_locality);
        setStreet(datoEncontrado.address_street);
        setPostalCode(datoEncontrado.address_postal_code);



    }

    

    return ReactDOM.createPortal(
        <Modal open={true} onClose={closeModal}>

            <Box className="ModalContent" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 1100,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,

            }}>
                <Button onClick={closeModal} sx={{ position: 'absolute', right: 2, top: 2 }}>&times;</Button>
                <form onSubmit={handleSubmit} >
                <Box mt={2} mb={2} sx={{ overflowY: 'auto', maxHeight: 600 }}>

                    <Box mb={2}>
                        <Title>Crear Responsiva</Title>
                        <FormControl fullWidth mt={2} mb={2}>
                            <InputLabel id="rol-select-label">Generador</InputLabel>
                            <Select
                                labelId="rol-select-label"
                                id="rol-select"
                                required
                                onChange={(e) => handleSelectChange(e, setUser)}
                            >
                                {nameGenerator.map((name, index) => (
                                    <MenuItem key={index} value={name.name}>{name.name + " " + name.rfc}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mt={2} mb={2} sx={{ overflowY: 'auto', maxHeight: 500 }}>

                        <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>
                            
                            <TextField
                                label="Nombre"
                                name="nombre"
                                required
                                fullWidth
                                value={first_name}
                                onChange={(e) => handleInputChange(e, setFirstName, mode)}
                                margin="dense"
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                label="Apellido"
                                name="apellido"
                                required
                                fullWidth
                                value={last_name}
                                onChange={(e) => handleInputChange(e, setLastName, mode)}
                                margin="dense"
                            />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                            <TextField
                                label="RFC"
                                name="rfc"
                                required
                                fullWidth
                                value={rfc}
                                onChange={(e) => handleInputChange(e, setRfc, mode)}
                                margin="dense"
                            />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                            <TextField
                                label="Nombre de Usuario"
                                name="user"
                                required
                                fullWidth
                                value={user}
                                onChange={(e) => handleInputChange(e, setUser, mode)}
                                margin="dense"
                            />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail, mode)}
                                margin="dense"
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Compañia"
                                    name="company"
                                    required
                                    fullWidth
                                    value={company}
                                    margin="dense"
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Celular"
                                    name="phone"
                                    required
                                    fullWidth
                                    value={phone}


                                    margin="dense"
                                />
                            </Grid> */}
                            <Grid item xs={12} sm={12}>
                                <Title>Ubicacion</Title>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Estado"
                                    name="state"
                                    required
                                    fullWidth
                                    value={state}

                                    margin="dense"
                                />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Ciudad"
                                    name="city"
                                    required
                                    fullWidth
                                    value={city}

                                    margin="dense"
                                />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Colonia"
                                    name="locality"
                                    required
                                    fullWidth
                                    value={locality}

                                    margin="dense"
                                />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Calle y Numero"
                                    name="street"
                                    required
                                    fullWidth
                                    value={street}

                                    margin="dense"
                                />
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                <TextField
                                    label="Codigo postal"
                                    name="postal_code"
                                    required
                                    fullWidth
                                    value={postal_code}

                                    margin="dense"
                                />
                                </Grid>


                            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button type="submit" variant="contained" sx={{ width: '500px' }} >{mode}</Button>
                            </Grid>
                           
                        </Grid>
                    </Box>






                </Box>
                </form>

            </Box>

        </Modal>

        , document.getElementById('modal')

    )

}

export { ModalReport };