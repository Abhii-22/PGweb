import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
          console.error('No user ID found in local storage');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/tenants?pgOwnerId=${user._id}`);
        setTenants(response.data);
      } catch (error) {
        console.error('Failed to fetch tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <h1>Tenant Dashboard</h1>
          <p>An overview of all registered tenants.</p>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Tenants</h3>
            <p className="stat-value">{tenants.length}</p>
          </div>
        </section>

        <section className="tenant-list-section">
          <h2>All Tenant Details</h2>
          {tenants.length > 0 ? (
            <table className="tenant-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Aadhar Card</th>
                  <th>Sharing</th>
                  <th>Amount (₹)</th>
                  <th>Joining Date</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map(tenant => (
                  <tr key={tenant._id}>
                    <td>{tenant.name}</td>
                    <td>{tenant.email}</td>
                    <td>{tenant.phoneNumber}</td>
                    <td>{tenant.aadharCard}</td>
                    <td>{tenant.sharing}</td>
                    <td>{tenant.amount}</td>
                    <td>{tenant.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tenant details have been added yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
