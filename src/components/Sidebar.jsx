import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/sidebar.css';
function Sidebar() {
  return (
    <nav className='sidebar-container'>
      <h3>📂 Menu</h3>
      <ul>
        <li><div className='sidebar-item'><Link to="crud">CRUD</Link></div></li>
        <li><div className='sidebar-item'><Link to="report">Report</Link></div></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
