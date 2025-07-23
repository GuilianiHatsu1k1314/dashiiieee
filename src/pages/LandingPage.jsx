import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <h1>📦 Welcome to Dashiiieee App</h1>
      <p>This app features a login system, dashboard with CRUD, and reporting functionality.</p>
      <button onClick={() => navigate('/login')} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Get Started
      </button>
    </div>
  );
}

export default LandingPage;
