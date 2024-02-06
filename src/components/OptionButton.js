import React from 'react';
import Button from '@mui/material/Button';
import { generateExcel,importExcel } from '../services/Excel.js';

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

function ImportExcelButton({ text, color, onImported }) {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    importExcel(file, onImported);
  };

  return (
    <>
      <Button
        variant="contained"
        component="label"
        style={{ backgroundColor: color, color: 'black' }}
      >
        {text}
        <input
          type="file"
          hidden
          onChange={handleFileSelect}
        />
      </Button>
    </>
  );
}

export { OptionButton, ActionButtonOrdersExcel , ImportExcelButton};
