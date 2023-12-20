import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          Workout Planner
        </header>
        <Routes>
          <Route path="/" element={<Login onLogin={() => { /* handle login */ }} />} />
          <Route path="/register" element={<Register onRegister={() => { /* handle registration */ }} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
