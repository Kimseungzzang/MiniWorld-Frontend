// src/components/Main.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure jwtDecode is imported correctly
import LoginForm from './LoginForm';
import JoinForm from './join'; // Ensure the filename case matches
import '../css/main.css';


const RealHome = () => {

    const [nickname, setNickname] = useState('');
    const [id,setId]=useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      setNickname(decoded.nickname);
      setId(decoded.memberId);
      console.log(nickname);
      console.log(id);
    }
  }, [nickname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setNickname('');
    window.location.reload();  // Refresh the page to show the login form again
  };

  const handleMypage=()=>{
    navigate(`main/${id}`)
  }

  const handleFormToggle = () => {
    setShowLoginForm((prev) => !prev);
  };

   
    return (
        <div className='home-container' >
      <div className='user-content'>
        <div className="username-display">
          {nickname ? `Welcome, ${nickname}` : 'Not logged in'}
        </div>
        {nickname && <button onClick={handleLogout}>Logout</button>}
        {nickname && <button onClick={handleMypage}>내 다이어리 가기 </button>}
        {!nickname && showLoginForm && <LoginForm onFormToggle={handleFormToggle} />}
        {!nickname && !showLoginForm && <JoinForm onFormToggle={handleFormToggle} />}
        
      </div>
      
      </div>
    );
  };
  
  export default RealHome;