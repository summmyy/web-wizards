import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import EventCard from '../components/EventCard';
import EditEventModal from '../components/EventEditModal';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

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

    const handleDeleteEvent = async (event) => {
        try {
            await axios.delete(`http://localhost:3000/api/events/${event._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEvents(events.filter((e) => e._id !== event._id));
            alert(`${event.title} has been deleted.`);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEditEvent = (event) => {
        setCurrentEvent(event); // Set the current event to be edited
        setIsEditOpen(true); // Open the modal
    };

    const handleSaveEdit = async (updatedEvent) => {
        try {
            await axios.put(
                `http://localhost:3000/api/events/${updatedEvent._id}`,
                updatedEvent,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setEvents(
                events.map((e) =>
                    e._id === updatedEvent._id ? updatedEvent : e
                )
            );

            alert(`${updatedEvent.title} has been updated.`);
            setIsEditOpen(false); // Close the modal
            setCurrentEvent(null); // Clear the current event
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
                        onDelete={handleDeleteEvent}
                        onEdit={handleEditEvent}
                    />
                ))
            ) : (
                <Typography>No events available.</Typography>
            )}

            {/* Render the Edit Event Modal */}
            {currentEvent && (
                <EditEventModal
                    event={currentEvent}
                    open={isEditOpen}
                    onClose={() => setIsEditOpen(false) && setCurrentEvent(null)}
                    onSave={handleSaveEdit}
                />
            )}
        </Container>
    );
};

export default EventsPage;
