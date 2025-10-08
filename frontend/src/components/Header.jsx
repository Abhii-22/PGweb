import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/Medini logo White.png';

const Header = () => {
  return (
    <header className="landing-header">
      <nav className="nav-links">
        <Link to="/login" className="login-btn">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
