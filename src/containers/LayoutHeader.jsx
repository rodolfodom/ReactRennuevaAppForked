import React from 'react';
import Header from '../components/Header';
import { Sidebar } from '../components/SideBar';
import styled from "styled-components";

const Layout = ({ children }) => {
	  	return (
		<div className="Layout">
			<Header />			
			{children}
		</div>
	);
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
`;

export default Layout;