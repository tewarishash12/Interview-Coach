const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/mailer");
require("dotenv").config();
const refreshTokens = new Set();

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userInfo = await User.findOne({ email: email });
        
        if (userInfo){
            if (!userInfo.isVerified) {
                return res.status(400).json({
                    message: "You have already registered but haven't verified your email. Please check your inbox for the verification link.",
                });
            } else {
                return res.status(400).json({
                    message: "User with this email already exists. Please login.",
                });
            }
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const verificationToken = crypto.randomBytes(32).toString("hex");
        
        await sendVerificationEmail(email, verificationToken);
        
        const user = new User({ name, email, password: hashedPassword, verificationToken });
        await user.save();

        res.status(201).json({ message: "Check mail for verification link" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const user = await User.findOne({ verificationToken: token });
        
        if (!user)
            return res.status(400).json({ message: "Invalid or expired verification token" });
        
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully. You can now login." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userInfo = await User.findOne({ email });

        if (!userInfo)
            return res.status(404).json({ message: "User with requested email not found" });

        if (!userInfo.isVerified)
            return res.status(403).json({ message: "Please verify your email first" });

        const validation = await bcrypt.compare(password, userInfo.password);
        if (!validation)
            return res.status(401).json({ message: "Password entered do not match" });

        const payload = { _id: userInfo._id };
        const access_token = generateAccessToken(payload);
        const refresh_token = jwt.sign({ user: payload }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.add(refresh_token);

        const userData = { _id: userInfo._id, email: userInfo.email, name: userInfo.name }

        res.status(201).json({ message: "User logged in successfully", access_token, refresh_token, user: userData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer "))
            return res.status(401).json({ message: "Refresh token missing" });

        const refresh_token = authHeader.split(" ")[1];
        if (!refreshTokens.has(refresh_token))
            return res.status(400).json({ message: "Session doesn't exist" });

        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) return res.status(403).json({ message: "Invalid refresh token" });

            const newAccessToken = generateAccessToken(data.user);

            return res.status(201).json({
                message: "New access token generated",
                access_token: newAccessToken
            });
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

exports.logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer "))
            return res.status(401).json({ message: "Refresh token missing" });

        const refresh_token = authHeader.split(" ")[1];
        if (!(refreshTokens.has(refresh_token)))
            return res.status(400).json({ message: "Session for this token doesn't exist" });
        refreshTokens.delete(refresh_token);
        res.status(200).json({ message: "Session has been successfully closed for the user" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

function generateAccessToken(user) {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}