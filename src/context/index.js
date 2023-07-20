import React from 'react';
import { Light, Dark } from "../styles/Themes.jsx";
const TodoContext = React.createContext();



function TodoProvider({ children }) {
  const [theme, setTheme] = React.useState("light");
  const themeStyle = theme === "light" ? Light : Dark;
  const [openModalCreate, setOpenModalCreate] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);


    const users = [ 
        {id: 1, name: 'Adrian Alejandro',apellido: "Hernandez Rueda", email: 'adrian@gmail.com', registered: "13-12-2000", rol: 'admin'},
        {id: 2, name: 'Juan',apellido: "Hernandez", email: 'adrian@gmail.com', registered: "13-12-2000", rol: 'admin'},
        {id: 3, name: 'Juan',apellido: "Hernandez", email: 'adrian@gmail.com', registered: "13-12-2000", rol: 'admin'},
        {id: 4, name: 'Juan',apellido: "Hernandez", email: 'adrian@gmail.com', registered: "13-12-2000", rol: 'admin'},
        {id: 5, name: 'Juan',apellido: "Hernandez", email: 'adrian@gmail.com', registered: "13-12-2000", rol: 'admin'},
        {id: 6, name: 'Juan',apellido: "Hernandez", email: 'adrian@gmail.com', registered: "13-12-2000", rol: 'admin'},
        {id: 7, name: 'Juan',apellido: "Hernandez", email: 'adrian@gmail.com', registered: "13-12-2000", rol: 'admin'},
        {id: 8, name: 'Juan',apellido: "Hernandez", email: 'adrian@gmail.com', registered: "13-12-2000", rol: 'admin'},
        {id: 9, name: 'Juan',apellido: "Hernandez", email: 'adrian@gmail.com', registered: "13-12-2000", rol: 'admin'},
        {id: 10, name: 'Juan',apellido: "Hernandez", email: 'adrian@gmail.com', registered: "13-12-2000", rol: 'admin'}]


    const totalListlUsers = users
        
  
  return (
    <TodoContext.Provider value={{totalListlUsers,
    openModalCreate, setOpenModalCreate, openModalEdit, setOpenModalEdit, openModalDelete, setOpenModalDelete, theme, setTheme,themeStyle}} >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };