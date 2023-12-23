import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple front-end validation for example purposes
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post('http://localhost:4000/register', {
        email,
        password
      });

      // Handle the response from the server
      if (response.status === 201) {
        alert('Registration successful!');
        // Redirect the user to login page or home page after registration
        // window.location = '/login'; // Un-comment this line to enable redirection
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('User already exists!');
      } else {
        alert('Registration failed!');
        console.error('Registration Error:', error);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
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
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
