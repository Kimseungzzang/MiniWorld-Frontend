import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/DiaryCalendar.css';
import moment from 'moment';
import '../css/DiaryList.css';

const DiaryList = () => {
  const [diaries, setDiaries] = useState([]);
  const [filteredDiaries, setFilteredDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/diaryAll/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDiaries(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  const handleDateChange = (date) => {
    const filteredDiaries = diaries.filter(diary => {
      return moment(diary.time).isSame(date, 'day');
    });
    setFilteredDiaries(filteredDiaries);
  };

  const handleWriteClick = () => {
    navigate(`/write/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Determine if the "write" button should be visible
  const showWriteButton = filteredDiaries.length === 0;

  return (
    <div className="diary-list-container">
      <h1>다이어리</h1>
      <div className="content-container">
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={new Date()}
            tileClassName={({ date }) => {
              const eventDates = diaries.map(diary => new Date(diary.time));
              return eventDates.some(eventDate => moment(eventDate).isSame(date, 'day')) ? 'event-date' : null;
            }}
          />
        </div>
        <div className="filtered-diaries-container">
          {filteredDiaries.length > 0 && (
            <div className="filtered-diaries">
              <h2>선택된 날짜의 다이어리</h2>
              <ul>
                {filteredDiaries.map((diary, index) => (
                  <li key={index}>
                    <h3>{moment(diary.time).format('YYYY-MM-DD')}</h3>
                    <p>{diary.content}</p>
                    {diary.image && <img src={diary.image} alt="Diary" />}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showWriteButton && (
            <button className="write-button" onClick={handleWriteClick}>
              글쓰기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryList;