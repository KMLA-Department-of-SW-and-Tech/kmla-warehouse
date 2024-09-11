const express = require("express");
const router = express.Router();

const tagController = require("../../controllers/tag_controller");

router.get("/list", tagController.tag_list);

router.post("/", tagController.tag_create);

router.put("/:id", tagController.tag_update_put);

router.delete("/:id", tagController.tag_delete);

module.exports = router;