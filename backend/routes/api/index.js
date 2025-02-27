const express = require('express');
const router = express.Router();

// API Index
router.get('/', (req, res) => {
  res.json({ message: 'API Index' });
});

const itemRouter = require("./item");
const userRouter = require("./user");
/* const tagRouter = require("./tag");*/
/* const categoryRouter = require("./category");*/
const logRouter = require("./log");
/* const adminRouter = require("./admin"); */
const authRouter = require("./auth")
const refreshRouter = require("./refresh")

router.use("/item", itemRouter);
router.use("/user", userRouter);
/* router.use("/tag", tagRouter);
 *//* router.use("/category", categoryRouter); */
router.use("/logs", logRouter);
/* router.use("/adminRouter", adminRouter); */
// router.use("/auth", authRouter);
// router.use("/refresh", refreshRouter);

module.exports = router;