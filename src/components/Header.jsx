import { useRef, useContext} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Header.css";
import Rennueva from "../assets/Rennueva.jpg";
import { TodoContext } from "../context";

function Navbar() {
	const { openSideBar, setOpenSideBar } = useContext(TodoContext);
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	const SideBarFunction = () => {
		setOpenSideBar(!openSideBar);
		console.log("SDSADGGGGGGGGGGGGGGGGGGG")
	}

	return (
		<header style={{width : '100%'}}>
			<button className="side-button" onClick={SideBarFunction}>
				<FaBars />
				</button>
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