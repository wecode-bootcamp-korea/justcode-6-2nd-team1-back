const express = require("express");

const shopController = require("../controllers/shop_controller");

const router = express.Router();

router.get("", shopController.shopController);

module.exports = router;
