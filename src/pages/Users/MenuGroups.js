
import React, { useState, useEffect, useContext } from "react";
import '../../styles/user/MenuUser.css'
import { TodoContext } from '../../context/index.js';
import { Modal } from './ModalGroup';
import { OptionButton } from '../../components/OptionButton';
import UserTable from "../../components/Table";
import CUDButtons from "../../containers/CUDButtons";
import BarsChart from "../../components/BarsChart";
import BarsChartGroup from "../../components/BarsChartGroup";
import GroupTable from "../../components/GroupTable";


import { ThemeProvider,createTheme, Box, Grid, Paper, Container, Toolbar, CssBaseline } from '@mui/material';

import Title from '../../components/Title';


function MenuGroups() {
  const { openModalCreateGroup, openModalEditGroup, openModalDeleteGroup, setOpenModalEditGroup, setOpenModalDeleteGroup } = useContext(TodoContext);
 
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
              <Grid item xs={6}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Title>Grupos</Title>
                  <CUDButtons model="Group" />

                  <Title>Grupos Creados</Title>
                  <GroupTable />
                  
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 580,
                  }}
                >
                  <BarsChartGroup />
                </Paper>
              </Grid>
            </Grid>
          </Container>

          {openModalCreateGroup && (
            <Modal mode={"CREAR"}>
              La funcionalidad de agregar TODO
            </Modal>
          )}
          {openModalEditGroup && (
            <Modal mode={"EDITAR"}>
              La funcionalidad de editar TODO
            </Modal>
          )}
          {openModalDeleteGroup && (
            <Modal mode={"BORRAR"}>
              La funcionalidad de borrar TODO
            </Modal>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export { MenuGroups};