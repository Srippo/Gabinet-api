const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Rejestracja użytkownika
exports.signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            role: req.body.role || 'user'
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// Logowanie użytkownika
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Authorization failed: User not found' });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

// Profil użytkownika
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userData.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user._id,
            email: user.email,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile', error: err.message });
    }
};
