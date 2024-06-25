import React, { useState } from 'react';
import '../css/PostForm.css';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [isSecrete, setIsSecrete] = useState(false);
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      isSecrete,
      content,
      password, // 추가된 비밀번호 필드
    };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log('Post created successfully');
      } else {
        console.error('Failed to create post:', response.statusText);
        alert('로그인 후 이용하세요');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="post-form-container">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isSecrete}
              onChange={(e) => setIsSecrete(e.target.checked)}
            />
            Private
          </label>
          {isSecrete && (
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
