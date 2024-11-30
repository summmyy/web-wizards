import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
} from '@mui/material';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import PropTypes from 'prop-types';

const EventCard = ({ event, onDelete, onEdit }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow" style={{ margin: '1rem 0' }}>
            <CardContent>
                <Typography variant="h5">{event.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {event.description}
                </Typography>
                <div className="event-details" style={{ marginTop: '1rem' }}>
                    <Typography variant="body2" color="textSecondary">
                        <Calendar className="icon" />{' '}
                        {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <Clock className="icon" />{' '}
                        {new Date(event.date).toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <MapPin className="icon" /> {event.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <Users className="icon" /> {event.attendees.length} attendees
                    </Typography>
                </div>
            </CardContent>
            <CardActions className="flex justify-between items-center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(event)} // Pass the entire event
                >
                    Edit Event
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onDelete(event)} // Pass the entire event
                >
                    Delete Event
                </Button>
            </CardActions>
        </Card>
    );
};

EventCard.propTypes = {
    event: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default EventCard;
