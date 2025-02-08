const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");

const authController = require("../../controllers/auth_controller");

router.post("/login", authController.handle_login);
router.post("/logout", authController.handle_logout);


router.get("/", verifyJWT, authController.get_user_info);
module.exports = router;
