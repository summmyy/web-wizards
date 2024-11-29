import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import EventCard from '../components/EventCard';

const EventsPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/events',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token',
                            )}`,
                        },
                    },
                );
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleBookEvent = (eventId) => {
        setEvents(
            events.map((event) =>
                event._id === eventId
                    ? {
                          ...event,
                          attendees: [...event.attendees, 'currentUserId'],
                      }
                    : event,
            ),
        );
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
                        onBook={handleBookEvent}
                    />
                ))
            ) : (
                <Typography>No events available.</Typography>
            )}
        </Container>
    );
};

export default EventsPage;
