const express = require("express");
const router = express.Router();

const logController = require("../../controllers/log_controller");

router.get("/list", logController.list);
router.get("/list/:teamName", logController.listForTeam);

router.post("/", logController.create);

router.route("/:id")
    .get(logController.detail)
    .delete(logController.delete);

router.route("/:id/return")
    .post(logController.item_return);

module.exports = router;
