import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Modal, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, IconButton, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

function ModalResidueReport({ onClose  , userselect, report} ) { // Asegúrate de manejar el evento de cierre adecuadamente
    const [residues, setResidues] = useState([]);
    const [entries, setEntries] = useState([{ user: userselect, report: report, residue: '', peso: '', volumen: '' }]);
    console.log("##################################################################SDFDFDSFDSFDSGHMN")
    console.log(userselect)
    console.log(report)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/Rennueva/get-all-residue/')
            .then(response => {
                const data = response.data;
                setResidues(data); // Asumiendo que 'data' es un array.
            })
            .catch(error => {
                console.error('Hubo un problema al obtener los residuos:', error);
            });
    }, []);

    

    const handleInputChange = (index, event) => {
        const values = [...entries];
        if (event.target.name === "residue") {
            values[index].residue = event.target.value;
        } else if (event.target.name === "peso") {
            values[index].peso = event.target.value;
        } else {
            values[index].volumen = event.target.value;
        }
        setEntries(values);
    };

    const handleAddFields = () => {
        console.log("###########dfdfdfdf####################################SDFDFDSFDSFDSGHMN")
        console.log(userselect)
        console.log(report)

        setEntries([...entries, {user: userselect, report: report, residue: '', peso: '', volumen: '' }]);
    };

    const handleRemoveFields = (index) => {
        const values = [...entries];
        values.splice(index, 1);
        setEntries(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar 'entries' a tu backend
        console.log('Enviando datos:', entries);
        axios
          .post('http://127.0.0.1:8000/Rennueva/create-report-residue-user/', entries)
          .then(response => {
            const data = response.data;
            console.log(data)
            // setOpenModalText(true);
            e.target.reset();
            

          })
          .catch(error => {
            console.error(error);
          })
        // Aquí deberías colocar la lógica para cerrar el modal si la operación es exitosa
        //onClose(); 
    };

    return ReactDOM.createPortal(
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 700, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2,
                }}
            >
                <Button onClick={onClose} sx={{ position: 'absolute', right: 2, top: 2 }}>
                    &times;
                </Button>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {entries.map((entry, index) => (
                            <Box key={index} display="flex" flexDirection="row" alignItems="center">
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel>Residuo</InputLabel>
                                    <Select
                                        name="residue"
                                        value={entry.residue}
                                        onChange={event => handleInputChange(index, event)}
                                    >
                                        {residues.map((residue, idx) => (
                                            <MenuItem key={idx} value={residue.nombre}>{residue.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    sx={{ m: 1 }}
                                    name="peso"
                                    label="Peso en kg"
                                    variant="outlined"
                                    type="number"
                                    value={entry.peso}
                                    onChange={event => handleInputChange(index, event)}
                                />
                                <TextField
                                    sx={{ m: 1 }}
                                    name="volumen"
                                    label="Volumen en m³"
                                    variant="outlined"
                                    type="number"
                                    value={entry.volumen}
                                    onChange={event => handleInputChange(index, event)}
                                />
                                <IconButton onClick={() => handleRemoveFields(index)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <IconButton onClick={handleAddFields}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <Button type="submit" variant="contained" fullWidth>Enviar</Button>
                    </Stack>
                </form>
            </Box>
        </Modal>,
        document.getElementById('modal')
    );
}

export { ModalResidueReport};
