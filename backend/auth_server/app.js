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

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Auth Server running on port ${PORT} http://localhost:${PORT}/`);
});