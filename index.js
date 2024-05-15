const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const connectDB = require('./db/config');
const User = require('./db/User');
const bcrypt = require('bcrypt');
const authApp = require('./auth');

const PORT = 3000;

authApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
});

// Validation des données pour l'enregistrement
const registrationValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
];

// Route POST pour l'enregistrement des utilisateurs
app.post("/register", registrationValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, password: hashedPassword });
        const result = await newUser.save();
        const { password: _, ...userData } = result.toObject();
        res.status(201).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
});

// Route POST pour la connexion des utilisateurs
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (isValidPassword) {
                const { password: _, ...userData } = user.toObject();
                res.json(userData);
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to log in', error: error.message });
    }
});

// Route GET pour récupérer tous les utilisateurs
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
});

// Route GET pour récupérer un utilisateur par ID
app.get("/users/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
});

// Route PUT pour mettre à jour un utilisateur par ID
app.put("/users/:id", async (req, res) => {
    const userId = req.params.id;
    const { name, username, password } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.username = username;
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
});

// Route DELETE pour supprimer un utilisateur par ID
app.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
});
