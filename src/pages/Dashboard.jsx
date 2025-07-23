import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Dashboard({ user }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Welcome, <span style={{ color: 'teal' }}>{user}</span>!</h2>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
