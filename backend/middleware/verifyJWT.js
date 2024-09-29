const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer')) return res.status(401).send("Invalid header request regarding authorization");
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).send("Invalid access token"); // invalid token (includes access token expiration)
            console.log(decoded)
            req.UserInfo.username = decoded.UserInfo.username;
            req.UserInfo.roles = decoded.UserInfo.roles;
            next();
        }
    );
});

module.exports = verifyJWT;