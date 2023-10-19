import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import './Signature.css'; // Estilos para el canvas si los necesitas
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
const SignatureComponent = () => {
  const [imageURL, setImageURL] = useState(null); // para guardar la imagen de la firma
  const sigCanvas = useRef({}); // referencia al componente SignaturePad

  // Para limpiar el área de firma
  const clear = () => sigCanvas.current.clear();

  // Para guardar la imagen y posiblemente hacer algo más con ella (por ejemplo, enviarla a un servidor)
  const save = () => setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

  return (
    <div>
      <h3>Firma aquí del Receptor</h3>
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{
          className: 'signatureCanvas' // clase para el estilo CSS si lo necesitas
        }}
      />
      {/* Botones para guardar o limpiar la firma */}
      <Button type="submit" variant="contained" fullWidth onClick={clear}>
        Limpiar
      </Button>
      <Button type="submit" variant="contained" fullWidth onClick={save}>
        Guardar
      </Button>

      {/* Opcional: mostrar la imagen de la firma */}
      {imageURL ? (
        <div>
          <h3>Tu firma:</h3>
          <img
            src={imageURL}
            alt="Tu firma"
          />
        </div>
      ) : null}
    </div>
  );
};

export default SignatureComponent;
