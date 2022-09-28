const express = require("express");
const userController = require("../controllers/user_controller");

const userRouter = require("./user_router");
const beverageRouter = require("./beverage_router");
const shopRouter = require("./shop_router");

const router = express.Router();

router.use("/users", userRouter);
router.use("/beverages", beverageRouter);
router.use("/shops", shopRouter);
router.post("/kakaologin", userController.kakaoLoginController);
router.post("/naverlogin", userController.naverLoginController);

module.exports = router;
