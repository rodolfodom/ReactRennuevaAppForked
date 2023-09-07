import React , {useState, useEffect}from 'react';
import '../styles/Table.css';
import axios from 'axios';

const GroupTable = ({ datos }) => {
    const [clientes, setClientes] = useState([]);


    useEffect(() => {
        // Realiza una petición GET a una URL específica
        axios
            .get('http://127.0.0.1:8000/Rennueva/get-all-vehicle/')
            .then(response => {
                const data = response.data;
                setClientes(data);
              

            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
      <div className='table-containerGroup'>
      <table>
        <thead>
          <tr>
            <th className='etiquetaTabla'>Modelo</th>
            <th className='etiquetaTabla'>Placas</th>
            <th className='etiquetaTabla'>Capacidad</th>
            <th className='etiquetaTabla'>Conductor</th>

          </tr>
        </thead>
        <tbody>
          {clientes.map((fila, index) => (
            console.log("###############################"),
            console.log(clientes),
            console.log(fila),
            
            <tr key={index}>
              <td className='datoTablaGroup'>{fila.modelo}</td>
              <td className='datoTablaGroup'>{fila.placas}</td>
                <td className='datoTablaGroup'>{fila.capacidad}</td>
                <td className='datoTablaGroup'>{fila.conductor}</td>
                
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }

export default GroupTable;
