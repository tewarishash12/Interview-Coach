// routes/interviewRoutes.js
const express = require('express');
const router = express.Router();
const { saveInterview, getUserInterviews, getInterviewById, deleteInterview } = require('../controllers/interviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

// All routes protected via JWT auth
router.post('/save', authMiddleware, saveInterview);
router.get('/', authMiddleware, getUserInterviews);
router.get('/', authMiddleware, getUserInterviews);
router.delete('/delete/:id', authMiddleware, deleteInterview);

module.exports = router;
