import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", user);
      alert(response.data.message);

      localStorage.setItem('token', response.data.token); 
      navigate("/dashboard");

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
        <Link to="/signup"> Sign up here</Link>
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
