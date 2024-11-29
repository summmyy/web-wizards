import { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/users/me',
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
            >
                <Typography variant="h4" gutterBottom>
                    Account Summary
                </Typography>
                <Typography variant="h6">Name: {user?.name}</Typography>
                <Typography variant="h6">Email: {user?.email}</Typography>
            </Box>
        </Container>
    );
};

export default Dashboard;
