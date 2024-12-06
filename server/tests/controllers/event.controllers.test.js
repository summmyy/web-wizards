import { createEvent } from '../../controllers/event.controllers.js';
import { expect, jest } from '@jest/globals';
import User from '../../models/User.js';

const mockedUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
    createdAt: new Date(),
    phone: '123456789',
};

describe('Event Controller', () => {
    it('should create an event successfully', async () => {
        const eventDate = new Date();
        const user = new User(mockedUser);

        await user.save();

        const req = {
            query: { userId: user._id },
            body: { title: 'Test Event', date: eventDate },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await createEvent(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Test Event',
                date: eventDate,
            }),
        );
    });
});
