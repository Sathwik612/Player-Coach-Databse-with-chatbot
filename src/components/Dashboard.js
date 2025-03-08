import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
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

const Footer = styled("footer")({
  marginTop: "40px",
  padding: "20px",
  textAlign: "center",
});

const HeaderImages = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const Dashboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const coachId = localStorage.getItem("coachId");

    if (!coachId) {
      console.error("❌ No coachId found! Redirecting to login.");
      navigate("/");
      return;
    }

    const fetchPlayers = async () => {
      try {
        console.log(`🚀 Fetching players for Coach ID: ${coachId}`);
        const response = await axios.get(
          `http://localhost:5000/api/players?coachId=${coachId}`
        );
        console.log("✅ Players received:", response.data);
        setPlayers(response.data);
      } catch (error) {
        console.error(
          "❌ Error fetching players:",
          error.response ? error.response.data : error.message
        );
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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <HeaderImages>
            <img src="NIE_University.png" alt="NIE" height="40" />
            <img src="IVIS_logo.png" alt="IVIS LABS" height="40" />
            <img src="PULSE LOGO.png" alt="PULSE" height="40" />
          </HeaderImages>
          <Typography variant="h6">Team Dashboard</Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Player Cards */}
      <DashboardContainer>
        <Typography variant="h4" gutterBottom>
          Your Players
        </Typography>

        {loading ? (
          <CircularProgress color="primary" />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {players.length > 0 ? (
              players.map((player) => (
                <Grid item xs={12} sm={6} md={4} key={player._id}>
                  <PlayerCard onClick={() => navigate(`/player/${player._id}`)}>
                    {/* Add player image here */}
                    <CardMedia
                      component="img"
                      height="200"
                      image={player.image && player.image !== "" ? player.image : "data:image/jpeg;base64,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"}
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

      {/* Footer */}
      <Footer>
        <img src="IVIS_logo.png" alt="Powered by IVISLABS" height="50" />
        <Typography variant="body2">Powered by IVISLABS</Typography>
      </Footer>
    </>
  );
};

export default Dashboard;
