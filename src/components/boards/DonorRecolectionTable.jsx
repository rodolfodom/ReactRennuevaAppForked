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

const DonorRecolectionTable = () => {
  const [clientes, setClientes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    updateDonorInfo,
    setUpdateDonorInfo,
    setOpenModalText,
    setTextOpenModalText,
  } = useContext(TodoContext);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [recolectionToEdit, setRecolectionToEdit] = useState(null);

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
                <TableCell>Estado</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Colonia</TableCell>
                <TableCell>Calle</TableCell>
                <TableCell>Codigo Postal</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Editar</TableCell>
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
                    <TableCell>{orden.estado}</TableCell>
                    <TableCell>{orden.ciudad}</TableCell>
                    <TableCell>{orden.localidad}</TableCell>
                    <TableCell>{orden.calle}</TableCell>
                    <TableCell>{orden.codigo_postal}</TableCell>
                    <TableCell
                      bgcolor={
                        orden.status === "solicitado" ? "primary" : "error"
                      }
                      sx={{
                        borderRadius: "10px", // Adjust the radius to your preference
                        padding: "1px", // Example of adjusting padding
                        marginTop: "13px", // Example of adjusting margin
                        display: "flex", // Center the content horizontally and vertically
                        justifyContent: "center", // Center the content horizontally

                        alignItems: "center", // Center the content horizontally and vertically
                        color: "black", // Text color

                        // Add more styles here
                      }}
                    >
                      {orden.status}
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
