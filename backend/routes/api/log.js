const express = require("express");
const router = express.Router();

const logController = require("../../controllers/log_controller");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyUserRoles = require("../../middleware/verifyUserRoles")
const verifyAdminRoles = require("../../middleware/verifyAdminRoles");

router.get("/list", logController.list);
router.get(verifyJWT, verifyUserRoles, "/list/:teamName", logController.listForTeam);

router.post(verifyJWT, verifyAdminRoles, "/", logController.create);

router.route("/:id")
    .get(logController.detail)
    .delete(verifyJWT, verifyAdminRoles, logController.delete);

router.route("/:id/return")
    .post(verifyJWT, verifyUserRoles, logController.item_return);

module.exports = router;
