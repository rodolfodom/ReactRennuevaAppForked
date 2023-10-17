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

const QRCode = require('qrcode');

let qrImage;

const generateQR = async (text) => {
  try {
    console.log(text)
    qrImage = await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err);
  }
};

function loadImage(src, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    let reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', src);
  xhr.responseType = 'blob';
  xhr.send();
}

const generatePdf = () => {


  const doc = new jsPDF();

  // Use this if you have a logo to add
  //doc.addImage('src/assets/Rennueva.jpg', 'JPEG', 10, 10, 100, 100);

  // Text on the top right side
  doc.setFontSize(8);
  doc.text("Responsiva de Recepcion de Residuos", 150, 10, { align: 'left' });
  doc.text("RA-TRE-01-06-01/2020", 150, 15, { align: 'left' });
  doc.text("PM-TRE-01-06-01/2021", 150, 20, { align: 'left' });
  doc.text("NOM-161-SEMARNAT-2011", 150, 25, { align: 'left' });


  // Title before the table
  doc.setFontSize(18);
  doc.text("Datos del Generador", 14, 30);
  doc.setFontSize(12);
  doc.text("FOLIO: 29347", 110, 30, { align: 'left' });

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

    ],
    theme: 'plain',
    styles: tableStyles,
  });
  doc.setFontSize(12);
  doc.text("Domicilio del Generador", 15, 50, { align: 'left' });
  doc.autoTable({
    startY: 55,
    tableWidth: 190,
    body: [

      ['Calle:', 'Av. Residencial Chiluca', 'Número:', 'S/N'],
      ['Colonia:', 'Fraccionamiento Residencial Chiluca', 'C.P.:', '52930'],
      ['Estado:', 'Estado de México', 'Municipio:', 'Atizapán de Zaragoza'],
      ['Contacto:', 'Cecilia Montañés', 'Teléfono:', '5554146775'],
    ],
    theme: 'plain',
    styles: tableStyles,
  });

  doc.setFontSize(18);
  doc.text("Datos del Recoleccion", 14, 100);

  // Table 2: Recolection
  doc.autoTable({
    startY: 105,
    tableWidth: 190,
    body: [
      ['Recolección', 'Disposición', 'Ruta', 'Procedencia:', 'Edo Méx'],
      ['Ubicación:', 'Av. Residencial Chiluca S/N, Fraccionamiento Residencial Chiluca, Atizapán de Zaragoza'],
    ],
    theme: 'plain',
    styles: tableStyles,
  });
  doc.setFontSize(18);
  doc.text("Datos del Residuo", 14, 140);
  // Table 3: Residuos
  doc.autoTable({
    startY: 145,
    tableWidth: 190,
    body: [
      ['Tipo de Residuos', 'PET', 'Cantidad', '0.7 m³ / 12 kg'],
      ['Agricultura', 'Construcción', 'Embalaje', 'Postconsumo'],
      ['Fecha Recepción:', '17/11/2022', 'Fecha Elaboración:', '24/11/2022'],
    ],
    theme: 'plain',
    styles: tableStyles,
  });

  doc.setFontSize(10);
  doc.text("Certificacion del generador:", 90, 185, { align: 'left' });
  doc.setFontSize(8);
  doc.text("Declaro que el contenido de esta responsiva esta total y correctamente descrito ", 90, 190, { align: 'left' });
  doc.text("mediante el nombre del residui, bien clasificado y que se han previsto las con-", 90, 195, { align: "left" })
  doc.text("diciones de seguridad para su transporte de acuerdo con la legislacion vigente.", 90, 200, { align: "left" })
  doc.text("Entregado a Tecnologiaas Rennueva S.A de C.V el mismo para su reciclaje.", 90, 205, { align: "left" })


  const startY = 260;
  const signatureWidth = 80;
  const spaceBetweenSignatures = 20;

  // Añade el texto y las líneas para el Receptor
  doc.text("Nombre y Firma del Receptor:", 10, startY);
  doc.line(10, startY + 5, 10 + signatureWidth, startY + 5);  // Línea de firma para el Receptor

  // Añade el texto y las líneas para el Generador
  doc.text("Nombre y Firma del Generador:", 10 + signatureWidth + spaceBetweenSignatures, startY);
  doc.line(10 + signatureWidth + spaceBetweenSignatures, startY + 5, 10 + 2 * signatureWidth + spaceBetweenSignatures, startY + 5);  // Línea de firma para el Generador

  doc.setFontSize(5);
  doc.text("Tecnologias Rennueva S.A de C.V, Mimosas 49 bis, Colonia Santa Maria insurgentes, C.P. 06430, Cuauhtemoc, Ciudad de Mexico, Mexico ", 14, 280)
  doc.text("Tel. (55)8437 7300 y (55)8437 7272, info@rennueva.com", 14, 285);
  doc.text("Todos los datos recabados en este documento seran tratados conforme a la Ley General de Proteccion de Datos Personales", 14, 290);

  if (qrImage) {
    doc.addImage(qrImage, 'PNG', 12, 175, 65, 65);
    // Modifica 'x', 'y', 'width' y 'height' para ubicar y dimensionar el QR como desees.
  }

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
      <TableContainer sx={{ maxHeight: 300, minHeight: 300 }}>
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
                  <TableCell><StyledButton onClick={async () => {
                    await generateQR("TuTextoParaElQR");
                    generatePdf()
                  }
                  }>Reporte</StyledButton></TableCell>

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
