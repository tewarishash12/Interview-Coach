const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token)
        return res.status(400).json({ message: "Access token is tampered" });
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) return res.status(401).json({ message: "Unauthorized to access" });

        req.user = data.user;
        next(); 
    })
}

module.exports = { authMiddleware };
