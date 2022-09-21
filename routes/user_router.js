const express = require("express");
const userController = require("../controllers/user_controller");
const validateToken = require("../middlewares/validate_token");

const router = express.Router();

router.get("/signup", userController.accountCheck);
router.post("/signup", userController.signUpController);
router.post("/login", userController.logInController);

module.exports = router;
