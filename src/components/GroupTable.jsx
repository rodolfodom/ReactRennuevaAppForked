import React , {useState, useEffect}from 'react';
import '../styles/Table.css';
import axios from 'axios';

const GroupTable = ({ datos }) => {
    const [clientes, setClientes] = useState([]);


    useEffect(() => {
        // Realiza una petición GET a una URL específica
        axios
            .get('http://127.0.0.1:8000/Rennueva/get-all-groups/')
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
            <th className='etiquetaTabla'>Nombre</th>

          </tr>
        </thead>
        <tbody>
          {clientes.map((fila, index) => (
            console.log("###############################"),
            console.log(clientes),
            console.log(fila),
            
            <tr key={index}>
              <td className='datoTablaGroup'>{fila.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }

export default GroupTable;