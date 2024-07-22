// src/components/Main.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/main.css';

import Home from './home';
import PostList from './PostList';
import DiaryList from './DiaryList';

const Main = () => {
  
  const [currentPage, setCurrentPage] = useState('home'); // State for current page


  const handleButtonClick = (page) => {
    setCurrentPage(page); // Set current page based on button click
  };

  const renderContent = () => {
    if (currentPage === 'home') {
      return <Home />;
    } else if(currentPage==='guestbook'){
      return (
        <PostList></PostList>
      );
    }
    else if(currentPage==='diary'){
      return (
        <DiaryList/>
      );
    }
  };

  return (
    <div className="main-container">
      <div className="content">
      {renderContent()}
      </div>
      <div className='button-container'>
            <button onClick={() => handleButtonClick('home')}>홈</button>
            <button onClick={() => handleButtonClick('profile')}>프로필</button>
            <button onClick={() => handleButtonClick('diary')}>다이어리</button>
            <button onClick={() => handleButtonClick('jukebox')}>쥬크박스</button>
            <button onClick={() => handleButtonClick('guestbook')}>방명록</button>
          </div>
      <img src="/images/background.png" alt="Overlay" className="overlay-image" />
    </div>
  );
};

export default Main;