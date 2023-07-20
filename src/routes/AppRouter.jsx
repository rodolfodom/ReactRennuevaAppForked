
import {TodoProvider} from '../context/index'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuUser } from '../pages/Users/MenuUser';
import Layout from '../containers/LayoutHeader';
import Login from '../pages/Login';
import { Sidebar } from '../components/SideBar';

import React from 'react';
function App() {

  return (
      <TodoProvider>
        <BrowserRouter>
        
        <Layout>
        
          
          <Routes>
            <Route path="/" element={<MenuUser/>}/>
            <Route path="/users" element={<MenuUser/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<h1>Not Found 404</h1>}/>
          </Routes>
        </Layout>
        </BrowserRouter>
       
      </TodoProvider>
    
  );
}


export default App;
