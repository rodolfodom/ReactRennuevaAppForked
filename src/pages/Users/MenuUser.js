
import React, { useState, useEffect, useContext } from "react";
import '../../styles/user/MenuUser.css'
import { TodoContext } from '../../context/index.js';
import { Modal } from './ModalUser.js';
import { OptionButton } from '../../components/OptionButton';
import UserTable from "../../components/Table";
import CUDButtons from "../../containers/CUDButtons";
import BarsChart from "../../components/BarsChart";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Chart from '../../components/Chart';
import Title from '../../components/Title';

function MenuUser() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const defaultTheme = createTheme();
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const handleAdd = () => {
    // Lógica para agregar
    console.log("Agregando")

  };

  const handleUpdate = () => {
    console.log("Actualizando")
  };

  const handleDelete = () => {
    // Lógica para eliminar
    console.log("Eliminando")
  };
  const [datos, setDatos] = useState([]);
  const { totalListlUsers, openModalCreate, setOpenModalCreate, setOpenModalEdit,
    openModalEdit, setOpenModalDelete, openModalDelete } = useContext(TodoContext);

  useEffect(() => {

    setDatos(totalListlUsers);
  }, []);

  function preventDefault(event) {
    event.preventDefault();
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.grey[100],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="xl">
            <Grid container spacing={3}>

              <Grid item xs={6}>

                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  
                  <CUDButtons model="User" />
                  <Title>Usuarios Creados</Title>
                  <UserTable />
                 
                  
                </Paper>




              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 560,
                  }}
                >
                  <BarsChart />
                  
                </Paper>
                
              </Grid>
            </Grid>
          </Container>

          {openModalCreate && (
            <Modal mode={"CREAR"}>
              La funcionalidad de agregar TODO
            </Modal>
          )}
          {openModalEdit && (
            <Modal mode={"EDITAR"}>
              La funcionalidad de editar TODO
            </Modal>
          )}
          {openModalDelete && (
            <Modal mode={"BORRAR"}>
              La funcionalidad de borrar TODO
            </Modal>
          )}

        </Box>
      </Box>
    </ThemeProvider>
  );
}


export { MenuUser };
