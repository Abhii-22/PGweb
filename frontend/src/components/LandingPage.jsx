import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Header from './Header.jsx';

const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="landing-container">
      <div className="content-section">
        <h1>Welcome to PG Finder</h1>
        <p>Your one-stop solution to find the perfect paying guest accommodation.</p>
        <Link to="/home" className="enter-btn">
          Find Your PG
        </Link>
      </div>
      <div className="image-section">
        <img src="/building-wallpaper.jpeg" alt="Building 1" className="landing-image image-1" />
        <img src="/home-image.jpg" alt="Building 2" className="landing-image image-2" />
        <img src="/badmiton.jpg" alt="Building 3" className="landing-image image-3" />
      </div>
    </div>
    </>
  );
};

export default LandingPage;
