import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/sidebar.css';
function Sidebar() {
  return (
    <div className='dashboard-wrapper'>
      <div className='sidebar-container'>
        <h3>📂 Menu</h3>
        <ul>
          <li><Link to="crud">CRUD</Link></li>
          <li><Link to="report">Report</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
