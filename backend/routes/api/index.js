const express = require("express");
const router = express.Router();

const itemRouter = require("./item");
const userRouter = require("./user");
const logRouter = require("./log");

router.use("/item", itemRouter);
router.use("/user", userRouter);
router.use("/logs", logRouter);

module.exports = router;
