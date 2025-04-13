// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { generateQuestions, transcribeAudio } = require('../controllers/aiController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Routes protected by token authentication
router.post('/generate-questions', authMiddleware, generateQuestions);
router.post('/transcribe', authMiddleware, transcribeAudio);

module.exports = router;
