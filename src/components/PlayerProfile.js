import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PlayerProfile.css";

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        console.log("🚀 Fetching player details for ID:", id);
        const response = await axios.get(`http://localhost:5000/api/players/${id}`);
        setPlayer(response.data);
      } catch (err) {
        console.error("❌ Error fetching player details:", err);
        setError("Error fetching player details");
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    console.log("📤 Sending message to AI:", chatInput);

    // Add user message to chat
    const updatedChat = [...chatHistory, { role: "user", content: chatInput }];
    setChatHistory(updatedChat);

    try {
      const response = await axios.post("http://localhost:5000/api/chatbot", {
        message: chatInput,
      });
      console.log("✅ AI Response:", response.data);

      const botReply = response.data.reply;
      setChatHistory([...updatedChat, { role: "assistant", content: botReply }]);
    } catch (err) {
      console.error("❌ Chatbot request failed:", err);
      setChatHistory([
        ...updatedChat,
        { role: "assistant", content: "⚠️ AI response failed. Try again later." },
      ]);
    }

    setChatInput("");
  };

  if (loading) return <p>Loading player details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      {/* Top: Centered Player Description */}
      <div className="player-top">
        <div className="player-card">
          <img
            src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${player.name}`}
            alt="Player"
          />
          <h2>{player.name}</h2>
          <p>
            <strong>Position:</strong> {player.position}
          </p>
          <p>
            <strong>Height:</strong> {player.height} cm
          </p>
          <p>
            <strong>Weight:</strong> {player.weight} kg
          </p>
          <p>
            <strong>Diet Plan:</strong> {player.dietPlan}
          </p>
          <p>
            <strong>Training Plan:</strong> {player.trainingPlan}
          </p>
          <p>
            <strong>Performance:</strong> {player.performanceReview}
          </p>
        </div>
      </div>

      {/* Bottom: Larger Chat Interface, Centered */}
      <div className="chat-bottom">
        <h3>GameSensei AI</h3>
        <div className="chat-box">
          {chatHistory.map((msg, index) => (
            <p key={index} className={msg.role}>
              {msg.content}
            </p>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask GameSensei AI..."
          />
          <button onClick={handleChatSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
