import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ApiDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUserName, setNewUserName] = useState('');

  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  // ---------- GET: Fetch all users ----------
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // ---------- POST: Add new user ----------
  const addUser = async () => {
    try {
      const res = await axios.post(API_URL, { name: newUserName });
      setUsers(prev => [...prev, res.data]);
      setNewUserName('');
    } catch {
      alert('Failed to add user.');
    }
  };

  // ---------- PUT: Update user name ----------
  const updateUser = async (id) => {
    const updatedName = prompt('Enter new name:');
    if (!updatedName) return;
    try {
      const res = await axios.put(`${API_URL}/${id}`, { name: updatedName });
      setUsers(prev =>
        prev.map(user => (user.id === id ? { ...user, name: res.data.name } : user))
      );
    } catch {
      alert('Failed to update user.');
    }
  };

  // ---------- DELETE: Remove user ----------
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch {
      alert('Failed to delete user.');
    }
  };

  // ---------- Render ----------
  return (
    <div style={{ padding: '20px' }}>
      <h1>API Integration Demo (with Axios)</h1>

      {/* Add user form */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={newUserName}
          placeholder="New user name"
          onChange={e => setNewUserName(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Loading/Error states */}
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* List of users */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>[{user.id}]</strong> {user.name}{' '}
            <button onClick={() => updateUser(user.id)}>Edit</button>{' '}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiDemo;
