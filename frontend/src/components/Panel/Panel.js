// src/components/Panel/Panel.js

import React from 'react';
import Header from '../Header/Header'; // Adjust the path as necessary
import Navbar from '../Navbar/Navbar'; // Adjust the path as necessary
//import './Panel.css'; // You will create a Panel.css file for styling

const Panel = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="panel-content">
        <h2>Set Your Goals</h2>
        {/* Form for setting goals will go here */}
      </div>
    </div>
  );
};

export default Panel;
