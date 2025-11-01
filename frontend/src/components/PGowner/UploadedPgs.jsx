import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './UploadedPgs.css';
import { UserContext } from '../../context/UserContext.jsx';

const UploadedPgs = () => {
  const { user } = useContext(UserContext);
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPgs = async () => {
      if (!user) return;
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiBaseUrl}/api/pgs/my-pgs?email=${user.email}`);
        setPgs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch PGs.');
        setLoading(false);
      }
    };

    fetchPgs();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${apiBaseUrl}/api/pgs/${id}`);
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
                {pg.images && pg.images.map((url, index) => {
                  const apiBaseUrl = import.meta.env.VITE_API_URL;
                  return <img key={index} src={`${apiBaseUrl}/${url.replace(/^\//, '')}`} alt={`${pg.name} preview ${index + 1}`} />;
                })}
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
