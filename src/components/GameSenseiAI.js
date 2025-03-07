import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./GameSenseiAI.css"; // Ensure this file exists with your provided CSS

const GameSenseiAI = ({ playerId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chatbot", {
        message: input,
        playerId: playerId, // Send player ID to store AI insights
      });

      const aiReply = { role: "assistant", content: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, aiReply]);
    } catch (error) {
      console.error("AI Chatbot Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "⚠️ AI response failed. Try again later." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="ai-chat-container">
      <h2>GameSensei AI</h2>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <p key={index} className={msg.role}>
            {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask GameSensei AI..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default GameSenseiAI;
