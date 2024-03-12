import React, { useState,   useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/user/MenuUser.css';
import { TodoContext } from '../context/index.js';
// Importa los demás componentes y bibliotecas que necesitas...
import { Document, Page } from 'react-pdf';
import axios from 'axios';
import { ThemeProvider, createTheme, Box, Grid, Paper, Container, Toolbar, CssBaseline, Button, TextField } from '@mui/material';
import Title from '../components/Title.js';

function MenuTracking() {
   
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFile2, setPdfFile2] = useState(null);
    const defaultTheme = createTheme();
    const [url, setUrl] = useState(null);
    const [url2, setURL2] = useState(null);
    const [folio, setFolio] = useState(null);

    function openPdfInNewWindow() {
        const blob = base64ToBlob(pdfFile, 'application/pdf');
        const url = URL.createObjectURL(blob);
    
        // Abrir el PDF en una nueva ventana
        window.open(url, '_blank');
    }
    
    const { trackingNumber } = useParams(); // Usar useParams para obtener el número de tracking de la URL

 

    useEffect(() => {
        if (trackingNumber) {
            setFolio(trackingNumber); // Establecer el número de tracking en el estado folio
            getPDF(trackingNumber); // Llamar a getPDF automáticamente si hay un número de tracking
        }
    }, [trackingNumber]); // El efecto se ejecuta cuando cambia trackingNumber

    

    async function getPDF(trackingNumber) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/get-pdf-report/`, { ReportFolio: trackingNumber });
            const data = response.data;

            const blob = base64ToBlob(data.Reporte, 'application/pdf');
            const url = URL.createObjectURL(blob);

            setUrl(url);
            setPdfFile(data.Reporte);
            window.open(url, '_blank');
        } catch (error) {
            console.log(error);
        }
    }
    

    function base64ToBlob(base64, mimeType) {
        const base64Real = base64.split(',')[1] || base64;

        const byteCharacters = atob(base64Real);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], {type: mimeType});
      }
      

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
                    <Container maxWidth="xl">
                        <Grid container spacing={3}>
                            <Grid item xl >
                                <Paper
                                    sx={{
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        height: 'auto', // Modificado para ajustar el tamaño del contenedor
                                    }}
                                >
                                    <Title>Tracking</Title>

                                    <TextField
                                        label="Clave de Responsiva"
                                        name="responsiva"
                                        required
                                        fullWidth
                                        onChange={(e) => setFolio(e.target.value)}

                                    />
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={getPDF}
                                        
                                    >
                                        Buscar
                                    </Button>

                                    {/* Visualizador de PDF */}
                                    {pdfFile && (
                                        <Document
                                            file={url}
                                
                                            onLoadError={(error) => console.error('Error al cargar el PDF:', error)}
                                        >
                                            <Page pageNumber={1} />
                                        </Document>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export { MenuTracking };
