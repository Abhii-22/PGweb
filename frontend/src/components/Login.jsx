import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import pgOwnerCredentials from './pgOwnerCredentials';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.userType === 'pgOwner') {
      const owner = pgOwnerCredentials.find(
        (cred) => cred.email === formData.email && cred.password === formData.password
      );

      if (owner) {
        // Redirect to PG Owner Dashboard
        navigate('/pg-owner/dashboard');
      } else {
        alert('Invalid credentials for PG Owner');
      }
    } else {
      // For now, we'll just redirect to the home page on submit for users.
      console.log(formData);
      navigate('/home');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please enter your details to log in.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={formData.userType === 'user'}
                  onChange={handleChange}
                  className="radio-input"
                />
                User
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="userType"
                  value="pgOwner"
                  checked={formData.userType === 'pgOwner'}
                  onChange={handleChange}
                  className="radio-input"
                />
                PG Owner
              </label>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
