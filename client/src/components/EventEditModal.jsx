import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
} from '@mui/material';

const EditEventModal = ({ event, open, onClose, onSave }) => {
    const [updatedEvent, setUpdatedEvent] = useState({ ...event });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(updatedEvent);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    name="title"
                    value={updatedEvent.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={updatedEvent.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Date & Time"
                    type="datetime-local"
                    name="date"
                    value={new Date(updatedEvent.date)}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Location"
                    name="location"
                    value={updatedEvent.location}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
EditEventModal.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        location: PropTypes.string,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditEventModal;

