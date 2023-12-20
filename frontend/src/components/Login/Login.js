import React from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement login logic here
    onLogin();
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Email</label>
          <input type="text" id="email" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
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
