const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// next error handling과 res.send() error handling이 같이 쓰이는데 이거 기준이 뭔가요?

exports.team_list = asyncHandler(async (req, res, next) => {
    const teamList = await Team.find({}, "name")
    .sort({ name: 1, })
    .exec();
    if(teamList == null) {
        const err = new Error("Teams not found");
        err.status = 404;
        return next(err);
    }
    res.send(teamList);
}); // only for admin

exports.team_detail = asyncHandler(async (req, res, next) => {
    const team = await Team.findById(req.params.id, {}).exec();
    if(team == null) {
        const err = new Error("Team not found");
        err.status = 404;
        return next(err);
    }
    res.json( {_id: team._id, username: team.username, name: team.name} );
});

// Will implement search

exports.team_create = [
    asyncHandler(async (req, res, next) => {
        console.log(req.body)
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.send(errors.array());
        }
        else {
            const { username, password, name } = req.body;
            const teamExists = await Team.findOne({username: username})
            .collation({ locale: "en_US", strength: 2 })
            .exec();
            if(teamExists) {
                res.status(409).send("A Team with the same username already exists");
            }
            else {
                try {
                    // encrypt the password
                    const hashedPwd = await bcrypt.hash(password, 10);
                    console.log("a")
                    // store new user
                    const newTeam = new Team({
                        username: username, 
                        password: hashedPwd,
                        role: [ "User", ],
                        name: name,
                    });
                    await newTeam.save();
                    res.status(201).send("Successful team register");
                } catch(err) {
                    res.status(500).send(`Error: ${err.message}`); // error handling
                }
            }
        }
    })
];

exports.team_update_put = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: team update put");
});

// exports.team_update_patch = asyncHandler(async (req, res, next) => {
//     res.send("NOT IMPLEMENTED: team update patch");
// });

exports.team_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: team delete");
});