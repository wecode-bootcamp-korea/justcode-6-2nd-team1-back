const express = require("express");
const beverageController = require("../controllers/beverage_controller");
const validateToken = require("../middlewares/validate_token");

const router = express.Router();

router.get(
  "/detail/:id",
  validateToken.validateToken,
  beverageController.detailController
);

module.exports = router;
