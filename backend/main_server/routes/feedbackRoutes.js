// routes/feedbackRoutes.js
const router = require('express').Router();
const { evaluateTextFeedback } = require('../controllers/feedbackController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Protect routes with JWT
router.post('/evaluate', authMiddleware, evaluateTextFeedback);

module.exports = router;
