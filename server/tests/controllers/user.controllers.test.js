import { createUser } from '../../controllers/user.controllers.js';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import { expect, jest } from '@jest/globals';

const mockedUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
    createdAt: new Date(),
    phone: '123456789',
};

describe('User Controller', () => {
    it('should create a user and return 201 status', async () => {
        const req = {
            body: { ...mockedUser },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'Test User',
            }),
        );
    });

    it('should return 400 if user creation fails', async () => {
        const req = { body: { name: mockedUser.name } }; // Missing email
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message:
                    'User validation failed: password: Path `password` is required., email: Path `email` is required.',
            }),
        );
    });
});
