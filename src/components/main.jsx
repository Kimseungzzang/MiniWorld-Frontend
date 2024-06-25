// src/components/Main.js
import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure jwtDecode is imported correctly
import LoginForm from './LoginForm';
import JoinForm from './join';
import '../css/main.css';

const Main = () => {
  const [nickname, setNickname] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      setNickname(decoded.nickname);
      console.log(nickname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setNickname('');
    window.location.reload();  // Refresh the page to show the login form again
  };

  const handleFormToggle = () => {
    setShowLoginForm((prev) => !prev);
  };

  return (
    <div className="main-container">
      <div className="username-display">
        {nickname ? `Welcome, ${nickname}` : 'Not logged in'}
      </div>
      {nickname && <button onClick={handleLogout}>Logout</button>}
      {!nickname && showLoginForm && <LoginForm onFormToggle={handleFormToggle}/>}
      {!nickname && !showLoginForm && <JoinForm onFormToggle={handleFormToggle}/>}
      
      <h1>Welcome to Our Service</h1>
    </div>
  );
};

export default Main;
