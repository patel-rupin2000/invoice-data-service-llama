import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { askQuestion } from '../redux/actions';
import './Chat.css'; 

const Chat = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showEllipsis, setShowEllipsis] = useState(false);
  const dispatch = useDispatch();
  const answer = useSelector(state => state.answer);

  const formatBotResponse = useCallback((response) => {
    console.log("response", response);
    const { asked_question, answer } = response;
    return `Answer: ${answer}`;
  }, []);

  const handleSubmit = () => {
    if (!question) return; 
    
    setConversation([...conversation, { text: question, type: 'user' }]);
    dispatch(askQuestion(question, false)); 
    setQuestion('');
    setShowEllipsis(true);
  };

  useEffect(() => {
    console.log("answer.answer", answer.answer)
    if (answer && answer.answer !== undefined) {
      setIsBotTyping(true);
      const typingTimer = setTimeout(() => {
        const botResponse = formatBotResponse(answer);
        setConversation(prevConversation => [...prevConversation, { text: botResponse, type: 'bot' }]);
        setIsBotTyping(false);
        setShowEllipsis(false); 
      }, 1500); 
  
      return () => clearTimeout(typingTimer);
    }
  }, [answer]);

  useEffect(() => {
    if (!isBotTyping) {
      const chatContainer = document.getElementById('chat-container');
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [conversation, isBotTyping]);

  return (
    <div className="chat-container" id="chat-container">
      {conversation.map((message, index) => (
        <div key={index} className={`message ${message.type}`}>
          {message.text}
        </div>
      ))}
    
      {showEllipsis && (
        <div className="message bot typing">
          <span className="ellipsis">...</span>
        </div>
      )}
      <div className="input-container">
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
