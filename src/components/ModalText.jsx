import React, {useContext} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { TodoContext } from '../context';



const SimpleModal = ({ text }) => {

    const {openModalText, setOpenModalText} = useContext(TodoContext);   

    return (
      <Dialog
        open={ () => setOpenModalText(true)}
        onClose={ () => setOpenModalText(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Mensaje"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => setOpenModalText(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

export default SimpleModal;