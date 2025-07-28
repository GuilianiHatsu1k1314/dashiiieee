import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/sidebar.css';
function Sidebar() {
  return (
    <nav className='sidebar-container'>
      <h3>Menu</h3>
      <ul>
        <li><NavLink to="crud" className='sidebar-item'>CRUD</NavLink></li>
        <li><NavLink to="report" className='sidebar-item'>Report</NavLink></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
