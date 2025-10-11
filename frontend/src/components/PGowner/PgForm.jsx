import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.jsx';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import areasData from '../../data/pgData.js';
import './PgForm.css';
import { motion } from 'framer-motion';

const PgForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    name: '',
    images: [],
    price: '',
    sharing: '',
    rating: '',
    gender: 'Boys',
    location: '',
    description: '',
    facilities: '',
    area: areasData[0]?.name || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setForm(prevForm => ({ ...prevForm, images: [...prevForm.images, response.data.imageUrl] }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'] },
    multiple: true
  });

  const removeImage = (index) => {
    setForm(prevForm => ({
        ...prevForm,
        images: prevForm.images.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setForm({
      name: '', images: [], price: '', sharing: '', rating: '', gender: 'Boys',
      location: '', description: '', facilities: '', area: areasData[0]?.name || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pgData = {
      ...form,
      facilities: Array.isArray(form.facilities) ? form.facilities : form.facilities.split(',').map(s => s.trim()),
      price: Number(form.price),
      rating: Number(form.rating),
      ownerEmail: user.email,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/pgs', pgData);
      alert('New PG added!');
      resetForm();
    } catch (error) {
      console.error('Error saving PG:', error);
      alert('Failed to save PG.');
    }
  };

  return (
    <div className="upload-page">
      <button onClick={() => navigate(-1)} className="back-button" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: '10' }}>Back</button>
      <div className="background-anim-container">
        <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1170" alt="Background 1" />
        <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1170" alt="Background 2" />
        <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1170" alt="Background 3" />
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170" alt="Background 4" />
      </div>
      <main className="upload-main-content">
        <motion.div 
          className="form-container"
          initial={{ opacity: 0, y: 60, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2>Add a New PG</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label>PG Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter PG Name" required />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Enter Location" required />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
                </div>
                <div className="form-group">
                    <label>Sharing</label>
                    <input type="text" name="sharing" value={form.sharing} onChange={handleChange} placeholder="e.g., 1, 2, 3" required />
                </div>
                 <div className="form-group">
                    <label>Rating</label>
                    <input type="number" step="0.1" name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange}>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                 <div className="form-group">
                    <label>Area</label>
                    <select name="area" value={form.area} onChange={handleChange}>
                        {areasData.map(area => (
                            <option key={area.name} value={area.name}>{area.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-group">
              <label>Images</label>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <div className="image-previews">
                {form.images.map((url, index) => (
                  <div key={index} className="image-preview">
                    <img src={url} alt={`preview ${index}`} />
                    <button type="button" onClick={() => removeImage(index)} className="btn-remove-img">Remove</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
                <label>Facilities</label>
                <input type="text" name="facilities" value={form.facilities} onChange={handleChange} placeholder="Facilities (comma-separated)" />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"></textarea>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-submit">Add PG</button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default PgForm;
