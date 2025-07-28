import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/styles/sidebar.css';
//Applied the crud functions as options in the side bar component.
function Sidebar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <nav className='sidebar-container'>
      <h3>Menu</h3>
      <ul>
        {/*Added query parameters for distinction in crud.*/}
        <li>
          <NavLink to="/dashboard/add?mode=add" className="sidebar-item">
            <i className="fa-solid fa-user-plus"></i> &nbsp;Add User
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/edit?mode=edit" className="sidebar-item">
            <i className="fa-solid fa-user-pen"></i> &nbsp;Edit User
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/delete?mode=delete" className="sidebar-item">
            <i className="fa-solid fa-user-minus"></i> &nbsp;Delete User
          </NavLink>
        </li>

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
