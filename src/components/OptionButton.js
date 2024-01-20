import React from 'react';
import Button from '@mui/material/Button';
import { generateExcel } from '../services/Excel.js';

function OptionButton({ setOpenModal, text, color }) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        setOpenModal(state => !state);
      }}
      style={{ backgroundColor: color , color: 'black'}}
    >
      {text}
    </Button>
  );
}

function ActionButtonOrdersExcel({text, color }) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        generateExcel(); // Llamar a la función para generar Excel
      }}
      style={{ backgroundColor: color , color: 'black'}}
    >
      {text}
    </Button>
  );
}

export { OptionButton, ActionButtonOrdersExcel };
