import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import HomePage from './pages/HomePage';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EventsPage from './pages/EventsPage';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Router>
      <div>
        <NavBar /> {}
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/create-event" element={<CreateEvent />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/events" element={<EventsPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
