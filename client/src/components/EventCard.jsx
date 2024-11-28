import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, Button } from '@mui/material';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import axios from 'axios';

const EventCard = ({ event, onBook }) => {
  const handleBook = async () => {
    try {
      await axios.post(`http://localhost:3000/api/events/${event._id}/book`);
      onBook(event._id); 
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow" style={{ margin: '1rem 0' }}>
      <CardMedia
        component="img"
        height="200"
        image="/api/placeholder/400/200"
        alt={event.title}
      />
      <CardContent>
        <Typography variant="h5">{event.title}</Typography>
        <Typography variant="body2" color="textSecondary">{event.description}</Typography>
        <div className="event-details" style={{ marginTop: '1rem' }}>
          <Typography variant="body2" color="textSecondary"><Calendar className="icon" /> {new Date(event.date).toLocaleDateString()}</Typography>
          <Typography variant="body2" color="textSecondary"><Clock className="icon" /> {new Date(event.date).toLocaleTimeString()}</Typography>
          <Typography variant="body2" color="textSecondary"><MapPin className="icon" /> {event.location}</Typography>
          <Typography variant="body2" color="textSecondary"><Users className="icon" /> {event.attendees.length} attendees</Typography>
        </div>
      </CardContent>
      <CardActions className="flex justify-between items-center">
        <Typography variant="h6" className="text-lg font-bold">${event.price}</Typography>
        <Button variant="contained" color="primary" onClick={handleBook}>
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
