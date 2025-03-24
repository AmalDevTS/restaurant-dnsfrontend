import React, { useState } from "react";
import "../styles/navbar.css";
import { FiMenu, FiX } from "react-icons/fi"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/images/logo.png" alt="Deep Net Soft Logo" className="logo" />
        <span className="logo-text">
          <span className="deep">DEEP</span> <span className="net">NET</span> <span className="soft">SOFT</span>
        </span>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><a href="home">HOME</a></li>
        <li><a href="menu">MENU</a></li>
        <li><a href="reserve">MAKE A RESERVATION</a></li>
        <li><a href="contact">CONTACT US</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
