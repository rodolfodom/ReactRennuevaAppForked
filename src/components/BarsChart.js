
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);



export default function Bars() {
 
    const [months, setMonths] = useState([]);
    
    useEffect(() => {
        // Realiza una petición GET a una URL específica
        axios
            .get('http://127.0.0.1:8000/Rennueva/get-all-users-months/')
            .then(response => {
                const data = response.data;
                console.log("data#$##$#$#$##$#$#$##$");
                console.log(data[0].enero);
                
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
                ticks: { color: 'rgba(0, 220, 195)' }
            }
        }
    };

    var midata = {
        labels: meses,
        datasets: [
            {
                label: 'Plastico reciclado',
                data: months,
                backgroundColor: 'rgba(0, 220, 195, 0.5)'
            }
        ]
    };



    return <Bar data={midata} options={misoptions} />
}