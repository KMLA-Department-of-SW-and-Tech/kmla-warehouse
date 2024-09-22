const express = require('express');
const router = express.Router();

// API Index
router.get('/', (req, res) => {
  res.json({ message: 'API Index' });
});

const itemRouter = require("./item");
const teamRouter = require("./team");
const tagRouter = require("./tag");
const categoryRouter = require("./category");
const borrowHistoryRouter = require("./borrow_history");
const adminRouter = require("./admin");
const authRouter = require("./auth")

router.use("/item", itemRouter);
router.use("/team", teamRouter);
router.use("/tag", tagRouter);
router.use("/category", categoryRouter);
router.use("/borrow-history", borrowHistoryRouter);
router.use("/adminRouter", adminRouter);
router.use("/auth", authRouter);

module.exports = router;