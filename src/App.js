import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ApiDemo from './pages/ApiDemo';
import ReportPage from './pages/ReportPage';

function App() {
  const [user, setUser] = useState(null); // user = string (username)

  return (
    <Router>
      <header style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h1 style={{ margin: 0, padding: '10px' }}>📦 Dashiiieee App</h1>
      </header>

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}>
            <Route path="crud" element={<ApiDemo />} />
            <Route path="report" element={<ReportPage />} />
          </Route>
        </Routes>
      </main>

      <footer style={{ textAlign: 'center', padding: '10px', color: '#777' }}>
        &copy; 2025 MyApp Inc.
      </footer>
    </Router>
  );
}

export default App;
