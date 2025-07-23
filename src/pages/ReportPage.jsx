import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReportPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUsers = localStorage.getItem('user_data');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    }, 1000); //fetches every second to refresh the report page

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
