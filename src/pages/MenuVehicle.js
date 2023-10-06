
import React, { useState, useEffect, useContext } from "react";
import '../styles/user/MenuUser.css'
import { TodoContext } from '../context/index.js';
import { Modal } from './Users/ModalUser';
import { OptionButton } from '../components/OptionButton';
import UserTable from "../components/Table";
import CUDButtons from "../containers/CUDButtons";
import BarsChart from "../components/BarsChart";
import BarsChartVehicle from "../components/BarsChartVehicle";
import GroupTable from "../components/GroupTable";
import VehicleTable from "../components/VehicleTable";
import { ThemeProvider,createTheme, Box, Grid, Paper, Container, Toolbar, CssBaseline } from '@mui/material';

import Title from '../components/Title';


function MenuVehicle() {

  const defaultTheme = createTheme();
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

  return (
    <ThemeProvider theme={defaultTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Title>Vehiculos</Title>
                <CUDButtons model="Vehicle" />
                <VehicleTable />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 580,  // Ajusta la altura según tu necesidad
                }}
              >
                <BarsChartVehicle />
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Tus modales aquí... */}
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

export { MenuVehicle };
