import React, { useState } from 'react';
import '../css/join.css';

const JoinForm = ({onFormToggle}) => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            email: email,
            nickname: nickname,
            password: password
        };

        try {
            const response = await fetch('/api/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Successfully joined! Welcome ' + result.nickname);
                // 성공 시 페이지 이동 또는 다른 작업 수행
            } else {
                const errorData = await response.json();
                alert('Error: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while joining.');
        }
    };

    return (
        <div className="join-container">
            <h1>Join Us</h1>
            <form className="join-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                /><br/><br/>

                <label htmlFor="nickname">Nickname:</label>
                <input 
                    type="text" 
                    id="nickname" 
                    name="nickname" 
                    value={nickname} 
                    onChange={(e) => setNickname(e.target.value)} 
                    required 
                /><br/><br/>

                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                /><br/><br/>

                <button type="submit">Join</button>
             
            </form>
            <button onClick={onFormToggle}>go to Login</button>
        </div>
    );
};

export default JoinForm;
