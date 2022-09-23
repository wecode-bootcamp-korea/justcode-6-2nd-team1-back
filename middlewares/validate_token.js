const jwt = require("jsonwebtoken");
const userDao = require("../models/user_dao");
const { AUTH_ACCESS_SECRET } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const AccessTokenCheck = jwt.verify(accessToken, AUTH_ACCESS_SECRET);
    if (!accessToken) {
      res.status(400).json({ message: "token is not provided" });
      return;
    }

    const userId = AccessTokenCheck.userId;
    const userData = await userDao.getUserById(userId);
    if (!userData) {
      res.status(400).json({ message: "user not found" });
      return;
    }
    req.userData = userData;
    next();
  } catch (err) {
    console.log(err);
    res.status(404);
    res.json({ message: err.message });
  }
};

module.exports = { validateToken };
