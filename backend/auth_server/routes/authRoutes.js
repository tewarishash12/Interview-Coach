const router = require("express").Router();

const { register, login, refreshToken, logout , verifyEmail} = require('../controllers/authControllers.js');

router.post('/register', register);
router.post('/login', login);
router.post('/token', refreshToken);
router.post('/logout', logout);
router.get('/verify-email', verifyEmail);

module.exports = router