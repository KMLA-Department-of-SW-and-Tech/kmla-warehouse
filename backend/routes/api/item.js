const express = require("express");
const router = express.Router();
const deleteItem = require("../../legacy/delete_item");
const deleteImage = require("../../legacy/delete_image");
const upload = require('../../middleware/upload_image.js'); // Import the multer upload configuration
const printReq = require("../../middleware/print_req.js");

const itemController = require("../../controllers/item_controller"); 

router.get("/list", itemController.list);

router.post("/", upload, itemController.create);

router.post("/test", upload, printReq);

router.route("/:id")
    .get(itemController.detail)
//     .put(upload, itemController.item_update_put, deleteImage)
//     .patch(verifyJWT, itemController.item_update_patch)
//     .delete(deleteItem, itemController.item_update_put);

// router.route("/:id/borrow")

//     .post(verifyJWT, itemController.item_borrow);
module.exports = router;
  