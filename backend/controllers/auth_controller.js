const Team = require("../models/team");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const predefinedConstants = require("../config/predefined_constants");
require("dotenv").config();

const validateUserInput = [
    body('username')
        .exists().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .notEmpty().withMessage('Username cannot be empty'),
    body('password')
        .exists().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .notEmpty().withMessage('Password cannot be empty'),
];

exports.handle_login = [validateUserInput, async (req, res, next) => {
    try {
        const cookies = req.cookies;
        //console.log(`Cookie available at login: ${JSON.stringify(cookies)}`);
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).send(errors.array());
            return;
        }
        const { username, password } = req.body;
        const foundUser = await Team.findOne({username: username})
        .collation({ locale: "en_US", strength: 2 })
        .exec();
        if(!foundUser) return res.status(401).send("No team with matching username");
        // evaluate password
        const match = await bcrypt.compare(password, foundUser.password);
        if(match) {
            // create JWTs
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
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

            let newRefreshTokenArray = 
                !cookies?.jwt
                    ? foundUser.refreshToken
                    : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);
            if(cookies?.jwt) {
                const refreshToken = cookies.jwt;
                const foundToken = await Team.findOne({refreshToken: refreshToken}).exec();

                if(!foundToken) {
                    console.log("Attempted refresh token reuse at login");
                    newRefreshTokenArray = [];
                }

                res.clearCookie('jwt', { httpOnly: true, /* secure: true, */ /* sameSite: 'None' */ });
            }

            // pass refress token to database
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const roles = foundUser.roles;
            await foundUser.save();
            res.cookie('jwt', newRefreshToken, { httpOnly: true, maxAge: predefinedConstants.COOKIE_LIFETIME, /* secure: true, */ /* sameSite: 'None' */ }); // max age same as token expiration(1d)
            // http only to block attacks from sending cookies, but use secure to completely secure the cookie.(for late implementation)
            res.status(200).json({ roles, accessToken });
        }
        else {
            res.status(401).send("Invalid password");
        }
    } catch (error) {
        console.log(error);
    }
    
}]; // handle login

exports.handle_logout = async (req, res, next) => {
    // On client delete the accessToken!!!! --> did this
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt;
    const foundUser = await Team.findOne({refreshToken: refreshToken})
    if(!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: predefinedConstants.COOKIE_LIFETIME });
        return res.sendStatus(204); // no content
    }
    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    await foundUser.save();
    res.clearCookie('jwt', { httpOnly: true, /* secure: true, */ /* sameSite: 'None' */ });
    res.sendStatus(204);
}; // handle login

exports.get_user_info = async (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
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
            if(err || foundUser.username !== decoded.UserInfo.username) return res.sendStatus(403);
            res.json(foundUser);
        }
    );
    
};


// Same site + Cors haven't implemented yet (Security)
