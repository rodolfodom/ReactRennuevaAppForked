
import { TodoProvider } from '../context/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuUser } from '../pages/Users/MenuUser';
import Layout from '../containers/LayoutHeader';
import Login from '../pages/Login';
import { Sidebar } from '../components/SideBar';
import styled from "styled-components";

import React from 'react';
function App() {
  const [ sidebarOpen, setSidebarOpen ] = React.useState(true);


  return (
    <TodoProvider>
      <BrowserRouter>
      <Layout>
        <Container className={sidebarOpen ? "sidebarState active" : ""}>

          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
            <Routes>
              <Route path="/" element={<MenuUser />} />
              <Route path="/users" element={<MenuUser />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<h1>Not Found 404</h1>} />
            </Routes>
          
        </Container>
        </Layout>

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
