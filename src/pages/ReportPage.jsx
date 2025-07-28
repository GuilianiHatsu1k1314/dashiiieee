import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReportPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3001/users';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_URL);
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users');
      }
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '10px' }}>Back to Dashboard?</button>
      <h2>📋 User Report</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} (ID: {user.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReportPage;
