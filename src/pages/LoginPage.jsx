import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/login-page.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username); 
      navigate('/dashboard');
    }
  };

  return (
    <div class="login-wrapper">
      <h2>SIGN IN</h2>
      <div class="login-container">
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
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br /><br />
      <button onClick={handleLogin}>Login</button></div>
    </div>
  );
}

export default LoginPage;
