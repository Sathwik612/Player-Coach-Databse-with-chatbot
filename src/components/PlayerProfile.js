import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PlayerProfile.css"; // Ensure you create this CSS file

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
                const response = await axios.get(`http://localhost:5000/api/players/${id}`);
                setPlayer(response.data);
            } catch (err) {
                setError("Error fetching player details");
            } finally {
                setLoading(false);
            }
        };
        fetchPlayer();
    }, [id]);

    const handleChatSubmit = async () => {
        if (!chatInput.trim()) return;
        
        // Add user message to chat history
        const updatedChat = [...chatHistory, { role: "user", content: chatInput }];
        setChatHistory(updatedChat);

        try {
            const response = await axios.post("http://localhost:5000/api/chatbot", { message: chatInput });
            const botReply = response.data.reply;

            // Add AI response to chat history
            setChatHistory([...updatedChat, { role: "assistant", content: botReply }]);

            // If AI suggests a tactical change, update the database
            if (chatInput.toLowerCase().includes("change tactics")) {
                await axios.put(`http://localhost:5000/api/players/${id}`, { trainingPlan: botReply });
                setPlayer((prev) => ({ ...prev, trainingPlan: botReply }));
            }
        } catch (err) {
            console.error("Chatbot request failed", err);
        }

        setChatInput("");
    };

    if (loading) return <p>Loading player details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="player-profile-container">
            <div className="player-card">
                <img src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${player.name}`} alt="Player" />
                <h2>{player.name}</h2>
                <p><strong>Position:</strong> {player.position}</p>
                <p><strong>Height:</strong> {player.height} cm</p>
                <p><strong>Weight:</strong> {player.weight} kg</p>
                <p><strong>Diet Plan:</strong> {player.dietPlan}</p>
                <p><strong>Training Plan:</strong> {player.trainingPlan}</p>
                <p><strong>Performance:</strong> {player.performanceReview}</p>
            </div>

            <div className="ai-chat-container">
                <h3>GameSensei AI</h3>
                <div className="chat-box">
                    {chatHistory.map((msg, index) => (
                        <p key={index} className={msg.role}>{msg.content}</p>
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
