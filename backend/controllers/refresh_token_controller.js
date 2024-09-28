const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.handle_refresh_token = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    const foundUser = await Team.findOne({refreshToken: refreshToken}).exec();
    
    // refresh token reuse detection
    if(!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if(err) return res.sendStatus(403); // forbidden 
                console.log("Attempted refresh token reuse");
                const hackedUser = await Team.findOne({username: decoded.username}).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
                console.log(result);
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
                const result = await foundUser.save();
                console.log(result);
            }
            if(err || foundUser.username !== decoded.UserInfo.username) res.sendStatus(403);
            // refreshToken still valid
            const roles = /* Object.values( */foundUser.roles;/* ) */
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30min' }
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
            /* const response =  */await foundUser.save();
            res.cookie('jwt', newRefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: 'None' }); // max age same as token expiration(1d)

            res.json( { roles, accessToken} )
        }
    );
}); // handle login


