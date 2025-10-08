import React from 'react';
import './Profile.css';

const Profile = () => {
  // Placeholder for profile data
  const userProfile = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    memberSince: '2023-01-15',
    avatar: 'https://via.placeholder.com/150'
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={userProfile.avatar} alt="User Avatar" className="profile-avatar" />
        <h2 className="profile-name">{userProfile.name}</h2>
        <p className="profile-email">{userProfile.email}</p>
        <p className="profile-member-since">Member since: {userProfile.memberSince}</p>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
