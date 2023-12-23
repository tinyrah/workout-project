// src/components/Overview/Overview.js

import React from 'react';
import Header from '../Header/Header'; // Import the Header component
import Navbar from '../Navbar/Navbar'; // Import the Navbar component
import './Overview.css'; // Ensure this CSS file exists and contains your styles

const Overview = () => {
  // Temporarily hardcoding the goals for styling purposes
  const goals = {
    squat: '200 lbs',
    bench: '150 lbs',
    deadlift: '250 lbs'
  };

  return (
    <div>
      <Header /> {/* Include the Header component at the top */}
      <Navbar /> {/* Include the Navbar component below the header */}
      <div className="overview-content"> {/* This wraps the content below the navbar */}
        <div className="left-column"> {/* This column will contain Goals and Visualizer */}
          <div className="goals">
            <h2>Goals</h2>
            <ul>
              {Object.entries(goals).map(([exercise, goal]) => (
                <li key={exercise}>{`${exercise.charAt(0).toUpperCase() + exercise.slice(1)}: ${goal}`}</li>
              ))}
            </ul>
          </div>
          <div className="visualizer">
            <h2>Visualizer</h2>
            {/* Visualizer component will go here */}
          </div>
        </div>
        <div className="right-column"> {/* This column will contain the Calendar */}
          <div className="calendar">
            <h2>Calendar</h2>
            {/* Calendar component will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
