import React, { useContext, useState } from 'react';
import './Profile.css';
import { UserContext } from '../../context/UserContext.jsx';
import { Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  // Placeholder for profile data
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Doe',
    email: user ? user.email : 'alex.doe@example.com',
    memberSince: '2023-01-15',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    bio: 'PG owner with a passion for providing quality living spaces.',
    phone: '123-456-7890',
    location: 'New York, USA'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="profile-page-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            <Edit size={18} /> Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button onClick={() => setIsEditing(false)} className="cancel-button">
              <X size={18} /> Cancel
            </button>
            <button onClick={() => setIsEditing(false)} className="save-button">
              <Save size={18} /> Save
            </button>
          </div>
        )}
      </div>
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="avatar-section">
            <img src={userProfile.avatar} alt="User Avatar" className="profile-avatar-large" />
            {isEditing ? (
              <input type="file" className="avatar-upload" />
            ) : null}
          </div>
          <div className="user-details">
            <h2>{userProfile.name}</h2>
            <p className="member-since">Member since {userProfile.memberSince}</p>
          </div>
        </div>
        <div className="profile-main">
          <div className="profile-section">
            <h3>About Me</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={userProfile.bio}
                onChange={handleInputChange}
                className="bio-textarea"
              />
            ) : (
              <p>{userProfile.bio}</p>
            )}
          </div>
          <div className="profile-section">
            <h3>Contact Information</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={18} />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userProfile.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userProfile.email}</p>
                )}
              </div>
              <div className="contact-item">
                <Phone size={18} />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={userProfile.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userProfile.phone}</p>
                )}
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={userProfile.location}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userProfile.location}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
