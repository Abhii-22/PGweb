import React, { useState } from 'react';
import axios from 'axios';
import './TenantForm.css';

const TenantForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    aadharCard: '',
    sharing: '',
    amount: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const nextStep = () => setStep(prev => (prev < 2 ? prev + 1 : prev));
  const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev));
  const goToStep = (stepNumber) => setStep(stepNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      alert('You must be logged in to add a tenant.');
      return;
    }

    const tenantData = {
      ...formData,
      pgOwner: user._id,
    };

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiBaseUrl}/tenants`, tenantData);
      alert('Tenant details submitted successfully!');
      setFormData({ name: '', email: '', phoneNumber: '', aadharCard: '', sharing: '', amount: '', date: '' });
      setStep(1);
    } catch (error) {
      console.error('Error submitting tenant details:', error);
      alert(`Failed to submit details: ${error.response?.data?.message || 'Server error'}`);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="form-group">
              <label htmlFor="aadharCard">Aadhar Card Number</label>
              <input type="number" id="aadharCard" name="aadharCard" value={formData.aadharCard} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="sharing">Sharing</label>
              <select id="sharing" name="sharing" value={formData.sharing} onChange={handleChange} required>
                <option value="">Select Sharing Type</option>
                <option value="1">Single</option>
                <option value="2">2 Sharing</option>
                <option value="3">3 Sharing</option>
                <option value="4">4 Sharing</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date">Joining Date</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Monthly Amount (₹)</label>
              <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} required />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tenant-form-container">
      <form className="tenant-form" onSubmit={handleSubmit}>
        <h2>Tenant Registration</h2>
        <div className="step-indicator">
          <div className={`step ${step === 1 ? 'active' : ''}`} onClick={() => goToStep(1)}>
            Personal Details
          </div>
          <div className={`step ${step === 2 ? 'active' : ''}`} onClick={() => goToStep(2)}>
            Stay & ID Details
          </div>
        </div>

        <div className="form-step">
          {renderStep()}
        </div>

        <div className="form-navigation">
          {step > 1 && <button type="button" className="prev-btn" onClick={prevStep}>Previous</button>}
          {step < 2 && <button type="button" className="next-btn" onClick={nextStep}>Next</button>}
          {step === 2 && <button type="submit" className="submit-btn">Submit Details</button>}
        </div>
      </form>
    </div>
  );
};

export default TenantForm;
