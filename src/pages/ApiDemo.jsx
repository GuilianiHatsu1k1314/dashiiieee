import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import "../assets/styles/button.css"; // Assuming you have a separate CSS file for ApiDemo

//ApiDemo.jsx
function ApiDemo() {
  const location = useLocation();
  const para = new URLSearchParams(location.search);
  const mode = para.get("mode"); //modes set in the sidebar.jsx, add, edit, delete.'
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUserName, setNewUserName] = useState("");

  const API_URL = "http://localhost:3001/users";

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
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    try {
      if (!newUserName) throw new Error("Name cannot be empty");
      const res = await axios.post(API_URL, { name: newUserName });
      const newUsers = [...users, res.data];
      localStorage.setItem("user_data", JSON.stringify(newUsers));
      setUsers(newUsers);
      setNewUserName("");
    } catch {
      alert("Failed to add user.");
    }
  };

  const updateUser = async (id) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;
    try {
      const res = await axios.put(`${API_URL}/${id}`, { name: updatedName });
      setUsers((prev) => {
        const updatedUsers = prev.map((user) =>
          user.id === id ? { ...user, name: res.data.name } : user
        );
        localStorage.setItem("user_data", JSON.stringify(updatedUsers));
        return updatedUsers;
      });
    } catch {
      alert("Failed to update user.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("user_data", JSON.stringify(updatedUsers));
    } catch {
      alert("Failed to delete user.");
    }
  };

  return (
    <>
      <div className="default-page">
        {/*Condition: Only show the total records once you are back to dashboard.*/}
        {!mode && (
          <div className="card-container">
            <div className="dashboard-card">
              <div className="icon blue">&#128202;</div>
              <h3>{users.length}</h3>
              <p>Total Records</p>
            </div>
          </div>
        )}
        <div
          style={{ display: "flex", justifyContent: "center", padding: "30px" }}
        >
          <div className="main-card">
            <h2 style={{ marginTop: 0, marginBottom: "20px" }}>
              📦 Dashiiieee Users
            </h2>
            {/*Changed the ui a bit, did a conditional rendering based on the mode(options in the sidebar) for crud.*/}
            {mode === "add" && (
              <div>
                <input
                  type="text"
                  value={newUserName}
                  placeholder="Enter username"
                  onChange={(e) => setNewUserName(e.target.value)}
                />
                <Button onClick={addUser} className="add-user-btn">
                  Add &nbsp; <i className="fa-solid fa-plus"></i>
                </Button>
              </div>
            )}

            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <ul>
              {users.map((user) => (
                <li key={user.id}  className="user-item">
                  <span>
                    <i className="fa-solid fa-circle-user"></i>&nbsp;
                    {mode ? `[${user.id}] ` : ""}
                    {user.name}
                  </span>
                  {mode === "edit" && (
                    <Button
                      onClick={() => updateUser(user.id)}
                      className="edit-user-btn"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  )}
                  {mode === "delete" && (
                    <Button
                      onClick={() => deleteUser(user.id)}
                      className="delete-user-btn"
                    >
                      {" "}
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
            {/*Show back button only when in add/edit/delete mode*/}
            {mode && (
              <Button
                onClick={() => navigate("/dashboard")}
                className="back-button"
              >
                Back to Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ApiDemo;
