const userService = require("../services/user_service");

const verifyRoles = (...allowedRoles) => { // will be needed in future applications // should not be empty
    return async(req, res, next) => {
        const user = await userService.findUserByFirebaseUid(req.firebaseUid);
        if(!user) return res.status(500).send("No matching firebase user in mongoose, inspection needed");
        
        // if(!req.roles) return res.sendStatus(401);
        // const rolesArray = [...allowedRoles];
        // console.log(rolesArray);
        // console.log(req.roles);
        // const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        // if(!result) return res.sendStatus(401);
        next();
    };
}

module.exports = verifyRoles;