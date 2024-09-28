const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles"); // in case of admin secrurity

const itemController = require("../../controllers/item_controller");

router.get("/list", verifyJWT, itemController.item_list);


router.post("/", verifyJWT, itemController.item_create);

router.route("/:id")
    .get(verifyJWT, itemController.item_detail)
    .put(verifyJWT, itemController.item_update_put)
    .patch(verifyJWT, itemController.item_update_patch)
    .delete(verifyJWT, itemController.item_delete);

module.exports = router;
