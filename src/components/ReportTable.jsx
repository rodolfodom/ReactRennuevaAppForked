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
  TablePagination, 
  Button
} from '@mui/material';

import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ReportTable = () => {
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
            <TableHead >
              <TableRow sx={{ backgroundColor: 'primary.main', color: 'background.paper' }} >
                {/* Añade aquí tus encabezados de tabla */}
                <TableCell>ID Reporte</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>RFC</TableCell>
                <TableCell>Calle</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Codigo Postal</TableCell>
                <TableCell>Procedencia</TableCell>
                <TableCell>Residuo</TableCell>
                <TableCell>Fecha inicio</TableCell>
                <TableCell>Fecha fin</TableCell>
                <TableCell>Reporte</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cliente, index) => (
                  <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'action.hover' : 'background.paper' }}
                >
                    {/* Añade aquí tus celdas de datos */}
                    <TableCell>id</TableCell>
                    <TableCell>nobre</TableCell>
                    <TableCell>rfc</TableCell>
                    <TableCell>calle</TableCell>
                    <TableCell>celular</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>direccion</TableCell>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Codigo Postar</TableCell>
                    <TableCell><StyledButton>Procedencia</StyledButton></TableCell>
                <TableCell><StyledButton>Residuo</StyledButton></TableCell>
                <TableCell>Fecha inicio</TableCell>
                <TableCell>Fecha fin</TableCell>
                <TableCell><StyledButton>Reporte</StyledButton></TableCell>
              
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

export default ReportTable;
