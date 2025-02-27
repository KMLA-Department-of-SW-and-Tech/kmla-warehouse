const express = require("express");
const router = express.Router();

const logController = require("../../controllers/log_controller");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles")

router.get("/list", logController.list);
router.get("/list/:teamName", verifyJWT, verifyRoles(["User", "Admin"]), logController.listForTeam);

router.post("/", verifyJWT, verifyRoles(["Admin"]), logController.create);

router.route("/:id")
    .get(logController.detail)
    .delete(verifyJWT, verifyRoles(["Admin"]), logController.delete);

router.route("/:id/return")
    .post(verifyJWT, verifyRoles(["User", "Admin"]), logController.item_return);

module.exports = router;
