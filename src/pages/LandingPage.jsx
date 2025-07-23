import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <h1>📦 Welcome to Dashiiieee App</h1>
      <p>This app features a login system, dashboard with CRUD, and reporting functionality.</p>
      <Button onClick={() => navigate('/login')}>
        Get Started
      </Button>
    </div>
  );
}

export default LandingPage;
