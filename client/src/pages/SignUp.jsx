import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      await axios.post("http://localhost:3000/api/users/register", user);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <Container>
      <div className="signup-card">
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
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
         <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </form>
        <Typography>
          Already have an account? <Link to="/login"> Log in here</Link>
        </Typography>
      </div>
    </Container>
  );
};

export default SignUp;
