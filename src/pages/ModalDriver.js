import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/user/CreateUser.css';
import { TodoContext } from '../context/index.js';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import Title from '../components/Title';

function ModalDriver({ children, mode }) {
    const [datos, setDatos] = useState([]);
    const [groups, setGroups] = useState([])
    const [users, setUsers] = useState([])
    const [companies, setCompanies] = useState([""])
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [license, setLicense] = useState("");
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
    const [address_num_ext, setAddressNumExt] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [old_user, setOldUser] = useState("");

    const {setUpdateDriverInfo, openModalText, setTextOpenModalText, setOpenModalText, openModalCreateDriver, setOpenModalCreateDriver, openModalEditDriver, openModalDeleteDriver, setOpenModalEditDriver, setOpenModalDeleteDriver } = useContext(TodoContext);
    const closeModal = () => {
        if (openModalCreateDriver) {
            setOpenModalCreateDriver(false);
        }
        if (openModalEditDriver) {
            setOpenModalEditDriver(false);
        }
        if (openModalDeleteDriver) {
            setOpenModalDeleteDriver(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "CREAR") {
            const nuevoDato = {
                user: e.target.email.value,
                password: e.target.password.value,
                email: e.target.email.value,
                first_name: e.target.nombre.value,
                last_name: e.target.apellido.value,
                phone: e.target.phone.value,
                license: e.target.license.value,
              
            };

            axios
                .post('http://127.0.0.1:8000/Rennueva/create-driver/', nuevoDato)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    setOpenModalText(true);
                    setTextOpenModalText("Conductor creado correctamente")
                    setUpdateDriverInfo(true);
                    e.target.reset();
                    closeModal()

                })
                .catch(error => {
                    console.error(error);
                })

        }
        if (mode === "EDITAR") {

            const editarDato = {
                user: e.target.email.value,
                
                email: e.target.email.value,
                first_name: e.target.nombre.value,
                last_name: e.target.apellido.value,
                phone: e.target.phone.value,
                license: e.target.license.value,
                

                old_license: old_user,
            };
            console.log("##SDAFSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDSDFSDFSDF")
            console.log(editarDato)

            axios
                .put('http://127.0.0.1:8000/Rennueva/update-driver/', editarDato)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    setOpenModalText(true);
                    setTextOpenModalText("Donador editado correctamente")
                    setUpdateDriverInfo(true);
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
                license: old_user
            }

            axios
                .post('http://127.0.0.1:8000/Rennueva/delete-driver/', deleteDato)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    setOpenModalText(true);
                    setTextOpenModalText("Donador borrado correctamente")
                    setUpdateDriverInfo(true);
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

        axios
            .get('http://127.0.0.1:8000/Rennueva/get-all-drivers/')
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
        const fetchUsers = axios.get('http://127.0.0.1:8000/Rennueva/get-all-drivers/')
        const fetchCompanies = axios.get('http://127.0.0.1:8000/Rennueva/get-all-companies/');

        Promise.all([fetchUsers, fetchCompanies])
            .then((res) => {
                const usersData = res[0].data;
                const companiesData = res[1].data;
                setUsers(usersData);
                setCompanies(companiesData);
                console.log("######################USUARIOS##################################")
            })
            .catch((err) => console.log(err));
                
            }, []);

        const handleSelectChange = (event) => {
            const selectedOption = event.target.value; // Obtener la opción seleccionada
            console.log(selectedOption)
            // Buscar el dato seleccionado en el arreglo de datos
            const datoEncontrado = users.find((users) => users.license === selectedOption);
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
            setLicense(datoEncontrado.license);
            
            setOldUser(selectedOption);



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
                            <Title> Conductores</Title>
                            {mode === "EDITAR" || mode === "BORRAR" ? (
                                <FormControl fullWidth>
                                    <InputLabel id="user-select-label">Conductor</InputLabel>
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
                                            <MenuItem key={index} value={name.license}>{name.license}</MenuItem>
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
                                label="Email Usuario"
                                name="email"
                                type="email"
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail, mode)}
                                margin="dense"
                            />
                            {
                                isPasswordVisible && (
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        required
                                        fullWidth
                                        value={password}
                                        onChange={(e) => handleInputChange(e, setPassword, mode)}
                                        margin="dense"
                                    />
                                )
                            }

                            <FormControl fullWidth mt={2} mb={2}>
                                <TextField
                                    label="Celular"
                                    name="phone"
                                    required
                                    fullWidth
                                    value={phone}
                                    onChange={(e) => handleInputChange(e, setPhone, mode)}
                                    margin="dense"
                                />
                                <TextField
                                    label="Licencia"
                                    name="license"
                                    required
                                    fullWidth
                                    value={license}
                                    onChange={(e) => handleInputChange(e, setLicense, mode)}
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

export { ModalDriver };
