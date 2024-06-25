import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/PostDetail.css'; // 필요에 따라 CSS 파일을 추가하세요

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
        if(data.isSecrete==false)
            {
                setAuthenticated(true);
            }
    
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      id: id,
      password: password,
    };

    try {
      const response = await fetch('/api/post/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setAuthenticated(true);
        setShowPasswordForm(false);
      } else {
        console.error('Password verification failed:', response.statusText);
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPasswordForm = () => {
    setShowPasswordForm(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="post-detail-container">
      {authenticated ? (
        <div>
          <h1>{post.nickname}</h1>
          <p>{post.content}</p>
          <p>{post.isSecrete ? 'Secret' : 'Public'}</p>
        </div>
      ) : (
        <div>
          <h1>Authentication Required</h1>
          {showPasswordForm ? (
            <form onSubmit={handlePasswordSubmit}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button type="submit">Submit</button>
            </form>
          ) : (
            <button onClick={handleShowPasswordForm}>Enter Password</button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
