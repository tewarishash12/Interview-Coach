const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

module.exports = {app}