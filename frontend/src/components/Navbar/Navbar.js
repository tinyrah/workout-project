// src/components/Navbar/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this file exists and has the necessary styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/overview">Overview</Link>
      <Link to="/panel">Panel</Link>
    </nav>
  );
};

export default Navbar;
