import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    'https://web-wizards-ui0t.onrender.com/api/events',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token',
                            )}`,
                        },
                    },
                );
                setEvents(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                await axios.get(
                    'https://web-wizards-ui0t.onrender.com/api/users/me',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    },
                );
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsAuthenticated(false);
            }
        };

        checkUserAuth();
    }, []);

    

    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                Welcome to EventBook
            </Typography>
            {!isAuthenticated && (
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/login"
                >
                    Login
                </Button>
            )}
            <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/create-event"
                style={{ marginLeft: '1rem' }}
            >
                Create Event
            </Button>
            <Typography variant="h4" style={{ marginTop: '2rem' }}>
                Upcoming Events
            </Typography>
            {events.length > 0 ? (
                events.map((event) => (
                    <Card key={event._id} style={{ margin: '1rem 0' }}>
                        <CardContent>
                            <Typography variant="h5">{event.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {event.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {new Date(event.date).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No events available.</Typography>
            )}
        </Container>
    );
};

export default HomePage;
