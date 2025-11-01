import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext.jsx';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'user',
  });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.userType === 'pgOwner') {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL;
        const response = await axios.post(`${apiBaseUrl}/api/auth/register`, {
          email: formData.email,
          password: formData.password,
        });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/pg-owner/dashboard');
      } catch (error) {
        alert(error.response?.data?.message || 'Registration failed');
      }
    } else {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL;
        const response = await axios.post(`${apiBaseUrl}/api/auth/register/user`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/home');
      } catch (error) {
        alert(error.response?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <h2 className="signup-title">Create an Account</h2>
        <p className="signup-subtitle">Join us and find your perfect PG!</p>
        <form onSubmit={handleSubmit} className="signup-form">
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
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
