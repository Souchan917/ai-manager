// src/components/Chat.js
import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';  // 新しいCSSファイルを作成します

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = { sender: 'user', text: message };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setMessage('');
    setIsTyping(true);

    try {
      const res = await axios.post('/api/chat', { message });
      const aiMessage = {
        sender: 'ai',
        text: res.data.choices[0].message.content,
      };
      setChatHistory([...updatedHistory, aiMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>✨ そうたのAIマネージャー ✨</h2>
        <p className="subtitle">今日も一緒にがんばろう！</p>
      </header>

      <div className="chat-messages">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <div className="message-bubble">
              {msg.sender === 'ai' && <span className="ai-icon">🎀</span>}
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message ai">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="メッセージを入力してね...♪"
          className="message-input"
        />
        <button onClick={sendMessage} className="send-button">
          送信 💝
        </button>
      </div>
    </div>
  );
};

export default Chat;
