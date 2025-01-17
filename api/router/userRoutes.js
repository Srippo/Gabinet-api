const express = require('express');
const { signup, login } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Access granted to protected route' });
});
router.get('/admin', authMiddleware, (req, res) => {
    if (req.userData.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    res.status(200).json({ message: 'Welcome, admin!' });
});


module.exports = router;
