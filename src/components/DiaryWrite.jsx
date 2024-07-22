// src/components/DiaryWrite.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/DiaryWrite.css';

const DiaryWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 현재 시간을 ISO 문자열로 가져오기
    const currentDateTime = new Date().toISOString();

    // Base64로 변환된 이미지 문자열
    let base64Image = null;
    if (image) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        base64Image = reader.result.split(',')[1]; // 'data:image/jpeg;base64,' 부분 제거

        // JSON 데이터 생성
        const data = {
          title,
          content,
          time: currentDateTime,
          image: base64Image
        };

        try {
          const response = await fetch(`/api/diary`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,

            },
            body: JSON.stringify(data)
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          navigate(`/main/${id}`);
        } catch (err) {
          console.error('Failed to submit diary:', err);
        }
      };
      reader.readAsDataURL(image);
    } else {
      // 이미지가 없는 경우
      const data = {
        title,
        content,
        dateTime: currentDateTime
      };

      try {
        const response = await fetch(`/api/diary/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        
      } catch (err) {
        console.error('Failed to submit diary:', err);
      }
    }
  };

  return (
    <div className="diary-write-container">
      <h1>새로운 다이어리 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">이미지:</label>
          <input type="file" id="image" onChange={handleImageChange} />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="이미지 미리보기" />
            </div>
          )}
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default DiaryWrite;