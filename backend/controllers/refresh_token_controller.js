const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const cookieMutex = require("../config/cookieMutex");
require("dotenv").config();

exports.handle_refresh_token = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log(refreshToken);
    
    const foundUser = await Team.findOne({refreshToken: refreshToken}).exec();
    console.log(foundUser, refreshToken, "Ha gotcha")
    
    // refresh token reuse detection
    if(!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if(err) return res.sendStatus(403); // forbidden 
                console.log("Attempted refresh token reuse");
                const hackedUser = await Team.findOne({username: decoded.UserInfo.username}).exec();
                console.log("hacked user", hackedUser, refreshToken, decoded)
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        );
        return res.sendStatus(403); // forbidden 
    }
    // evaluate jwt

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if(err) {
                console.log("Expired refresh token identified");
                foundUser.refreshToken = [...newRefreshTokenArray];
                await foundUser.save();
                return res.status(403).send("Refresh token expired");
            }
            if(foundUser.username !== decoded.UserInfo.username) return res.sendStatus(403);
            // refreshToken still valid
            const roles = /* Object.values( */foundUser.roles;/* ) */
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": decoded.UserInfo.username,
                        "roles": roles,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5min' }
            );

            const newRefreshToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // pass refress token to database
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken ];
            console.log("Going to update", foundUser, "r", refreshToken, "n", newRefreshToken)
            /* const response =  */await foundUser.save();
            res.clearCookie('jwt', { httpOnly: true, /* secure: true, */ /* sameSite: 'None' */ });
            res.cookie('jwt', newRefreshToken, { path: "/", httpOnly: true, maxAge: 24 * 60 * 60 * 1000, /* secure: true, */ /* sameSite: 'None' */ }); // max age same as token expiration(1d)

            res.json( { /* roles,  */accessToken} )
        }
    );
}); // handle login


