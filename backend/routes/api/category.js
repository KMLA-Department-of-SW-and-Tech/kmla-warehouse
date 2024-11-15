const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles"); // in case of admin secrurity

const categoryController = require("../../controllers/category_controller");

router.get("/list", /* verifyJWT,  */categoryController.category_list);

router.post("/", verifyJWT, categoryController.category_create);

router.put("/:id", verifyJWT, categoryController.category_update_put);

router.delete("/:id", verifyJWT, categoryController.category_delete);

module.exports = router;