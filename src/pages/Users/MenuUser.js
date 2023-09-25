
import React, { useState, useEffect, useContext } from "react";
import '../../styles/user/MenuUser.css'
import { TodoContext } from '../../context/index.js';
import { Modal } from './ModalUser.js';
import { OptionButton } from '../../components/OptionButton';
import UserTable from "../../components/Table";
import CUDButtons from "../../containers/CUDButtons";
import BarsChart from "../../components/BarsChart";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

  return (
    <div className="container" >
      <h1 >Usuarios</h1>

      <CUDButtons  model = "User"/>
      <div>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
      <div  style={{ width: "450px", height: "225px",padding : "10px", margin: "10px" }}>
        <BarsChart />
      </div>



      {openModalCreate && (
        <Modal mode={"CREAR"}>
          La funcionalidad de agregar TODO
        </Modal>
      )
      }
      {openModalEdit && (
        <Modal mode={"EDITAR"}>
          La funcionalidad de editar TODO
        </Modal>
      )
      }
      {openModalDelete && (
        <Modal mode={"BORRAR"}>
          La funcionalidad de borrar TODO
        </Modal>
      )
      }


    </div>



  );

}

export { MenuUser };
