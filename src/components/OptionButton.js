import React from 'react';
import Button from '@mui/material/Button';

function OptionButton({ setOpenModal, text, color }) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        setOpenModal(state => !state);
      }}
      style={{ backgroundColor: color }}
    >
      {text}
    </Button>
  );
}

export { OptionButton };
