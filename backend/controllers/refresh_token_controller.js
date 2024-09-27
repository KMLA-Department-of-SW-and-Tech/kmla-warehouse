const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.handle_refresh_token = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = await Team.findOne({refreshToken: refreshToken})
    .collation({ locale: "en_US", strength: 2 })
    .exec();
    if(!foundUser) return res.sendStatus(403); // forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.UserInfo.username || foundUser.name !== decoded.UserInfo.name) res.sendStatus(403);
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": foundUser.username,
                        "name": foundUser.name,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30min' }
            );
            res.json( {accessToken} )
        }
    );
}); // handle login


