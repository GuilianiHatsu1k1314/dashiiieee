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
        <li>
          <NavLink to="/dashboard/report" className='sidebar-item'>
            <i className="fa-regular fa-file"></i> &nbsp;Report
          </NavLink>
        </li>

        <li>
          <button onClick={handleSignOut} className="signout-button">
            Sign Out
          </button>
        </li>
        
      </ul>
    </nav>
  );
}

export default Sidebar;
