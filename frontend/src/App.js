import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Overview from './components/Overview/Overview';
import Panel from './components/Panel/Panel';
import Navbar from './components/Navbar/Navbar';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
  <UserProvider>
    <Router>
      <div className="App">
        <header className="App-header">
          Workout Planner
        </header>
        <Routes>
          <Route path="/" element={<Login onLogin={() => { /* handle login */ }} />} />
          <Route path="/register" element={<Register onRegister={() => { /* handle registration */ }} />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/panel" element={<Panel />} />
        </Routes>
      </div>
    </Router>
  </UserProvider>
  );
};

export default App;
