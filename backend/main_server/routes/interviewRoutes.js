// routes/interviewRoutes.js
const express = require('express');
const router = express.Router();
const { createInterview, getUserInterviews, getInterviewById } = require('../controllers/interviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

// All routes protected via JWT auth
router.post('/', authMiddleware, createInterview);
router.get('/', authMiddleware, getUserInterviews);
router.get('/:id', authMiddleware, getInterviewById);

module.exports = router;
