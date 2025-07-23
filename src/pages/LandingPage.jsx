import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../assets/styles/button.css';
import '../assets/styles/landing-page.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className='landing-page-wrapper'>
      <section className='hero-section'>
        <div>
          <h1>📦 Welcome to Dashiiieee App</h1>
          <p>We Deliver to your next door step.</p>
          <Button onClick={() => navigate('/login')} className='get-started-button'>
            Get Started
          </Button>
        </div>
        <div>
          
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
