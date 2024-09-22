const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
//const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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
        // creat JWTs (Note to do later)
        res.status(200).send(`Successful login: user ${username}`);
    }
    else {
        res.status(401).send("Invalid password");
    }
}); // handle login


