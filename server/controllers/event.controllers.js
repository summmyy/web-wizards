import Event from '../models/Event.js';
import User from '../models/User.js';

export const createEvent = async (req, res) => {
    try {
        const user = await User.findById(req.query.userId);
        req.body.createdBy = user;
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'name email');
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate(
            'createdBy',
            'name email',
        );
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
