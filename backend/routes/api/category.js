const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/category_controller");

router.get("/list", categoryController.category_list);

router.post("/", categoryController.category_create);

router.put("/:id", categoryController.category_update);

router.delete("/:id", categoryController.category_delete);