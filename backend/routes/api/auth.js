const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth_controller");

router.post("/login", authController.handle_login);
router.post("/logout", authController.handle_logout);

module.exports = router;
