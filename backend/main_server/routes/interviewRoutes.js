// routes/interviewRoutes.js
const express = require('express');
const router = express.Router();
const { saveInterview, getUserInterviews, getInterviewById } = require('../controllers/interviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

// All routes protected via JWT auth
router.post('/save', authMiddleware, saveInterview);
router.get('/', authMiddleware, getUserInterviews);
router.get('/:id', authMiddleware, getInterviewById);

module.exports = router;
