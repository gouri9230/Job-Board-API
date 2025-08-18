const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const verifyAcessToken = (secret, role) => { 
    return (req, res, next) =>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1];
        if (!token) {
            res.status(404);
            throw new Error("No token was provided.")
        }
        try {
            const decoded = jwt.verify(token, secret);
            if (role === 'user') {
                req.user = decoded.user;
            } else if(role === 'employer') {
                req.employer = decoded.employer;
            } else if(role === 'admin') {
                req.admin = decoded.admin;
            }
            // tells express that authentication is done, pass control to next route handler. 
            // without next, the request will hang here foorever without knowing what to do next.
            next();
        } catch (err) {
            return res.status(403).json({message: "Invalid or expired token"});
        }  
    }
    };
};

module.exports = verifyAcessToken;