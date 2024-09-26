const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
//const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.handle_login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).send("Username and Password are required");
    const foundUser = await Team.findOne({username: username})
    .collation({ locale: "en_US", strength: 2 })
    .exec();
    if(!foundUser) return res.status(401).send("No team with matching username");
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if(match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username, "name": foundUser.name, "admin": false },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5min' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username, "name": foundUser.name, "admin": false },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // pass refress token to database
        const response = await Team.updateOne({ username: foundUser.username }, { $set: { refreshToken: refreshToken }}).exec();
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // max age same as token expiration(1d)
        // http only to block attacks from sending cookies, but use secure to completely secure the cookie.(for late implementation)
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401).send("Invalid password");
    }
}); // handle login


exports.get_user_info = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = await Team.findOne({refreshToken: refreshToken}, "username name")
    .collation({ locale: "en_US", strength: 2 })
    .exec();
    if(!foundUser) return res.sendStatus(403); // forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username || foundUser.name !== decoded.name) res.sendStatus(403);
            res.json(foundUser);
        }
    );
    
})