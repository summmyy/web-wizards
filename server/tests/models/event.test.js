import Event from '../../models/Event.js';
import User from '../../models/User.js';

describe('Event Model', () => {
    it('should create an event successfully', async () => {
        const user = await new User({
            name: 'Test User',
            email: 'user@test.com',
            password: '123456',
        }).save();

        const eventData = {
            title: 'Test Event',
            description: 'This is a test event',
            date: new Date(),
            createdBy: user._id,
        };

        const event = new Event(eventData);
        const savedEvent = await event.save();

        expect(savedEvent._id).toBeDefined();
        expect(savedEvent.createdBy.toString()).toBe(user._id.toString());
    });

    it('should fail to create an event without a required field', async () => {
        const event = new Event({ title: 'Test Event' }); // Missing `createdBy`
        await expect(event.save()).rejects.toThrow();
    });
});
