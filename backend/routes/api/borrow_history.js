const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles"); // in case of admin secrurity

const borrowHistoryController = require("../../controllers/borrow_history_controller");

router.get("/list", /* verifyJWT,  */borrowHistoryController.borrow_history_list);

router.post("/", verifyJWT, borrowHistoryController.borrow_history_create);

router.route("/:id")
    .get(/* verifyJWT,  */borrowHistoryController.borrow_history_detail)
    .delete(verifyJWT, borrowHistoryController.borrow_history_delete);

router.route("/:id/return")
    .post(verifyJWT, borrowHistoryController.item_return);

module.exports = router;
