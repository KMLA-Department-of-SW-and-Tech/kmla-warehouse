const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles"); // in case of admin secrurity

router.route("/info")
    .get(verifyJWT, verifyRoles, );

module.exports = router;

