const express = require("express");
const router = express.Router();

const refreshTokenController = require("../../controllers-new/refresh_token_controller");

router.get("/", refreshTokenController.handle_refresh_token);

module.exports = router;
