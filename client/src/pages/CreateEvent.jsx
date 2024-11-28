import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import "../styles/create-event.css";

const CreateEvent = () => {
  const [event, setEvent] = useState({ title: "", date: "", description: "", location: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      await axios.post("http://localhost:3000/api/events", event);
      alert("Event Created!");
      navigate("/events");
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
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Title"
          fullWidth
          margin="normal"
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
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
        <TextField
          label="Event Location"
          fullWidth
          margin="normal"
          onChange={(e) => setEvent({ ...event, location: e.target.value })}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateEvent;
