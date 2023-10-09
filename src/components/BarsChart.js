import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart() {
 
  const [months, setMonths] = useState([]);
    
    useEffect(() => {
        // Realiza una petición GET a una URL específica
        axios
            .get('http://127.0.0.1:8000/Rennueva/get-all-users-months/')
            .then(response => {
                const data = response.data;
                let enero = data[0].enero;
                let febrero = data[0].febrero;
                let marzo = data[0].marzo;
                let abril = data[0].abril;
                let mayo = data[0].mayo;
                let junio = data[0].junio;
                let julio = data[0].julio;
                let agosto = data[0].agosto;
                let septiembre = data[0].septiembre;
                let octubre = data[0].octubre;
                let noviembre = data[0].noviembre;
                let diciembre = data[0].diciembre;
                              
                setMonths([enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre]);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    var beneficios = [72, 56];
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    var misoptions = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100
            },
            x: {
                ticks: { color: "black" }
            }
        }
    };

    var midata = {
        labels: meses,
        datasets: [
            {
                label: 'Plastico reciclado',
                data: months,
                backgroundColor: "#3f51b5"
            }
        ]
    };


  return (
    <React.Fragment>
      <Title>Usuarios Creados</Title>
      <ResponsiveContainer>
        <Bar data={midata} options={misoptions} />
      </ResponsiveContainer>
    </React.Fragment>
  );
}