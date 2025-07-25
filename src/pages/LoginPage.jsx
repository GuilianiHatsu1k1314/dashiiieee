import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../assets/styles/login-page.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      onLogin(username); 
      navigate('/dashboard');
    }
  };

  return (
    <div class="login-wrapper">
      
      <div class="login-container">
        <h2>SIGN IN</h2>
        <label>Email Address</label>
        <input
        type="text"
        placeholder='type your email address'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label>Password</label>
      <input
        type="text"
        placeholder="type your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br /><br />
      <Button onClick={handleLogin} className="login-button">
        Login
      </Button>
      </div>
    </div>
  );
}

export default LoginPage;
