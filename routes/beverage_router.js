const express = require("express");
const beverageController = require("../controllers/beverage_controller");
const validateToken = require("../middlewares/validate_token");

const router = express.Router();

router.get("/detail/:id", beverageController.detailController);

// router.get("/category/:id", beverageController);

module.exports = router;
