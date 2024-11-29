import express from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
} from '../controllers/event.controllers.js';
import authorize from '../middlewares/autorize/authorizeUsers.js';

const router = express.Router();

router.route('/').post(authorize, createEvent).get(authorize, getAllEvents);

router.route('/:id').get(getEventById);

export default router;
