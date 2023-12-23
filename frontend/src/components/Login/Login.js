import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });

      // If the login was successful
      if (response.data) {
        // Use the login function from your UserContext
        login({ email }); // You may want to include other data
        navigate('/overview'); // Redirect to the overview page after login
      }
    } catch (error) {
      if (error.response) {
        // Handle errors, such as displaying a notification to the user
        console.error('Login failed:', error.response.status, error.response.data);
        alert('Login failed: ' + error.response.data);
      } else {
        console.error('The request was made but no response was received', error);
        alert('Login failed: The request was made but no response was received');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="message">
          New user? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
