const express = require('express');
const { registerUser, loginUser, getUserProfile, getAllUsers } = require('../controller/user.controller');
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id',  getUserProfile); // Assuming you're protecting the profile route
router.get('/allusers',  getAllUsers); // Protecting all users route with auth middleware

module.exports = router;
