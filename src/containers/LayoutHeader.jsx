import React from 'react';
import Header from '../components/Header';
import styled from "styled-components";
import Sidebar from './LayoutSideBar';



const Layout = ({ children }) => {
	  	return (
		<div style={{width: '100%'}}>
			
			<Header  />
			<Sidebar />
			
			
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