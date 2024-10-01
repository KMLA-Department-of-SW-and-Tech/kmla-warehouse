const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");

const tagController = require("../../controllers/tag_controller");

router.get("/list", verifyJWT, tagController.tag_list);

router.post("/", verifyJWT, tagController.tag_create);

router.put("/:id", verifyJWT, tagController.tag_update_put);

router.delete("/:id", verifyJWT, tagController.tag_delete);

module.exports = router;