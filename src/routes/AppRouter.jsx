
import { TodoProvider } from '../context/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuUser } from '../pages/Users/MenuUser';
import Layout from '../containers/LayoutHeader';
import Login from '../pages/Login';
import { Sidebar } from '../components/SideBar';
import styled from "styled-components";
import React from 'react';
import { MenuGroups } from '../pages/Users/MenuGroups';
function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);


  return (
    <TodoProvider>
      <BrowserRouter>

        <Container className={sidebarOpen ? "sidebarState active" : ""}>


          <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout><MenuUser /></Layout>} />
            <Route path="/users" element={<MenuUser />} />
            <Route path="/groups" element={<Layout><MenuGroups /></Layout>} />

            
            <Route path="*" element={<h1>Not Found 404</h1>} />
          </Routes>

        </Container>


      </BrowserRouter>

    </TodoProvider>

  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
`;


export default App;
