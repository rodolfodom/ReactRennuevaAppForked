import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";
import { TodoContext } from "../../context";
import EditRecolectionModal from "./EditRecolectionModal";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DonorRecolectionTable = () => {
  const [clientes, setClientes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const {
    updateDonorInfo,
    setUpdateDonorInfo,
    setOpenModalText,
    setTextOpenModalText,
  } = useContext(TodoContext);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [recolectionToEdit, setRecolectionToEdit] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(true);
  }

  const handleConfirmDelete = (user, id) => {
    console.log("Borrado confirmado");
    console.log(user);
    console.log(id);

    axios
    .post(`${process.env.REACT_APP_API_URL}/delete-donor-recollection/`, {
      user: user,
      id_order: id 
    })
    .then((response) => {
      console.log(response);
      setOpen(false);
      setOpenModalText(true);
      setTextOpenModalText("Donación eliminada correctamente");
      setUpdateDonorInfo(true);


    })
    .catch((error) => {
      console.error(error);
      setOpen(false);
      setOpenModalText(true);
      setTextOpenModalText("Error al eliminar la donación");
    });


    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/get-all-donors-recollection/`)
      .then((response) => {
        console.log("Donor recolection data");
        console.log(response.data.ordenes);
        setClientes(response.data.ordenes);
        setUpdateDonorInfo(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [updateDonorInfo]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 300, minHeight: 300 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {/* Añade aquí tus encabezados de tabla */}
                <TableCell>Id</TableCell>
                <TableCell>Donador</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Peso Estimado</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((orden, index) => (
                  <TableRow key={index}>
                    {/* Añade aquí tus celdas de datos */}
                    <TableCell>{orden.id}</TableCell>
                    <TableCell>{orden.donador}</TableCell>
                    <TableCell>{orden.fecha}</TableCell>
                    <TableCell>{orden.direccion_completa}</TableCell>
                    <TableCell>{orden.peso_estimado}</TableCell>

                    <TableCell
                      bgcolor={
                        orden.status === "solicitado"
                          ? "#008000"
                          : orden.status === "pendienteRecoleccion"
                          ? "#FFA500"
                          : "#FF0000"
                      }
                      sx={{
                        borderRadius: "10px", // Adjust the radius to your preference
                        padding: "1px", // Example of adjusting padding
                        marginTop: "13px", // Example of adjusting margin
                        display: "flex", // Center the content horizontally and vertically
                        justifyContent: "center", // Center the content horizontally
                        width: "100px", // Adjust the width to your preference
                        alignItems: "center", // Center the content horizontally and vertically
                        color: "white", // Change the text color

                        // Add more styles here
                      }}
                    >
                      {orden.status === "pendienteRecoleccion"
                        ? "pendiente"
                        : orden.status}
                    </TableCell>

                    <TableCell>
                      <Button
                        color={
                          orden.status === "solicitado" ? "primary" : "error" 
                        }
                        onClick={() => {
                          setRecolectionToEdit(orden);
                          setOpenEditModal(true);
                        }}
                      >
                        <Edit />
                      </Button>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        aria-label="borrar"
                        onClick={() => handleClickOpen(11)}
                      >
                        {" "}
                        {/* Suponiendo que el ID del reporte es "1", aquí deberías pasar el ID real según tu lógica */}
                        <DeleteIcon />
                      </IconButton>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"¿Estás seguro de querer borrar?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Esta acción no se puede deshacer.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancelar</Button>
                          <Button onClick={ () => handleConfirmDelete(orden.donador, orden.id) } autoFocus>
                            {" "}
                            {/* Aquí no necesitas pasar el ID ya que se maneja a través del estado */}
                            Confirmar
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clientes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <EditRecolectionModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        recolection={recolectionToEdit}
        setMessage={setTextOpenModalText}
        setOpenMessageModal={setOpenModalText}
        update={updateDonorInfo}
        setUpdate={setUpdateDonorInfo}
      />
    </>
  );
};

export default DonorRecolectionTable;
