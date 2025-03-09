const express = require("express");
const router = express.Router();
require("dotenv").config();

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";


// API Index
router.get("/", (req, res) => {
    res.json({ message: env === "development" });
});

const itemRouter = require("./item");
const userRouter = require("./user");
const logRouter = require("./log");

router.use("/item", itemRouter);
router.use("/user", userRouter);
router.use("/logs", logRouter);

module.exports = router;
