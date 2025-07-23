import React, { useEffect, useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const STORAGE_KEY = 'user_data';

function ApiDemo() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load from localStorage or API
  useEffect(() => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetchUsersFromAPI();
    }
  }, []);

  const fetchUsersFromAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const updateLocalStorage = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  const addUser = async () => {
    if (!newUserName.trim()) return alert('Enter a name');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName }),
      });
      const newUser = await res.json();
      const updatedUsers = [...users, newUser];
      updateLocalStorage(updatedUsers);
      setNewUserName('');
    } catch {
      alert('Failed to add user.');
    }
  };

  const updateUser = async (id) => {
    const newName = prompt('Enter new name:');
    if (!newName) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      const updated = await res.json();
      const updatedUsers = users.map(user =>
        user.id === id ? { ...user, name: updated.name } : user
      );
      updateLocalStorage(updatedUsers);
    } catch {
      alert('Failed to update user.');
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const updatedUsers = users.filter(user => user.id !== id);
      updateLocalStorage(updatedUsers);
    } catch {
      alert('Failed to delete user.');
    }
  };

  return (
    <div>
      <h2>🛠 CRUD Page</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newUserName}
          onChange={e => setNewUserName(e.target.value)}
          placeholder="New user name"
          style={{ padding: '8px', width: '250px', marginRight: '10px' }}
        />
        <button onClick={addUser}>➕ Add User</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <button onClick={() => updateUser(user.id)}>✏️ Edit</button>{' '}
                <button onClick={() => deleteUser(user.id)}>🗑️ Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApiDemo;
