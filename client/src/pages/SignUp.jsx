import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/register", user);
      alert("Signup successful! Please log in.");
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Container>
  );
};

export default SignUp