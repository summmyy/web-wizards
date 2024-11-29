import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model('User', userSchema);
