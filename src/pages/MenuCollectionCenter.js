import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from '../context/index.js';
import { Modal } from './Users/ModalUser';
import RecyclingCenterTable from "../components/RecyclingCenterTable";
import BarsChartVehicle from "../components/BarsChartVehicle";
import {
  ThemeProvider,
  createTheme,
  Box,
  Grid,
  Paper,
  Container,
  Toolbar,
  CssBaseline,
} from '@mui/material';
import Title from '../components/Title';
import CUDButtons from "../containers/CUDButtons";

function MenuCollectionCenter() {
  const { 
    openModalCreate, 
    setOpenModalCreate, 
    setOpenModalEdit,
    openModalEdit, 
    setOpenModalDelete, 
    openModalDelete 
  } = useContext(TodoContext);

  const [datos, setDatos] = useState([]);

  // ... otros handlers y useEffect ...

  const defaultTheme = createTheme();

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
                    justifyContent: 'center'
                  }}
                >
                  <Title>Centros de Recoleccion</Title>
                  <CUDButtons model="RecyclingCenter" />
                  <Title>Centros Creados</Title>
                  <RecyclingCenterTable />
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

export { MenuCollectionCenter };
