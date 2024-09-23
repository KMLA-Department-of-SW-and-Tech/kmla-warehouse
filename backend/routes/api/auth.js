const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth_controller");

router.post("/", authController.handle_login);

module.exports = router;
