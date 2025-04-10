const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const refreshTokens = new Set();

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userInfo = await User.findOne({email:email});     

        if(userInfo)
            return res.status(404).json({message:"User with this email exists, go to Login"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "New user created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userInfo = await User.findOne({email:email});     
        
        if(!userInfo)
            return res.status(404).json({message:"User with requested username not found"});
        
        const validation = await bcrypt.compare(password, userInfo.password)
        
        if(!validation)
            return res.status(401).json({message:"Password entered do not match"});
        
        const user = {_id:userInfo._id}
        const refreshToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.add(refreshToken);

        const access_token = generateAccessToken(user)
        
        res.status(201).json({ message: "User logged in successfully", access_token:access_token, refreshToken:refreshToken });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.refreshToken = async(req,res) =>{
    try{
        const refreshToken = req.body.token;
        if(!(refreshTokens.has(refreshToken)))
            return res.status(400).json({mesage:"Requested session doesn't exist"});

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data)=>{
            if(err)
                return res.status(403).json({message:"Token isn't valid for any active session"});

            const access_token = generateAccessToken(data.user)
            res.status(201).json({message:"New access token was generated for the current session", access_token:access_token});
        })
    } catch(err) {
        res.status(500).json({message:err.message});
    }
}

exports.logout = async(req,res) =>{
    try{
        const refreshToken = req.body.token;
        if(!(refreshTokens.has(refreshToken)))
            return res.status(400).json({message:"Session for this token doesn't exist"});
        refreshTokens.delete(refreshToken);
        res.status(200).json({message:"Seesion has been successfully closed for the user"});
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

function generateAccessToken(user){
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
}