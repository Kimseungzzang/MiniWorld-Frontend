// src/components/Main.js
import React, { useState, useEffect } from 'react';
import {useParams,useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure jwtDecode is imported correctly
import LoginForm from './LoginForm';
import JoinForm from './join'; // Ensure the filename case matches
import '../css/main.css';


const Home = () => {
  const { id } = useParams();
    const [nickname, setNickname] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate=useNavigate();
  

  useEffect(() => {
    fetchUser();
    
  },[]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/user/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNickname(data.nickname);
    } catch (err) {
    
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    setNickname('');
    window.location.reload();  // Refresh the page to show the login form again
  };

  const handleFormToggle = () => {
    setShowLoginForm((prev) => !prev);
  };

   
    return (
        <div className='home-container' >
      <div className='user-content'>
        {nickname}
      </div>
  
      <div className='main-content'>
        <p>Main content goes here.</p>
      </div>
      </div>
    );
  };
  
  export default Home;