const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin_controller");

router.get("/:id", adminController.admin_detail);

router.post("/", adminController.admin_create);

router.put("/:id", adminController.admin_update_put);

router.delete("/:id", adminController.admin_delete);

module.exports = router;