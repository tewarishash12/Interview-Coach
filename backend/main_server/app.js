const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http');
const path = require('path');
const User = require("./models/User")

const { mongoConnect } = require('./config/db');

const resumeRoutes = require('./routes/resumeRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const aiRoutes = require('./routes/aiRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const contactRoutes = require("./routes/contactRoute")
const { authMiddleware } = require('./middleware/authMiddleware');

dotenv.config();
mongoConnect();


// Middleware
app.use(express.json({limit: '20mb'}));
app.use(cors({
    origin: true, 
    credentials: true 
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

// Routes
app.use('/resume', resumeRoutes);
app.use('/interview', interviewRoutes);
app.use('/ai', aiRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/contact', contactRoutes);

app.get("/users/me", authMiddleware, async (req,res) =>{
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
        res.status(201).json({ user });
    } catch(err) {
        res.status(500).json({message:err.message});
    }
})

app.get("/", (req,res)=>{
    try {
        return res.status(200).json({message: "Welcome to AI Interview Coach Main Server"})
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Main server running in ${process.env.NODE_ENV} mode on port ${PORT}, localhost Link: http://localhost:${PORT}/`);
});