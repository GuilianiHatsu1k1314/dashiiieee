import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../assets/styles/dashboard.css";

function Dashboard({ user }) {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="content">
        <h2>
          Welcome, <span style={{ color: "teal" }}>{user}</span>!
        </h2>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
