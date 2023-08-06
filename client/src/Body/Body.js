// src/Body.js
import React from 'react';
import './Body.css'; // Import the Body.css file for styling
import StoreTable from '../StoreTable';

const Body = ({ isLoggedIn, onRegister, onLogin }) => {
  return (
    <div className="body-container">
      {isLoggedIn ? (
        // Content to show when the user is logged in
        <StoreTable />
      ) : (
        <div className='landing-page'>
          <div className='content'>
            <h2>Welcome to our Store!</h2>
            <p>Register or log in to start managing your store items.</p>
            <div className='action'>
              <button className="cta-button" onClick={onRegister}>Register</button>
              <button className="cta-button" onClick={onLogin}>Log In</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
