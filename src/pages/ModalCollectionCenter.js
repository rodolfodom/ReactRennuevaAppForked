import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/user/CreateUser.css';
import { TodoContext } from '../context/index.js';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import Title from '../components/Title';

function ModalCollectionCenter({ children, mode }) {
    const [datos, setDatos] = useState([]);
    const [groups, setGroups] = useState([])
    const [users, setUsers] = useState([])
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
    const [address_num_ext, setAddressNumExt] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [old_user, setOldUser] = useState("");
    const [razonSocial , setRazonSocial] = useState("");
    const [centerName , setCenterName] = useState("");
    const [idCenter , setIdCenter] = useState("");

    const { openModalText, setTextOpenModalText, setOpenModalText,
         openModalCreateCollectionCenter, setOpenModalCreateCollectionCenter, openModalEditCollectionCenter, 
         openModalDeleteCollectionCenter, setOpenModalEditCollectionCenter, setOpenModalDeleteCollectionCenter 
        } = useContext(TodoContext);

    const closeModal = () => {
        if (openModalCreateCollectionCenter) {
            setOpenModalCreateCollectionCenter(false);
        }
        if (openModalEditCollectionCenter) {
            setOpenModalEditCollectionCenter(false);
        }
        if (openModalDeleteCollectionCenter) {
            setOpenModalDeleteCollectionCenter(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "CREAR") {
            const nuevoDato = {
                collection_center_name : e.target.nombre.value,
                collection_center_razon_social : e.target.razon_social.value,
                collection_center_rfc : e.target.rfc.value,
                collection_center_phone : e.target.phone.value,
                collection_center_email : e.target.email.value,
                address_street : e.target.street.value,
                address_num_int : e.target.address_num_int.value,
                address_locality : e.target.locality.value,
                address_city : e.target.city.value,
                address_state : e.target.state.value,
                address_postal_code : e.target.postal_code.value,
                address_lat : 0,
                address_lng : 0,


            };

            axios
                .post('http://127.0.0.1:8000/Rennueva/create-collection-center/', nuevoDato)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    setOpenModalText(true);
                    setTextOpenModalText("Centro de Recoleccion creado correctamente")
                    e.target.reset();
                    closeModal()

                })
                .catch(error => {
                    console.error(error);
                })

        }
        if (mode === "EDITAR") {

            const editarDato = {
                collection_center_name : e.target.nombre.value,
                collection_center_razon_social : e.target.razon_social.value,
                collection_center_rfc : e.target.rfc.value,
                collection_center_phone : e.target.phone.value,
                collection_center_email : e.target.email.value,
                address_street : e.target.street.value,
                address_num_int : e.target.address_num_int.value,
                address_locality : e.target.locality.value,
                address_city : e.target.city.value,
                address_state : e.target.state.value,
                address_postal_code : e.target.postal_code.value,
                address_lat : 0,
                address_lng : 0,
                collection_center_id : idCenter,


            };
            console.log("##SDAFSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDSDFSDFSDF")
            console.log(editarDato)

            axios
                .post('http://127.0.0.1:8000/Rennueva/update-collection-center/', editarDato)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    setOpenModalText(true);
                    setTextOpenModalText("Centro Recoleccion editado correctamente")
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
                collection_center_id : idCenter,
            }

            axios
                .post('http://127.0.0.1:8000/Rennueva/delete-collection-center/', deleteDato)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    setOpenModalText(true);
                    setTextOpenModalText("Centro Recoleccion borrado correctamente")
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
        const fetchUsers = axios.get("http://127.0.0.1:8000/Rennueva/get-all-collection-center/")
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
            console.log("opcion Seleccionada")
            console.log(selectedOption)
            // Buscar el dato seleccionado en el arreglo de datos
            const datoEncontrado = users.find((users) => users.CollectionCenterName === selectedOption);
            console.log("Dato Encontrado")
            console.log(datoEncontrado)
            setCenterName(datoEncontrado.CollectionCenterName);
            setRfc(datoEncontrado.CollectionCenterRFC);
            setRazonSocial(datoEncontrado.CollectionCenterRazonSocial);
            setEmail(datoEncontrado.CollectionCenterEmail);
            setPhone(datoEncontrado.CollectionCenterPhone);
            setState(datoEncontrado.AddressState);
            setCity(datoEncontrado.AddressCity);
            setLocality(datoEncontrado.AddressLocality);
            setStreet(datoEncontrado.AddressStreet);
            setPostalCode(datoEncontrado.AddressPostalCode);
            setAddressNumInt(datoEncontrado.AddressNumInt);
            setAddressNumExt(datoEncontrado.AddressNumExt);
            setIdCenter(datoEncontrado.CollectionCenterId);
            
            // Actualizar el estado con el dato encontrado
           


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
                            <Title> Centro de Recoleccion</Title>
                            {mode === "EDITAR" || mode === "BORRAR" ? (
                                <FormControl fullWidth>
                                    <InputLabel id="user-select-label">Centro Recoleccion</InputLabel>
                                    <Select
                                        labelId="user-select-label"
                                        id="user-select"
                                        onChange={(e) => {

                                            handleSelectChange(e, setCenterName)


                                        }}
                                        required
                                        //value={user}
                                        w
                                    >
                                        {users.map((name, index) => (
                                            <MenuItem key={index} value={name.CollectionCenterName}>{name.CollectionCenterName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : null}
                        </Box>
                        <Box mt={2} mb={2} sx={{ overflowY: 'auto', maxHeight: 500 }}>
                            <TextField
                                label="Nombre Centro Recoleccion"
                                name="nombre"
                                required
                                fullWidth
                                value={centerName}
                                onChange={(e) => handleInputChange(e, setCenterName, mode)}
                                margin="dense"
                            />
                            <TextField
                                label="RFC"
                                name="rfc"
                                required
                                fullWidth
                                value={rfc}
                                onChange={(e) => handleInputChange(e, setRfc, mode)}
                                margin="dense"
                            />
                            <TextField
                                label="Razon Social"
                                name="razon_social"
                                required
                                fullWidth
                                value={razonSocial}
                                onChange={(e) => handleInputChange(e, setRazonSocial, mode)}
                                margin="dense"
                            />
                            <TextField
                                label="Email Centrto Recoleccion"
                                name="email"
                                type="email"
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail, mode)}
                                margin="dense"
                            />


                                <TextField
                                    label="Celular"
                                    name="phone"
                                    required
                                    fullWidth
                                    value={phone}
                                    onChange={(e) => handleInputChange(e, setPhone, mode)}
                                    margin="dense"
                                />
                           
                            <FormControl fullWidth mt={2} mb={2}>
                                
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
                            </FormControl>
                        </Box>

                        <Button type="submit" variant="contained" fullWidth>{mode}</Button>
                    </form>
                </Box>


            </Modal>,

            document.getElementById('modal')

        );
    }

export { ModalCollectionCenter };
