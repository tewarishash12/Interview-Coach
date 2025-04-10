const router = require("express").Router();

const { register, login, refreshToken, logout } = require('../controllers/authControllers.js');

router.post('/register', register);
router.post('/login', login);
router.post('/token', refreshToken);
router.post('/logout', logout);

module.exports = router