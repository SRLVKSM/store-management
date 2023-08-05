// src/Body.js
import React from 'react';
import './Body.css'; // Import the Body.css file for styling

const Body = ({ isLoggedIn, onRegister, onLogin }) => {
  return (
    <div className="body-container">
      {isLoggedIn ? (
        // Content to show when the user is logged in
        <div>
          <h2>Welcome back, User!</h2>
          <p>Start managing your store items now.</p>
          {/* Add additional content for logged-in users here */}
        </div>
      ) : (
        // Content to show when the user is not logged in
        <div>
          <h2>Welcome to our Store!</h2>
          <p>Register or log in to start managing your store items.</p>
          <button className="cta-button" onClick={onRegister}>Register</button>
          <button className="cta-button" onClick={onLogin}>Log In</button>
          {/* Add additional content for non-logged-in users here */}
        </div>
      )}
    </div>
  );
};

export default Body;
