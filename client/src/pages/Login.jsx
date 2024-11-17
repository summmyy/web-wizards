import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", user);
      alert(response.data.message);
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Typography>
           Don't have an account?
            <Link to="/signup">Sign up here</Link>
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal