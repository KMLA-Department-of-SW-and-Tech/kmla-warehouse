const express = require("express");
const router = express.Router();
const deleteItem = require("../../legacy/delete_item");
const deleteImage = require("../../legacy/delete_image");
const upload = require('../../middleware/upload_image.js'); // Import the multer upload configuration
const printReq = require("../../middleware/print_req.js");

const itemController = require("../../controllers/item_controller"); 

router.get("/list", itemController.list);

router.post("/", upload, itemController.create);

router.route("/:id")
    .get(itemController.detail)
    .patch(upload, itemController.edit)
//     .delete(deleteItem, itemController.item_update_put);

router.patch("/:id/borrow", upload, itemController.borrow);

//     .post(verifyJWT, itemController.item_borrow);
module.exports = router;
  