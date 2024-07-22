import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import JoinForm from './components/join';
import Main from './components/main';
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import RealHome from './components/RealHome';

import './App.css';
import DiaryList from './components/DiaryList';
import DiaryWrite from './components/DiaryWrite';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/join" element={<JoinForm />} />
        <Route path="/postform" element={<PostForm/>}/> 
        <Route path="/main/:id" element={<Main />} />
        <Route path="/post" element={<PostList/>}/>
        <Route path="/post/:id" element={<PostDetail />}/>
        <Route path="/" element={<RealHome/>}/>
        <Route path="diary" element={<DiaryList/>}/>
        <Route path="/write/:id" element={<DiaryWrite />} />
      </Routes>
    </Router>
  );
};

export default App;
