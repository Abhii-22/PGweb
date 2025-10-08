import React from 'react';
import Navbar from './Navbar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <h1>PG Owner Dashboard</h1>
        <p>Welcome to your dashboard. Manage your properties and view analytics here.</p>
        {/* Add dashboard components here */}
      </div>
    </div>
  );
};

export default Dashboard;
