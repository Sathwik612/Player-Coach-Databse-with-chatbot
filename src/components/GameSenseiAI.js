import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./GameSenseiAI.css"; // Ensure this file exists

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
    
    if (!playerId) {
      console.error("❌ No playerId provided!");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Player ID missing. Cannot process request." },
      ]);
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      console.log("🚀 Sending request to AI Chatbot:", { message: input, playerId });

      const response = await axios.post("http://localhost:5000/api/chatbot", {
        message: input,
        playerId,
      });
      console.log("🚀 Sending request to AI Chatbot:", { message: input, playerId });


      console.log("✅ AI Reply:", response.data);

      if (!response.data || !response.data.reply) {
        throw new Error("Empty AI response");
      }

      const aiReply = { role: "assistant", content: response.data.reply };
      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error("❌ AI Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
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
