import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import EventCard from '../components/EventCard';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [updatedEvent, setUpdatedEvent] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/events', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:3000/api/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEvents(events.filter((event) => event._id !== eventId));
            alert('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEditEvent = async (eventId) => {
        try {
            const eventToUpdate = events.find((event) => event._id === eventId);
            const updatedEventData = {
                title: updatedEvent.title || eventToUpdate.title,
                description: updatedEvent.description || eventToUpdate.description,
                date: updatedEvent.date || eventToUpdate.date,
                location: updatedEvent.location || eventToUpdate.location,
            };
            await axios.put(
                `http://localhost:3000/api/events/${eventId}`, // Corrected usage of eventId
                updatedEventData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );
            setEvents(
                events.map((event) =>
                    event._id === eventId ? { ...event, ...updatedEventData } : event,
                ),
            );
            alert('Event updated successfully');
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                All Events
            </Typography>
            {events.length > 0 ? (
                events.map((event) => (
                    <EventCard
                        key={event._id}
                        event={event}
                        onDelete={handleDeleteEvent} // Pass delete handler
                        onEdit={handleEditEvent}    // Pass edit handler
                    />
                ))
            ) : (
                <Typography>No events available.</Typography>
            )}
        </Container>
    );
};

export default EventsPage;
