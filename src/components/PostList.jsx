import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/post');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="post-list-container">
      <h1>All Posts</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item" onClick={() => handlePostClick(post.id)}>
            {post.isSecrete ? (
              <div>
                <p>Content is hidden</p>
                <p>Nickname is hidden</p>
              </div>
            ) : (
              <div>
                <h2>{post.nickname}</h2>
                <p>{post.content}</p>
              </div>
            )}
            <p>{post.isSecrete ? 'Secret' : 'Public'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
