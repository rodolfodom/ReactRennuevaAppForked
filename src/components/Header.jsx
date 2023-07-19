import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Header.css";
import Rennueva from "../assets/Rennueva.jpg";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header className="header-container">
			 <img src={Rennueva} alt = "Rennueva" className="logo-header" />
				
       
			<nav ref={navRef}>
               <a href="/#">Home</a>
				<a href="/#">My work</a>
				<a href="/#">Blog</a>
				<a href="/#">About me</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;