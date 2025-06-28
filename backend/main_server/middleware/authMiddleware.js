const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const accesstoken = req.cookies.access_token;
    
    if (!accesstoken)
        return res.status(400).json({ message: "Access token is tampered" });
    
    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) return res.status(401).json({ message: "Unauthorized to access" });

        req.user = data.user;
        next(); 
    })
}

module.exports = { authMiddleware };
