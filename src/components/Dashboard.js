import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardMedia, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const DashboardContainer = styled(Container)({
  marginTop: "20px",
  textAlign: "center",
});

const PlayerCard = styled(Card)({
  maxWidth: 300,
  margin: "20px auto",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const Dashboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const coachId = localStorage.getItem("coachId"); // 🔹 Retrieve coachId from localStorage

    if (!coachId) {
      console.error("❌ No coachId found! Redirecting to login.");
      navigate("/");
      return;
    }

    const fetchPlayers = async () => {
      try {
        console.log(`🚀 Fetching players for Coach ID: ${coachId}`);

        const response = await axios.get(`http://localhost:5000/api/players?coachId=${coachId}`);
        console.log("✅ Players received:", response.data);

        setPlayers(response.data);
      } catch (error) {
        console.error("❌ Error fetching players:", error.response ? error.response.data : error.message);
        setError("Failed to load players. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [navigate]);

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Team Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Player Cards */}
      <DashboardContainer>
        <Typography variant="h4" gutterBottom>
          Your Players
        </Typography>

        {loading ? (
          <CircularProgress color="primary" /> // Show loading indicator
        ) : error ? (
          <Typography color="error">{error}</Typography> // Show error message
        ) : (
          <Grid container spacing={3}>
            {players.length > 0 ? (
              players.map((player) => (
                <Grid item xs={12} sm={6} md={4} key={player._id}>
                  <PlayerCard onClick={() => navigate(`/player/${player._id}`)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={player.image || "https://via.placeholder.com/200"}
                      alt={player.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{player.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Position: {player.position}
                      </Typography>
                    </CardContent>
                  </PlayerCard>
                </Grid>
              ))
            ) : (
              <Typography>No players found for this coach.</Typography>
            )}
          </Grid>
        )}
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
