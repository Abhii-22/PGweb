import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="dashboard-navbar">
      <div className="navbar-header">
        <h2>PG Manager</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/pg-owner/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/pg-owner/pg-form">PG Form</Link>
        </li>
        <li>
          <Link to="/pg-owner/uploaded-form">Uploaded Form</Link>
        </li>
        <li>
          <Link to="/pg-owner/profile">Profile</Link>
        </li>
      </ul>
      <div className="navbar-footer">
        <Link to="/login">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
