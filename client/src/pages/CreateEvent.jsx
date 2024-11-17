import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const CreateEvent = () => {
  const [event, setEvent] = useState({ name: "", date: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/events", event);
      alert("Event Created!");
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Event
      </Typography>
      <TextField
        label="Event Name"
        fullWidth
        margin="normal"
        onChange={(e) => setEvent({ ...event, name: e.target.value })}
      />
      <TextField
        label="Event Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setEvent({ ...event, date: e.target.value })}
      />
      <TextField
        label="Event Description"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default CreateEvent;
