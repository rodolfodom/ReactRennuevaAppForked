import React, { useState, useEffect } from 'react';
import '../styles/Table.css';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';


const GroupTable = ({ datos }) => {
  const [clientes, setClientes] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
    // Realiza una petición GET a una URL específica
    axios
      .get('http://127.0.0.1:8000/Rennueva/get-all-vehicle/')
      .then(response => {
        const data = response.data;
        setClientes(data);


      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 300, minHeight: 300 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Modelo</TableCell>
              <TableCell>Placas</TableCell>
              <TableCell>Capacidad</TableCell>
              <TableCell>Conductor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cliente, index) => (
                <TableRow key={index}>
                  <TableCell>{cliente.modelo}</TableCell>
                  <TableCell>{cliente.placas}</TableCell>
                  <TableCell>{cliente.capacidad}</TableCell>
                  <TableCell>{cliente.conductor}</TableCell>
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

export default GroupTable;
