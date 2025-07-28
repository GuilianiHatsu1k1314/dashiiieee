import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/styles/sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <nav className='sidebar-container'>
      <h3>Menu</h3>
      <ul>
        <li><NavLink to="report" className='sidebar-item'>Report</NavLink></li>
      </ul>

      {/* Sign Out Button at Bottom */}
      <div className="sidebar-footer">
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
