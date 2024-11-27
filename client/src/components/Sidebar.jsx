import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="dashboard-sidebar">
      <ul>
        <li><NavLink to="/dashboard" activeClassName="active">My Page</NavLink></li>
        <li><NavLink to="/uploads" activeClassName="active">My Uploads</NavLink></li>
        <li><NavLink to="/logout" activeClassName="active">Logout</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
