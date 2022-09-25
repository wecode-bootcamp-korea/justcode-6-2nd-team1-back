const express = require("express");
const beverageController = require("../controllers/beverage_controller");
const orderController = require("../controllers/order_controller");
const cartController = require("../controllers/cart_controller");
const cartOrderController = require("../controllers/cart_order_controller");
const reviewController = require("../controllers/review_controller");

const { validateToken } = require("../middlewares/validate_token");

const router = express.Router();

router.get("/category/:id", beverageController.categoryDetailcontroller);

router.get("/detail/:id", beverageController.detailController);

router.post("/order/:id", validateToken, orderController.orderController);

router.patch("/order/:id", validateToken, orderController.paymentController);

router.post("/cart/:id", validateToken, cartController.cartController);

router.get("/cart", validateToken, cartController.cartDataController);

router.patch(
  "/cart/:id/:amount",
  validateToken,
  cartController.cartModifyController
);

router.delete("/cart/:id", validateToken, cartController.cartDeleteController);

router.get(
  "/cartOrder",
  validateToken,
  cartOrderController.cartOrderController
);

router.patch(
  "/cartOrder",
  validateToken,
  cartOrderController.cartOrderPaymentController
);

router.post("/review/:id", validateToken, reviewController.reviewController);

router.get("/review/:id", reviewController.GetReviewController);

router.delete(
  "/review/:id",
  validateToken,
  reviewController.deleteReviewController
);

router.patch(
  "/order_cancel/:id",
  validateToken,
  orderController.orderCancelController
);

module.exports = router;
