const express = require("express");
const router = express.Router();

const refreshTokenController = require("../../controllers/refresh_token_controller");

router.post("/", refreshTokenController.handle_refresh_token);

module.exports = router;