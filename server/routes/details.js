const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // In production, use env variable

// Middleware to verify JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Save user details
router.post('/', authMiddleware, async (req, res) => {
  const { name, degree, branchOrStream } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, degree, branchOrStream },
      { new: true }
    );
    res.json({ message: 'Details saved', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user details
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      email: user.email,
      name: user.name,
      degree: user.degree,
      branchOrStream: user.branchOrStream,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 