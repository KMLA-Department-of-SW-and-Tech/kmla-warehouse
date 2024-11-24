const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles"); // in case of admin secrurity
const deleteItem = require("../../middleware/delete_item");
const deleteImage = require("../../middleware/delete_image");
const upload = require('../../middleware/upload_image'); // Import the multer upload configuration

const itemController = require("../../controllers/item_controller");


router.get("/list", /* verifyJWT,  */itemController.item_list);

router.get("/search/:query", /* verifyJWT,  */itemController.item_search);

router.post("/", upload, itemController.item_create);

router.route("/:id")
    .get(verifyJWT, itemController.item_detail)
    .put(verifyJWT, upload, itemController.item_update_put, deleteImage)
    .patch(verifyJWT, itemController.item_update_patch)
    .delete(deleteItem, itemController.item_update_put);

router.route("/:id/borrow")
    .post(verifyJWT, itemController.item_borrow);

module.exports = router;
  