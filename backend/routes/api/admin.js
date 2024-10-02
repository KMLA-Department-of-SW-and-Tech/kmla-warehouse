const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");

const adminController = require("../../controllers/admin_controller");


router.post("/", verifyJWT, adminController.admin_create);

router.route("/:id")
    .get(verifyJWT, adminController.admin_detail)
    .put(verifyJWT, adminController.admin_update_put)
    .delete(verifyJWT, adminController.admin_delete);

module.exports = router;