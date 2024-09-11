const express = require("express");
const router = express.Router();

const teamController = require("../../controllers/team_controller");

router.get("/list", teamController.team_list);

router.get("/:id", teamController.team_detail);

router.post("/", teamController.team_create);

router.put("/:id", teamController.team_update_put);

router.delete("/:id", teamController.team_delete);

module.exports = router;

