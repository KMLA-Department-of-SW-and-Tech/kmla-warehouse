const userService = require("../services/user_service");

const verifyRoles = (allowedRoles) => {
  // will be needed in future applications // should not be empty
  return async (req, res, next) => {
    const user = await userService.findUserByFirebaseUid(req.firebaseUid);
    if (!user)
      return res
        .status(500)
        .send("No matching firebase user in mongoose, inspection needed");
    const userRole = user.userType;
    const validated = allowedRoles.includes(userRole);
    if (!validated) return res.status(401).send("Unauthorized api access");
    return next();
  };
};

module.exports = verifyRoles;
