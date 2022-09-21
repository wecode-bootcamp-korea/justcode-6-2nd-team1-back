const express = require("express");
const beverageController = require("../controllers/beverage_controller");
const { validateToken } = require("../middlewares/validate_token");

const router = express.Router();

router.get("/category/:id", beverageController.categoryDetailcontroller);

router.get("/detail/:id", beverageController.detailController);

router.post("/order/:id", validateToken, beverageController.OrderController);

router.patch("/order/:id", validateToken, beverageController.paymentController);

module.exports = router;
