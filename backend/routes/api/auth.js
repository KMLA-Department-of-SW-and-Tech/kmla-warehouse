const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth_controller");

router.post("/", authController.handle_login);


router.get("/", authController.get_user_info);
module.exports = router;
