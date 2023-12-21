import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import './Signature.css'; // Estilos para el canvas si los necesitas
import { Modal, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
const SignatureComponent = ({id, type}) => {
  const [imageURL, setImageURL] = useState(null); // para guardar la imagen de la firma
  const sigCanvas = useRef({}); // referencia al componente SignaturePad
  console.log("firma en el signature component")
  console.log(id)
  // Para limpiar el área de firma
  const clear = () => sigCanvas.current.clear();


  // Para guardar la imagen y posiblemente hacer algo más con ella (por ejemplo, enviarla a un servidor)
  const save = async () => {
    let url = 'https://api.rennueva.com/Rennueva/update-report-generator-signature/'
    if (type == "Receptor"){
      url = 'https://api.rennueva.com/Rennueva/update-report-receptor-signature/'
      
    }

    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    console.log(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    try {
      // Usamos 'await' para esperar a que la solicitud se complete y para obtener la respuesta
      const response = await axios.post(url, {
        reportId: id,
        reportGeneratorSignature: sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
      });
  
      // Retorna directamente los datos de la respuesta
      return response.data;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error(error);
      // Aquí puedes optar por lanzar el error o devolver algo específico en caso de un error
      throw error; // Esto propaga el error al llamador para que pueda ser manejado más adelante
    }
  } 



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
