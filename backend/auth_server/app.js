const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const { mongoConnect } = require('./config/db');
require("dotenv").config();
const authRoutes = require("./routes/authRoutes")
const PORT = process.env.PORT;

const app = express();
mongoConnect();

app.use(express.json());
app.use(cors({
    origin: true, 
    credentials: true 
}));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", authRoutes);

app.get("/", (req,res)=>{
    try {
        return res.status(200).json({message: "Welcome to AI Interview Coach Main Server"})
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})

app.listen(PORT, () => {
    console.log(`Auth Server running on port ${PORT} http://localhost:${PORT}/`);
});