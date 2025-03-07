import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import { TextField, Button, Container, Typography, CircularProgress, Paper, Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("🚀 Attempting login with email:", email);

      const response = await axios.post("http://localhost:5000/api/coaches/login", { email, password });

      console.log("✅ Login successful:", response.data);

      const { coachId, token } = response.data;
      localStorage.setItem("coachId", coachId);
      localStorage.setItem("token", token);

      navigate("/dashboard"); // Redirect to Dashboard
    } catch (error) {
      console.error("❌ Login failed:", error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ padding: "30px", borderRadius: "10px", marginTop: "100px" }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>Coach Login</Typography>

        {error && <Typography color="error" align="center" sx={{ mb: 2 }}>{error}</Typography>}

        <form onSubmit={handleLogin}>
          <TextField fullWidth label="Email" variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
