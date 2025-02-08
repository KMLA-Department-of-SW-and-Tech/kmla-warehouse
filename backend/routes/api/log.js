const express = require("express");
const router = express.Router();

const logController = require("../../controllers/log_controller");

router.get("/list", logController.log_list);

router.post("/", logController.log_create);

router.route("/:id")
    .get(logController.log_detail)
    .delete(logController.log_delete);

router.route("/:id/return")
    .post(logController.item_return);

module.exports = router;
