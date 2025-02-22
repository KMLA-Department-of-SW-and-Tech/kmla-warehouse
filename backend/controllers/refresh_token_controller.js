const Team = require("../models/team");
const jwt = require("jsonwebtoken");
const predefinedConstants = require("../config/predefined_constants");
require("dotenv").config();


exports.handle_refresh_token = async (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await Team.findOne({refreshToken: refreshToken}).exec();
    res.clearCookie('jwt', { httpOnly: true, /* secure: true, */ /* sameSite: 'None' */ });

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
                await hackedUser.save();
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
                { expiresIn: predefinedConstants.ACCESS_LIFETIME }
            );

            const newRefreshToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: predefinedConstants.REFRESH_LIFETIME }
            );
            // pass refress token to database
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken ];
            /* const response =  */await foundUser.save();
            res.cookie('jwt', newRefreshToken, { path: "/", httpOnly: true, maxAge: predefinedConstants.COOKIE_LIFETIME, /* secure: true, */ /* sameSite: 'None' */ }); // max age same as token expiration(1d)

            res.json( { roles, accessToken} )
        }
    );
}; // handle login


