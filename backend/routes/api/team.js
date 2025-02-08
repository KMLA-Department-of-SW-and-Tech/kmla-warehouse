const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles"); // in case of admin secrurity

// const teamController = require("../../controllers/team_controller"); Will implement

// const deleteTeam = require("../../middleware/delete_team");

// router.post("/", teamController.team_create);
// router.patch("/update-password", verifyJWT, teamController.update_current_team_password)

// router.get("/list", /* verifyJWT,  */teamController.team_list);

// router.route("/:id")
//     .get(/* verifyJWT,  */teamController.team_detail)
//     .put(verifyJWT, teamController.team_update_put)
//     .delete(verifyJWT, deleteTeam, teamController.team_update_put);

// router.route("/:id/borrow-list")
//     .get(/* verifyJWT,  */teamController.team_borrow_list);

module.exports = router;

