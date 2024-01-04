import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Overview from './components/Overview/Overview';
import Panel from './components/Panel/Panel';
import { UserProvider, useUser } from './context/UserContext';

const AppContent = () => {
  const { loading } = useUser(); // Now this is within the UserProvider context

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while loading
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/panel" element={<Panel />} />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            Workout Planner
          </header>
          <AppContent />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
