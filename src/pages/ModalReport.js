import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/user/CreateUser.css';
import { TodoContext } from '../context/index.js';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
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
                    name: name
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


    const handleInputChange = (e, setState, mode) => {
        const currentInputValue = e.target.value;

        if (mode !== "BORRAR") {
            setState(currentInputValue);
        }
    };

    return ReactDOM.createPortal(
        <Modal open={true} onClose={closeModal}>

            <Box className="ModalContent" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,

            }}>
                <Box mt={2} mb={2} sx={{ overflowY: 'auto', maxHeight: 500 }}>

                    
                    <Title>Responsiva</Title>
                    <FormControl fullWidth mt={2} mb={2}>
                        <InputLabel id="rol-select-label">Generador</InputLabel>
                        <Select
                            labelId="rol-select-label"
                            id="rol-select"
                            required
                        >
                            {nameGenerator.map((name, index) => (
                                <MenuItem key={index} value={name.name}>{name.name + " " + name.rfc}</MenuItem>
                            ))}
                        </Select>


                        



                    </FormControl>
                </Box>

            </Box>

        </Modal>

        , document.getElementById('modal')

    )

}

export { ModalReport };