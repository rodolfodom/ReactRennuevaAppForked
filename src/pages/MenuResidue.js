import React, { useContext } from "react";
import '../styles/user/MenuUser.css';
import { TodoContext } from '../context/index.js';
import { ModalUser } from './Users/ModalUser';
import ResidueTable from "../components/ResidueTable";
import BarsChartVehicle from "../components/BarsChartVehicle";
import CUDButtons from "../containers/CUDButtons";

import { ThemeProvider, createTheme, Box, Grid, Paper, Container, Toolbar, CssBaseline } from '@mui/material';
import Title from '../components/Title';

function MenuResidue() {
  const {
    openModalCreate,
    setOpenModalCreate,
    setOpenModalEdit,
    openModalEdit,
    setOpenModalDelete,
    openModalDelete
  } = useContext(TodoContext);

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
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
                  <Title>Residuos</Title>
                  <CUDButtons model="Residue" />
                  <Title>Tabla de Residuos</Title>
                  <ResidueTable />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 580,
                  }}
                >
                  <BarsChartVehicle />
                </Paper>
              </Grid>
            </Grid>
          </Container>

          {openModalCreate && (
            <ModalUser mode={"CREAR"}>
              La funcionalidad de agregar TODO
            </ ModalUser >
          )}
          {openModalEdit && (
            <ModalUser mode={"EDITAR"}>
              La funcionalidad de editar TODO
            </ ModalUser >
          )}
          {openModalDelete && (
            <ModalUser mode={"BORRAR"}>
              La funcionalidad de borrar TODO
            </ ModalUser >
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export { MenuResidue };