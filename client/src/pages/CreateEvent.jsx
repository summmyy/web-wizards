import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid2 as Grid,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import '../styles/create-event.css';
import dayjs from 'dayjs';

const CreateEvent = () => {
    const [event, setEvent] = useState({
        title: '',
        date: '',
        description: '',
        location: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/events', event, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Event Created!');
            navigate('/events');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event.');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Create Event
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Event Title"
                            fullWidth
                            margin="normal"
                            onChange={(e) =>
                                setEvent({ ...event, title: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Event Date"
                                InputLabelProps={{ shrink: true }}
                                onChange={(value) =>
                                    setEvent({
                                        ...event,
                                        date: dayjs(value).format('YYYY-MM-DD'),
                                    })
                                }
                                sx={{ width: 'inherit' }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label="Event Description"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label="Event Location"
                            fullWidth
                            margin="normal"
                            onChange={(e) =>
                                setEvent({ ...event, location: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid size={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ textTransform: 'none' }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CreateEvent;
