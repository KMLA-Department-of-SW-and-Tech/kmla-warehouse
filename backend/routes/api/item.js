const express = require("express");
const router = express.Router();

const itemController = require("../../controllers/item_controller");

router.get("/list", itemController.item_list);

router.get("/:id", itemController.item_detail);

router.post("/", itemController.item_create);

router.put("/:id", itemController.item_update_put);

router.patch("/:id", itemController.item_update_patch);

router.delete("/:id", itemController.item_delete);

module.exports = router;
