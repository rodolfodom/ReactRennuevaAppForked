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


import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


  const exampleData = [
    { id: 1, name: "John", age: 28 },
    { id: 2, name: "Anna", age: 22 },
    { id: 3, name: "Mike", age: 32 }
  ];

  const generatePdf = () => {
    const doc = new jsPDF();

    // Use this if you have a logo to add
    // doc.addImage(imgData, 'JPEG', x, y, width, height);
    
    // Text on the top right side
    doc.setFontSize(8);
    doc.text("Responsiva de Recepcion de Residuos", 150, 10, { align: 'left' });
    doc.text("RA-TRE-01-06-01/2020", 150, 15, { align: 'left' });
    doc.text("PM-TRE-01-06-01/2021", 150, 20, { align: 'left' });
    doc.text("NOM-161-SEMARNAT-2011", 150, 25, { align: 'left' });
  
    // Title before the table
    doc.setFontSize(18);
    doc.text("Datos del Generador", 14, 30);

    const tableStyles = {
      cellPadding: 2,
      fontSize: 10,
      lineColor: [0, 0, 0], 
      lineWidth: 0.5
    };

    // Table 1: Datos del Generador
    doc.autoTable({
      startY: 35, 
      tableWidth: 190,
      body: [
        ['RFC:', 'ACR857025922', 'Razón Social:', 'Asociación de Colonos de Residencial Chiluca A.C.'],
        ['Domicilio', '', '', ''],
        ['Calle:', 'Av. Residencial Chiluca', 'Número:', 'S/N'],
        ['Colonia:', 'Fraccionamiento Residencial Chiluca', 'C.P.:', '52930'],
        ['Estado:', 'Estado de México', 'Municipio:', 'Atizapán de Zaragoza'],
        ['Contacto:', 'Cecilia Montañés', 'Teléfono:', '5554146775'],
      ],
      theme: 'plain',
      styles: tableStyles,
    });


    

    // Table 2: Recolection
    doc.autoTable({
      startY: 95, 
      tableWidth: 190,
      body: [
        ['Recolección', 'Disposición', 'Ruta', 'Procedencia:', 'Edo Méx'],
        ['Ubicación:', 'Av. Residencial Chiluca S/N, Fraccionamiento Residencial Chiluca, Atizapán de Zaragoza'],
      ],
      theme: 'plain',
      styles: tableStyles,
    });

    // Table 3: Residuos
    doc.autoTable({
      startY: 125, 
      tableWidth: 190,
      body: [
        ['Tipo de Residuos', 'PET', 'Cantidad', '0.7 m³ / 12 kg'],
        ['Agricultura', 'Construcción', 'Embalaje', 'Postconsumo'],
        ['Fecha Recepción:', '17/11/2022', 'Fecha Elaboración:', '24/11/2022'],
      ],
      theme: 'plain',
      styles: tableStyles,
    });

    doc.save('Responsiva.pdf');
};






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
                <TableCell><StyledButton onClick={generatePdf}>Reporte</StyledButton></TableCell>
              
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
