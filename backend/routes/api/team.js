const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles"); // in case of admin secrurity

const teamController = require("../../controllers/team_controller");

router.post("/", teamController.team_create);

router.get("/list", verifyJWT, teamController.team_list);

router.route("/:id")
    .get(verifyJWT, teamController.team_detail)
    .put(verifyJWT, teamController.team_update_put)
    .delete(verifyJWT, teamController.team_delete);



module.exports = router;

