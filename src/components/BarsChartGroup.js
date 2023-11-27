import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import Title from './Title';

export default function Chart() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios
      .get('http://10.10.200.12:8008/Rennueva/get-all-users-groups/')
      .then(response => {
        const data = response.data.group_data; // Asumiendo que los datos relevantes están en group_data

        let chartData = data.map(item => ({
          group: item.group,  // Asegúrate de que 'group' y 'user_count' son las claves correctas
          users: item.user_count
        }));

        setGroups(chartData);
        console.log(chartData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>Usuarios por Grupo</Title>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={groups}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="group" stroke="#000000" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar type="monotone" dataKey="users" fill="#3f51b5" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
