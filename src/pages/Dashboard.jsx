import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../assets/styles/dashboard.css';

function Dashboard({ user }) {
  const [users, setUsers] = useState([]);
  const API_URL = 'http://localhost:3001/users';

  // Fetch users on load
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
      const res = await axios.post(API_URL, { name });
      setUsers(prev => [...prev, res.data]);
    } catch (err) {
      alert('Failed to add user.');
    }
  };

  const handleEditUser = async () => {
    if (users.length === 0) {
      alert('No users to edit.');
      return;
    }
    const updatedName = prompt('Enter new name for the first user:', users[0].name);
    if (!updatedName) return;
    try {
      const res = await axios.put(`${API_URL}/${users[0].id}`, { name: updatedName });
      setUsers(prev =>
        prev.map(u => (u.id === users[0].id ? { ...u, name: res.data.name } : u))
      );
    } catch {
      alert('Failed to edit user.');
    }
  };

  return (
    <div className='dashboard-wrapper'>
      <Sidebar />
      <div className='content'>
        <h2>Welcome, <span style={{ color: 'teal' }}>{user}</span>!</h2>

        {/* Dashboard Cards */}
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
          <div className='dashboard-card' onClick={handleEditUser}>
            <div className='icon orange'>&#9998;</div>
            <h3>Edit User</h3>
            <p>Edit First User</p>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
