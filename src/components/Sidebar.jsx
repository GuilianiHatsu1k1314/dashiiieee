import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <h3>📂 Menu</h3>
      <ul>
        <li><Link to="crud">CRUD</Link></li>
        <li><Link to="report">Report</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
