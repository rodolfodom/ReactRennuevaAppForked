import React , {useState, useEffect}from 'react';
import '../styles/Table.css';
import axios from 'axios';

const ResidueTable = ({ datos }) => {
    const [clientes, setClientes] = useState([]);


    useEffect(() => {
        // Realiza una petición GET a una URL específica
        axios
            .get('http://127.0.0.1:8000/Rennueva/get-all-residue/')
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
            <th className='etiquetaTabla'>Descripcion</th>


          </tr>
        </thead>
        <tbody>
          {clientes.map((fila, index) => (
            console.log("###############################"),
            console.log(clientes),
            console.log(fila),
            
            <tr key={index}>
              <td className='datoTablaGroup'>{fila.nombre}</td>
              <td className='datoTablaGroup'>{fila.descripcion}</td>

                
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }

export default ResidueTable;
