import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import './Panel.css';

const Panel = () => {
  const { user } = useUser();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/goals/${user.id}`);
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, [user.id]);

  const handleGoalChange = (index, field, value) => {
    const newGoals = [...goals];
    newGoals[index][field] = value;
    setGoals(newGoals);
  };

  const addGoal = () => {
    setGoals([...goals, { name: '', target: '' }]);
  };

  const removeGoal = (index) => {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);
  };

  console.log('Current user in context:', user);

  const saveGoals = async () => {
    try {
      console.log('Saving goals:', { userId: user.id, goals: goals }); // Log the data being sent
      const response = await axios.post('http://localhost:4000/goals', {
        userId: user.userId,
        goals: goals.filter(goal => goal.name && goal.target)
      });
      console.log(response.data);
      setGoals([{ name: '', target: '' }]); // Reset goals after saving
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
