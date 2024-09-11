const express = require("express");
const router = express.Router();

const borrowHistoryController = require("../../controllers/borrow_history_controller");

router.get("/list", borrowHistoryController.borrow_history_list);

router.get("/:id", borrowHistoryController.borrow_history_detail);

router.post("/", borrowHistoryController.borrow_history_create);

router.delete("/:id", borrowHistoryController.borrow_history_delete);

module.exports = router;
