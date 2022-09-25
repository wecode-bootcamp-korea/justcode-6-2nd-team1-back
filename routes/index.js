const express = require("express");

const userRouter = require("./user_router");
const beverageRouter = require("./beverage_router");
const shopRouter = require("./shop_router");

const router = express.Router();

router.use("/users", userRouter);
router.use("/beverages", beverageRouter);
router.use("/shops", shopRouter);

module.exports = router;
