const express = require("express");
const router = express.Router();
const uploadImage = require("../../middleware/upload_image.js"); // Import the multer upload configuration
const verifyJWT = require("../../middleware/verifyJWT.js");

const itemController = require("../../controllers/item_controller");
const verifyRoles = require("../../middleware/verifyRoles.js");

const parseJSON = require("../../middleware/parseJSON");

router.get("/list", itemController.list);
router.get(
  "/team-list/",
  verifyJWT,
  verifyRoles(["User"]),
  itemController.listForTeam
);

// router.get("/list-all", itemController.listAll);
// router.get("/list-all/:teamName", verifyJWT, verifyRoles(["User", "Admin"]), itemController.listAllForTeam);

router.post(
  "/",
  verifyJWT,
  verifyRoles(["Admin"]),
  uploadImage,
  itemController.create
);

router
  .route("/:id")
  .get(itemController.detail)
  .patch(verifyJWT, verifyRoles(["Admin"]), uploadImage, itemController.edit)
  .delete(verifyJWT, verifyRoles(["Admin"]), itemController.delete);

router.patch(
  "/:id/borrow",
  verifyJWT,
  verifyRoles(["User"]),
  parseJSON,
  itemController.borrow
);

module.exports = router;
