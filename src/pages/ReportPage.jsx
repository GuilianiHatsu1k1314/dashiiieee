import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/dashboard.css";
import Button from "../components/Button";

function ReportPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_URL);
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users");
      }
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="report-container">
      <Button onClick={() => navigate("/dashboard")} className="back-button">
        Back to Dashboard
      </Button>

      <h2 style={{ marginBottom: "1rem" }}>📋 User Report</h2>

      <div className="dashboard-card report-card">
        <div className="icon blue">👥</div>
        <h3>Total Users: {users.length}</h3>
        <div className="user-list">
          <ul>
            {users.length === 0 ? (
              <p>No users available.</p>
            ) : (
              users.map((user) => (
                <li key={user.id}>
                  <i className="fa-solid fa-circle-user"></i>&nbsp;{user.name} (ID: {user.id})
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
