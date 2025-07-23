import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={{ width: '200px', background: '#eee', padding: '20px' }}>
      <h3>📂 Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="crud">CRUD</Link></li>
        <li><Link to="report">Report</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
