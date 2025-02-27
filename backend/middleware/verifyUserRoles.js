

const verifyUserRoles = (...allowedRoles) => { // will be needed in future applications
    return async(req, res, next) => {
        // if(!req.roles) return res.sendStatus(401);
        // const rolesArray = [...allowedRoles];
        // console.log(rolesArray);
        // console.log(req.roles);
        // const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        // if(!result) return res.sendStatus(401);
        next();
    };
}

module.exports = verifyUserRoles;