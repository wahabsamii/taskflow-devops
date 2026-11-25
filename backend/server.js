import { configDotenv } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Todo from './model/Todo.js';

configDotenv();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('DB is connected'));

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server working fine' });
});

// Create Todo
app.post('/create', async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const todo = new Todo({
            title,
            description
        });

        await todo.save();

        return res.status(201).json({
            success: true,
            message: 'Created!',
            todo
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all Todos
app.get('/all', async (req, res) => {
    try {
        const todos = await Todo.find();

        return res.json({
            success: true,
            todos
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});