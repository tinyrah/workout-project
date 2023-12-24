// src/components/Panel/Panel.js

import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import './Panel.css';

const Panel = () => {
  const { user } = useUser();
  const [goals, setGoals] = useState([{ name: '', target: '' }]);

  const handleGoalChange = (index, field, value) => {
    const newGoals = [...goals];
    newGoals[index][field] = value;
    setGoals(newGoals);
  };

  const addGoal = () => {
    setGoals([...goals, { name: '', target: '' }]);
  };

  const removeGoal = (index) => {
    const newGoals = [...goals];
    newGoals.splice(index, 1);
    setGoals(newGoals);
  };

  const saveGoals = async () => {
    try {
      const response = await axios.post('/goals', { userId: user.id, goals });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  return (
    <div className="panel-page">
      <Header />
      <Navbar />
      <div className="panel-content">
        <div className="panel-container">
          {goals.map((goal, index) => (
            <div key={index} className="goal-entry">
              <input
                type="text"
                placeholder="Goal name"
                className="goal-input"
                value={goal.name}
                onChange={(e) => handleGoalChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Target"
                className="goal-input"
                value={goal.target}
                onChange={(e) => handleGoalChange(index, 'target', e.target.value)}
              />
              <button className="remove-button" onClick={() => removeGoal(index)}>Remove</button>
            </div>
          ))}
          <div className="panel-actions">
            <button className="add-button" onClick={addGoal}>Add Goal</button>
            <button className="save-button" onClick={saveGoals}>Save Goals</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
