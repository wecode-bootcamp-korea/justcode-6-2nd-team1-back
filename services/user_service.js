const userDao = require("../models/user_dao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AUTH_ACCESS_SECRET } = process.env;
// const refreshSecret = process.env.AUTH_REFRESH_SECRET;

const accountCheck = async (email) => {
  await userDao.getAccountData(email);
};

const signUpService = async (email, password, nickname, name, phoneNumber) => {
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);

  await userDao.createUser(email, password, nickname, name, phoneNumber);
  return;
};

const logInService = async (email, password) => {
  const [user] = await userDao.getUserByEmail(email);
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (comparePassword === false) {
    const err = new Error("login failed");
    err.statusCode = 400;
    throw err;
  } else {
    const accessToken = jwt.sign({ userId: user.id }, AUTH_ACCESS_SECRET, {
      expiresIn: "6h",
    });
    // const refreshToken = jwt.sign({}, refreshSecret, {
    //   expiresIn: "14d",
    // });
    return accessToken;
  }
};

module.exports = { accountCheck, signUpService, logInService };
