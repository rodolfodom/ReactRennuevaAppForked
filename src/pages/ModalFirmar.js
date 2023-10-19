import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/user/CreateUser.css';
import { TodoContext } from '../context/index.js';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import Title from '../components/Title';
import Grid from '@mui/material/Grid';
import SignatureComponent from "../components/FirmaDocument";

function ModalFirmar({ children, mode }) {
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
               <Box>
                <SignatureComponent />
              </Box>
              </Box>

        </Modal>

        , document.getElementById('modal')

    )

}

export { ModalFirmar };