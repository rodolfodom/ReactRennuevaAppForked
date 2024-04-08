import { createPortal } from "react-dom";
import Title from "../Title";
import { Modal, Box, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditRecolectionModal({ open, setOpen, recolection }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(recolection);
        const reformattedDate = e.target.date.value.split('/').reverse().join('-')
        const data = {
            user: recolection.donador,
            id_order: recolection.id,
            status: e.target.status.value,
            fecha_estimada_recoleccion: reformattedDate
        }
        console.log(data);
        axios.post(`${process.env.REACT_APP_API_URL}/change-recollection-pendiente/`, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    
    return (createPortal(
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            

        >
            <Box sx={style}>
                <Title>Editar Recolección</Title>
                <form onSubmit={
                    handleSubmit
                }>
                    <FormControl fullWidth>
                        <InputLabel id="recolection-status">Estado</InputLabel>
                        <Select
                            name="status"
                            labelId="select-status"
                            id="select-status"
                            label="Estado"
                            margin="dense"
                            required
                        >
                            <MenuItem value="solicitado">Socitado</MenuItem>
                            <MenuItem value="pendiente a recoleccion">Pendiente a recolección</MenuItem>
                            <MenuItem value="recolectado">Recolectado</MenuItem>
                        </Select>

                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        format="DD/MM/YYYY"    
                        slotProps={{
                            field: {
                                margin: 'dense',
                                fullWidth: 'true',
                                required: 'true',
                                name: 'date',
                            },
                            textField:{
                                name: 'date',
                            }
                        }}
                        />
                    </LocalizationProvider>
                    <Button fullWidth color="success" variant="contained" type="submit" >Guardar cambios</Button>
                </form>
            </Box>

        </Modal>

        , document.getElementById('modal')
    ))
}