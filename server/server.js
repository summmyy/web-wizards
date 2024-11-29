import express from 'express';
import { connect } from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import dotenv from 'dotenv';
import options from './middlewares/options.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(options);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const MONGODB_URI =
    'mongodb+srv://sunmibolaj13:Sunmi123@cluster0.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
connect(process.env.MONGODB_URI || MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
