const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyUserRoles"); // in case of admin secrurity
const  userController = require("../../controllers/user_controller");

router.route("/test")
    .get(verifyJWT, userController.testApi);

module.exports = router;

