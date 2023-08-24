
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
import React , {useState, useEffect}from 'react';
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

var beneficios = [72, 56];
var meses = ["Grupo02", "Grupo03"];

var misoptions = {
    responsive : true,
    animation : false,
    plugins : {
        legend : {
            display : false
        }
    },
    scales : {
        y : {
            min : -25,
            max : 100
        },
        x: {
            ticks: { color: 'rgba(0, 220, 195)'}
        }
    }
};

var midata = {
    labels: meses,
    datasets: [
        {
            label: 'Plastico reciclado',
            data: beneficios,
            backgroundColor: 'rgba(0, 220, 195, 0.5)'
        }
    ]
};

export default function Bars() {
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        // Realiza una petición GET a una URL específica
        axios
            .get('http://127.0.0.1:8000/Rennueva/get-all-groups/')
            .then(response => {
                const data = response.data;
                setGroups(data);
              

            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return <Bar data={midata} options={misoptions} />
}