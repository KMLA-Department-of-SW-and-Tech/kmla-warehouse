const express = require("express");
const router = express.Router();
const upload = require('../../middleware/upload_image.js'); // Import the multer upload configuration
const printReq = require("../../middleware/print_req.js");

const itemController = require("../../controllers/item_controller"); 

router.get("/list", itemController.list);

router.post("/", upload, itemController.create);

router.route("/:id")
    .get(itemController.detail)
    .patch(upload, itemController.edit)
    .delete(itemController.delete);

router.patch("/:id/borrow", upload, itemController.borrow);

module.exports = router;
  