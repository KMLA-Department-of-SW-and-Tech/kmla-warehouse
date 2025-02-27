const express = require("express");
const router = express.Router();
const upload = require('../../middleware/upload_image.js'); // Import the multer upload configuration
const verifyJWT = require("../../middleware/verifyJWT.js");

const itemController = require("../../controllers/item_controller"); 
const verifyRoles = require("../../middleware/verifyRoles.js");

router.get("/list", itemController.list);
router.get(verifyJWT, verifyRoles(["User", "Admin"]), "/list/:teamName", itemController.listForTeam);

router.get("/list-all", itemController.listAll);
router.get(verifyJWT, verifyRoles(["User", "Admin"]), "/list-all/:teamName", itemController.listAllForTeam);

router.post(verifyJWT, verifyRoles(["Admin"]), "/", upload, itemController.create);

router.route("/:id")
    .get(itemController.detail)
    .patch(verifyJWT, verifyRoles(["Admin"]), upload, itemController.edit)
    .delete(verifyJWT, verifyRoles(["Admin"]), itemController.delete);

router.patch(verifyJWT, verifyRoles, "/:id/borrow", upload, itemController.borrow);

module.exports = router;
  