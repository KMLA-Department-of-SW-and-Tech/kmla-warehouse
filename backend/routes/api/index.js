const express = require('express');
const router = express.Router();

// API Index
router.get('/', (req, res) => {
  res.json({ message: 'API Index' });
});

const itemRouter = require("./items");
const teamRouter = require("./teams");
const tagRouter = require("./tags");
const categoryRouter = require("./categories");
const borrowHistoryRouter = require("./borrow_history");
const adminRouter = require("./admin");

router.use("/item", itemRouter);
router.use("/team", teamRouter);
router.use("/tag", tagRouter);
router.use("/category", categoryRouter);
router.use("/borrow-history", borrowHistoryRouter);
router.use("/adminRouter", adminRouter);

module.exports = router;