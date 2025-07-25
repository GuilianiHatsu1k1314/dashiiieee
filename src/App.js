import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ApiDemo from './pages/ApiDemo';
import ReportPage from './pages/ReportPage';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null); // user = string (username)
  const location = useLocation();
  const showHeader = location.pathname === '/';

  return (
    <>
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}>
            <Route path="crud" element={<ApiDemo />} />
            <Route path="report" element={<ReportPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
