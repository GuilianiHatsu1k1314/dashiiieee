import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/sidebar.css';
function Sidebar() {
  return (
    <nav className='sidebar-container'>
      <h3>📂 Menu</h3>
      <ul>
        <li><Link to="crud" className='sidebar-item'>CRUD</Link></li>
        <li><Link to="report" className='sidebar-item'>Report</Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
