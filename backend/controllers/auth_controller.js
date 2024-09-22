const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
//const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.handle_login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).send("Username and Password are required");
    
}); // handle login


