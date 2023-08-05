// src/RegisterForm.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './RegisterForm.css'; // Import the RegisterForm.css file for styling

const RegisterForm = ({ isOpen, onRequestClose, onRegister, onLogin, isLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Handle registration logic here
    onRegister(username, email, password);
  };

  const handleLogin = () => {
    // Handle login logic here
    onLogin(email, password);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
    >
      <h2>{isLogin ? 'Login' : 'Register New User'}</h2>
      <form>
        {!isLogin && (
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='action'>
          <button type="button" onClick={isLogin ? handleLogin : handleRegister}>
            {isLogin ? 'Login' : 'Register'}
          </button>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RegisterForm;
