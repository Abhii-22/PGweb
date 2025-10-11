import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { UserContext } from '../context/UserContext.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
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
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/pg-owner/dashboard');
      } catch (error) {
        alert(error.response?.data?.message || 'Login failed');
      }
    } else {
      // User login logic remains unchanged for now
      try {
        const resp = await fetch('http://localhost:5000/api/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        if (resp.ok) {
          navigate('/home');
        } else {
          const data = await resp.json().catch(() => ({}));
          alert(data.message || 'User login failed');
        }
      } catch (err) {
        alert('User login failed');
      }
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
