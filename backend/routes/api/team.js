const express = require("express");
const router = express.Router();

const teamController = require("../../controllers/team_controller");

router.post("/", teamController.team_create);

router.get("/list", teamController.team_list);

router.route("/:id")
    .get(teamController.team_detail)
    .put(teamController.team_update_put)
    .delete(teamController.team_delete);



module.exports = router;

