const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin_controller");

router.get("/list", adminController.admin_list);

router.post("/", adminController.admin_create);

router.put("/:id", adminController.admin_update);

router.delete("/:id", adminController.admin_delete);