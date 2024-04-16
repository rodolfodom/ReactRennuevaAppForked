import { createPortal } from "react-dom";
import Title from "../Title";
import { Modal, Box, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import { useEffect, useState } from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
}

export default function EditRecolectionModal({ open, setOpen, recolection, setMessage, setOpenMessageModal }) {
    const [isDateCorrect, setIsDateCorrect] = useState(false)
    const [status, setStatus] = useState("")


    useEffect(() => {
        if (recolection != null) {
            setStatus(recolection.status)
        }else{
            setStatus("")
        }
    }, [recolection])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isDateCorrect) return
        if(status === "pendienteRecoleccion"){
        const reformattedDate = e.target.date.value.split('/').reverse().join('-')
        const data = {
            user: recolection.donador,
            id_order: recolection.id,
            fecha_estimada_recoleccion: reformattedDate
        }
        console.log(data);
        axios.post(`${process.env.REACT_APP_API_URL}/change-recollection-pendiente/`, data)
            .then((response) => {
                console.log(response);
                setMessage('Se ha actualizado la fecha de recolección y el estado de la solicitud')
                setOpenMessageModal(true)
                setOpen(false)
            })
            .catch((error) => {
                console.error(error);
                setMessage('Ha ocurrido un error al actualizar la fecha de recolección')
                setOpenMessageModal(true)
            })
        }
    }

    return (createPortal(
        <Modal
            open={open}
            onClose={() => setOpen(false)}

        >
            <Box sx={style}>
                <Button
                    onClick={() => setOpen(false)}
                    sx={{ position: "absolute", right: 2, top: 2 }}
                >
                    &times;
                </Button>
                <Title>Editar Recolección</Title>
                <form onSubmit={
                    handleSubmit
                }>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Estado"
                                onChange={(e) => {
                                    
                                    setStatus(e.target.value)
                                }}
                            >
                                <MenuItem value="solicitado">Solicitada</MenuItem>
                                <MenuItem value="pendienteRecoleccion">Recolección pendiente</MenuItem>
                                <MenuItem value="recolectada">Recolectada</MenuItem>
                            </Select>
                        </FormControl>
                        
                        {status === "pendienteRecoleccion" && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disablePast
                                format="DD/MM/YYYY"
                                onAccept={(date) => {
                                    setIsDateCorrect(true)
                                }}
                                onError={(reason, value) => {
                                    if (reason === null) {
                                        setIsDateCorrect(true)
                                    } else {
                                        setIsDateCorrect(false)
                                    }
                                }}
                                slotProps={{
                                    field: {
                                        margin: 'dense',
                                        fullWidth: 'true',
                                        required: 'true',
                                        name: 'date',
                                    },
                                    textField: {
                                        label: 'Fecha de recolección',
                                        name: 'date',
                                    }
                                }}
                            />
                        </LocalizationProvider>
                        )}
                        {status === "pendienteRecoleccion" && (
                            <Button fullWidth color="success" variant="contained" type="submit" disabled={!isDateCorrect || !status}>Guardar cambios</Button>
                        )}

                        {status !== "pendienteRecoleccion" && (
                            <Button fullWidth color="success" variant="contained" type="submit" disabled={!status}>Guardar cambios</Button>
                        )}
                        
                </form>
            </Box>

        </Modal>

        , document.getElementById('modal')
    ))
}