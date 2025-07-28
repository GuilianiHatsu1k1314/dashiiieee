import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import '../assets/styles/dashboard.css';

function Dashboard({ user }) {
  const [users, setUsers] = useState([]);
  const API_URL = 'http://localhost:3001/users';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleAddUser = async () => {
    const name = prompt('Enter new user name:');
    if (!name) return;
    try {
      await axios.post(API_URL, { name });
      await fetchUsers();
    } catch (err) {
      alert('Failed to add user.');
    }
  };

  return (
    <div className='dashboard-wrapper'>
      <Sidebar />
      <div className='content'>
        <h2>
          Welcome, <span style={{ color: 'teal' }}>{user}</span>!
        </h2>

        <div className='card-container'>
          <div className='dashboard-card'>
            <div className='icon blue'>&#128202;</div>
            <h3>{users.length}</h3>
            <p>Total Records</p>
          </div>

          <div className='dashboard-card' onClick={handleAddUser}>
            <div className='icon green'>+</div>
            <h3>Add User</h3>
            <p>Click to Add</p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
