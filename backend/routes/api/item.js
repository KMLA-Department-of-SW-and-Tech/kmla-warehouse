const express = require("express");
const router = express.Router();
const upload = require('../../middleware/upload_image.js'); // Import the multer upload configuration
const verifyJWT = require("../../middleware/verifyJWT.js");

const itemController = require("../../controllers/item_controller"); 
const verifyUserRoles = require("../../middleware/verifyUserRoles.js");
const verifyAdminRoles = require("../../middleware/verifyAdminRoles.js");

router.get("/list", itemController.list);
router.get(verifyJWT, verifyUserRoles, "/list/:teamName", itemController.listForTeam);

router.get("/list-all", itemController.listAll);
router.get(verifyJWT, verifyUserRoles, "/list-all/:teamName", itemController.listAllForTeam);

router.post(verifyJWT, verifyAdminRoles, "/", upload, itemController.create);

router.route("/:id")
    .get(itemController.detail)
    .patch(verifyJWT, verifyAdminRoles, upload, itemController.edit)
    .delete(verifyJWT, verifyAdminRoles, itemController.delete);

router.patch(verifyJWT, verifyUserRoles, "/:id/borrow", upload, itemController.borrow);

module.exports = router;
  