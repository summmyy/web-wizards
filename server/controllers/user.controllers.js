import User from '../models/User.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id || req.query.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({
            name,
            email,
            password,
        });

        await user.save();

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
        );
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid login credentials');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new Error('Invalid login credentials');
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
        );
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deteleUserById = async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id });
        res.json({ message: user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
