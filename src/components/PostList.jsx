import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../css/PostList.css';
import PostForm from './PostForm';
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/postAll/${id}`);
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
      <h1>방명록</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item" onClick={() => handlePostClick(post.id)}>
            {post.isSecrete ? (
              <div>
                <p>비밀글입니다.</p>
               
              </div>
            ) : (
              <div>
                <h2>{post.nickname}</h2>
                <p>{post.content}</p>
              </div>
            )}
          
          </li>
        ))}
      </ul>
      <PostForm></PostForm>
    </div>
  );
};

export default PostList;
