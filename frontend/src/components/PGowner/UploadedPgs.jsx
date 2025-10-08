import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadedPgs.css';

const UploadedPgs = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPgs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pgs');
        setPgs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch PGs.');
        setLoading(false);
      }
    };

    fetchPgs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pgs/${id}`);
      setPgs(pgs.filter(pg => pg._id !== id));
    } catch (error) {
      console.error('Failed to delete PG:', error);
      alert('Failed to delete PG.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="uploaded-pgs-container">
      <h2>My Uploaded PGs</h2>
      <div className="pg-list">
        {pgs.length > 0 ? (
          pgs.map(pg => (
            <div key={pg._id} className="pg-card">
              <h3>{pg.name}</h3>
              <p className="pg-address">{pg.location}</p>
              <p className="pg-rent">Rent: ₹{pg.price}/month</p>
              <div className="image-previews">
                {pg.images && pg.images.map((url, index) => (
                  <img key={index} src={url} alt={`${pg.name} preview ${index + 1}`} />
                ))}
              </div>
              <div className="card-actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(pg._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>You haven't uploaded any PGs yet.</p>
        )}
      </div>
    </div>
  );
};

export default UploadedPgs;
