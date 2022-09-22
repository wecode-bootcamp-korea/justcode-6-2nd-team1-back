const express = require("express");
const beverageController = require("../controllers/beverage_controller");
const { validateToken } = require("../middlewares/validate_token");

const router = express.Router();

router.get("/category/:id", beverageController.categoryDetailcontroller);

router.get("/detail/:id", beverageController.detailController);

router.post("/order/:id", validateToken, beverageController.OrderController);

router.patch("/order/:id", validateToken, beverageController.paymentController);

router.post("/cart/:id", validateToken, beverageController.CartController);

router.get("/cart", validateToken, beverageController.cartDataController);

router.patch(
  "/cart/:id/:amount",
  validateToken,
  beverageController.cartModifyController
);

router.delete(
  "/cart/:id",
  validateToken,
  beverageController.cartDeleteController
);

router.get("/cartOrder", validateToken, beverageController.cartOrderController);
router.patch(
  "/cartOrder",
  validateToken,
  beverageController.cartOrderPaymentController
);

module.exports = router;
