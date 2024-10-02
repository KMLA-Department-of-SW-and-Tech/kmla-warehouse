const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");

const adminController = require("../../controllers/admin_controller");


<<<<<<< HEAD
router.post("/", verifyJWT,adminController.admin_create);

router.route("/:id")
    .get(verifyJWT,adminController.admin_detail)
    .put(verifyJWT,adminController.admin_update_put)
    .delete(verifyJWT,adminController.admin_delete);
=======
router.post("/", verifyJWT, adminController.admin_create);

router.route("/:id")
    .get(verifyJWT, adminController.admin_detail)
    .put(verifyJWT, adminController.admin_update_put)
    .delete(verifyJWT, adminController.admin_delete);
>>>>>>> 72f11e50351c767534e681205f1af04201d73ba3

module.exports = router;