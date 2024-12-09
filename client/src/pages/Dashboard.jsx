import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import axios from 'axios';
// import '../styles/dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    'https://web-wizards-ui0t.onrender.com/api/users/me',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token',
                            )}`,
                        },
                    },
                );
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <Container>
            <Box
                component={Paper}
                elevation={3}
                className="dashboard-container"
                p={5}
            >
                <Typography variant="h4" gutterBottom>
                    Account Summary
                </Typography>
                <Typography variant="h6">Name: {user?.name}</Typography>
                <Typography variant="h6">Email: {user?.email}</Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/events')}
                >
                    Go to Events
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
