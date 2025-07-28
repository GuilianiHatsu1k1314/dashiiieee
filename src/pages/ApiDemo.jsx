import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ApiDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUserName, setNewUserName] = useState('');

  const API_URL = 'http://localhost:3001/users';

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

  const addUser = async () => {
    try {
      if (!newUserName) throw new Error('Name cannot be empty');
      const res = await axios.post(API_URL, { name: newUserName });
      const newUsers = [...users, res.data];
      localStorage.setItem('user_data', JSON.stringify(newUsers));
      setUsers(newUsers);
      setNewUserName('');
    } catch {
      alert('Failed to add user.');
    }
  };

  const updateUser = async (id) => {
    const updatedName = prompt('Enter new name:');
    if (!updatedName) return;
    try {
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

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('user_data', JSON.stringify(updatedUsers));
    } catch {
      alert('Failed to delete user.');
    }
  };

  return (
    <>
      <div className='card-container'>
        <div className='dashboard-card'>
          <div className='icon blue'>&#128202;</div>
          <h3>{users.length}</h3>
          <p>Total Records</p>
        </div>
      </div>
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '30px',
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>API Integration Demo (Axios)</h2>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newUserName}
            placeholder="Enter name"
            onChange={e => setNewUserName(e.target.value)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />
          <button
            onClick={addUser}
            style={{
              padding: '8px 14px',
              border: 'none',
              backgroundColor: 'teal',
              color: 'white',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Add
          </button>
        </div>

        {loading && <p>Loading users...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {users.map(user => (
            <li
              key={user.id}
              style={{
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>
                <strong>[{user.id}]</strong> {user.name}
              </span>
              <span>
                <button
                  onClick={() => updateUser(user.id)}
                  style={{
                    marginRight: '8px',
                    padding: '5px 10px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  style={{
                    padding: '5px 10px',
                    border: 'none',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div></>
  );
}

export default ApiDemo;
