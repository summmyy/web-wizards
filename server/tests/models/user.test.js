import User from '../../models/User.js';

describe('User Model', () => {
    it('should hash the password before saving a user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: '123456',
        };
        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser.password).not.toBe(userData.password); // Password should be hashed
        expect(savedUser.password.length).toBeGreaterThan(20); // Basic check for hash length
    });

    it('should not allow duplicate emails', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: '123456',
        };

        const user1 = new User(userData);
        await user1.save();

        const user2 = new User(userData);
        await expect(user2.save()).rejects.toThrow();
    });
});
