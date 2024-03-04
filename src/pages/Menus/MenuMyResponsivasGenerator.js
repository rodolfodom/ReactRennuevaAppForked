import React, { useState, useContext } from "react";
import {
  createTheme,
  ThemeProvider,
  Box,
  Modal,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import BlogPost from "../../components/blog/BlogPost";
import { theme } from "../../styles/Generator/theme.js";
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {setOpen(!open)}}
              sx={{ color: 'white' }}
              
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell sx = {{ color : "#ffffff"}} component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell  sx = {{ color : "#ffffff"}} align="right">{row.calories}</TableCell>
          <TableCell  sx = {{ color : "#ffffff"}} align="right">{row.fat}</TableCell>
          <TableCell  sx = {{ color : "#ffffff"}} align="right">{row.carbs}</TableCell>
          <TableCell  sx = {{ color : "#ffffff"}} align="right">{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography sx = {{ color : "#ffffff"}} variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell sx = {{ color : "#ffffff"}} >Date</TableCell>
                      <TableCell sx = {{ color : "#ffffff"}}>Customer</TableCell>
                      <TableCell sx = {{ color : "#ffffff"}} align="right">Amount</TableCell>
                      <TableCell sx = {{ color : "#ffffff"}} align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell sx = {{ color : "#ffffff"}} component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell sx = {{ color : "#ffffff"}}>{historyRow.customerId}</TableCell>
                        <TableCell sx = {{ color : "#ffffff"}} align="right">{historyRow.amount}</TableCell>
                        <TableCell sx = {{ color : "#ffffff"}} align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function MenuMyResponsivasGenerator() {
  return (
    <ThemeProvider theme={theme}>
    
    <Box
        sx={{
          p: 3,
          bgcolor: "generator.bg_main",
          mt: -7,
          ml: 3,
          borderRadius: "10px",
          height: "60%",
        }}
      >
        <Typography sx = {{ color : "#ffffff", fontWeight : "bold"}} variant="h6" gutterBottom component="div">
                Mis Responsivas Generadas
            </Typography>
        <TableContainer component={Box} sx={{ maxHeight : "90%" }}>
          <Table sx={{ minWidth: 650, }} aria-label="simple table">
            
            <TableHead >
            
              <TableRow>
              <TableCell > </TableCell>
                <TableCell sx = {{color : "#ffffff", fontWeight: 'bold'}}>Dessert (100g serving)</TableCell>
                <TableCell sx = {{color : "#ffffff", fontWeight: 'bold'}} align="right" >Calories</TableCell>
                <TableCell sx = {{color : "#ffffff", fontWeight: 'bold'}} align="right">Fat&nbsp;(g)</TableCell>
                <TableCell sx = {{color : "#ffffff", fontWeight: 'bold'}} align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell sx = {{color : "#ffffff", fontWeight: 'bold'}} align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}

export { MenuMyResponsivasGenerator };
