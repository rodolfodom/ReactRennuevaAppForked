import React from 'react';
import Header from '../components/Header';
import { Sidebar } from '../components/SideBar';
import styled from "styled-components";

const Layout = ({ children }) => {
	  const [ sidebarOpen, setSidebarOpen ] = React.useState(true);
	return (
		<div className="Layout">
			<Header />
			<Container className={sidebarOpen ? "sidebarState active" : ""}>
            <Sidebar 
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}/>
          </Container>
			
			{children}
		</div>
	);
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition:all 0.3s ;
  &.active {
    grid-template-columns: 300px auto;
  }
  color:${({theme})=>theme.text};
`;

export default Layout;