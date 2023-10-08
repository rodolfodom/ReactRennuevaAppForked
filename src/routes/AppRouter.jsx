
import { TodoProvider } from '../context/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuUser } from '../pages/Users/MenuUser';
import Layout from '../containers/LayoutHeader';
import Login from '../pages/Login';
import styled from "styled-components";
import React from 'react';
import { MenuGroups } from '../pages/Users/MenuGroups';
import { MenuVehicle } from '../pages/MenuVehicle';
import { MenuResidue } from '../pages/MenuResidue';
import { MenuRecyclingCenter } from '../pages/MenuRecyclingCenter.js';
import { MenuGenerator } from '../pages/MenuGenerator';
import { MenuDriver } from '../pages/MenuDriver';
import { Sidebar } from '../containers/LayoutSideBar';
import { SignUp } from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import { MenuDonor } from '../pages/MenuDonor';


function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);


  return (
    <TodoProvider>
      <BrowserRouter>



          <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout><MenuUser /></Layout>} />
            <Route path="/users" element={<Layout><MenuUser /></Layout>} />
            <Route path="/groups" element={<Layout><MenuGroups/></Layout>} />
            <Route path="/vehicle" element={<Layout><MenuVehicle /></Layout>} />
            <Route path="/residue" element={<Layout><MenuResidue /></Layout>} />
            <Route path="/recycling-center" element={<Layout><MenuRecyclingCenter /></Layout>} />
            <Route path="/generator" element={<Layout><MenuGenerator /></Layout>} />
            <Route path="/driver" element={<Layout><MenuDriver /></Layout>} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dash" element={<Layout><Dashboard /></Layout>} />
            <Route path="/donor" element={<Layout><MenuDonor /></Layout>} />

            <Route path="*" element={<h1>Not Found 404</h1>} />
          </Routes>



      </BrowserRouter>

    </TodoProvider>

  );
}

const Container = styled.div`
  
  
`;


export default App;
