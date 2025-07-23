import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ApiDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUserName, setNewUserName] = useState('');

  //installed a server
  //json server api url
  //for the crud to reflect changes, created a mock database, cruddb.json
  const API_URL = 'http://localhost:3001/users';
  const navigate = useNavigate();
  

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
      //No inputs = error: Failed to add user.
      if (!newUserName) throw new Error('Name cannot be empty');
      //adds new user, then saves the updated list to the localStorage.
      const res = await axios.post(API_URL, { name: newUserName });
      const newUsers = [...users, res.data];
      localStorage.setItem('user_data', JSON.stringify(newUsers));
      setUsers(newUsers);
      setNewUserName('');
    } catch (a) {
      alert('Failed to add user.');
    }
  };

  // ---------- PUT: Update user name ----------
  const updateUser = async (id) => {
    const updatedName = prompt('Enter new name:');
    if (!updatedName) return;
    try {
      //edits / updates name, then saves the updated list to the localStorage.
      const res = await axios.put(`${API_URL}/${id}`, { name: updatedName });
      setUsers(prev => {
      const updatedUsers = prev.map(user =>
        user.id === id ? { ...user, name: res.data.name } : user
      );
      localStorage.setItem('user_data', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
    } catch {
      alert('Failed to update user.');
    }
  };

  // ---------- DELETE: Remove user ----------
  const deleteUser = async (id) => {
    try {
      //remove deleted user from users, then saves the updated list to the localStorage.
      await axios.delete(`${API_URL}/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('user_data', JSON.stringify(updatedUsers));
    } catch {
      alert('Failed to delete user.');
    }
  };

  // ---------- Render ----------
  return (
    
    <div style={{ padding: '20px' }}>
      {/*Button to navigate to dashboard*/}
       <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '10px' }}>Back to Dashboard?</button>
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
