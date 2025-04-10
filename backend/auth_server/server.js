const app = require('./app');
const { mongoConnect } = require('./config/db');
require("dotenv").config();

const PORT = process.env.PORT || 5000;

mongoConnect();

app.listen(PORT, () => {
    console.log(`Auth Server running on port ${PORT} http://localhost:${PORT}/`);
});

module.exports = {server}