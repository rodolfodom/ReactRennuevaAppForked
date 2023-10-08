import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination 
} from '@mui/material';

const GeneratorTable = () => {
    const [clientes, setClientes] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/Rennueva/get-all-generator/')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 300 , minHeight : 300 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {/* Añade aquí tus encabezados de tabla */}
                <TableCell>Nombre</TableCell>
                <TableCell>Razon Social</TableCell>
                <TableCell>RFC</TableCell>
                <TableCell>Calle</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Codigo Postal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cliente, index) => (
                  <TableRow key={index}>
                    {/* Añade aquí tus celdas de datos */}
                    <TableCell>{cliente.nombre}</TableCell>
                    <TableCell>{cliente.razonSocial}</TableCell>
                    <TableCell>{cliente.rfc}</TableCell>
                    <TableCell>{cliente.calle}</TableCell>
                    <TableCell>{cliente.celular}</TableCell>
                    <TableCell>{cliente.correo}</TableCell>
                    <TableCell>{cliente.direccion}</TableCell>
                    <TableCell>{cliente.ciudad}</TableCell>
                    <TableCell>{cliente.estado}</TableCell>
                    <TableCell>{cliente.codigoPostal}</TableCell>
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
    );
}

export default GeneratorTable;
