const express = require("express");
const userController = require("../controllers/user_controller");
const orderListController = require("../controllers/order_list_controller");
const { validateToken } = require("../middlewares/validate_token");

const router = express.Router();

router.get("/userCheck", userController.accountCheck);
router.post("/signup", userController.signUpController);
router.post("/login", userController.logInController);
router.get(
  "/orderList",
  validateToken,
  orderListController.orderListController
);
router.get(
  "/user_location/:latitude/:longitude",
  validateToken,
  userController.userLocationController
);
router.patch(
  "/user_location",
  validateToken,
  userController.shopMatchingController
);

module.exports = router;
