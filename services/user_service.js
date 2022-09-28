const userDao = require("../models/user_dao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AUTH_ACCESS_SECRET } = process.env;

const accessToken = (id) => {
  const token = jwt.sign({ userId: id }, AUTH_ACCESS_SECRET, {
    expiresIn: "6h",
  });
  return token;
};

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
    return accessToken(user.id);
  }
};

const userLocationService = async (userId, latitude, longitude) => {
  return await userDao.getShopLocation(userId, latitude, longitude);
};

const shopMatchingService = async (userId, shopId, latitude, longitude) => {
  return await userDao.modifyUserLocation(userId, shopId, latitude, longitude);
};

const kakaoLoginService = async (email, nickname) => {
  const [userCheck] = await userDao.getUserByEmail(email);
  if (!userCheck) {
    await userDao.createKakaoUser(email, nickname);
    const userData = await userDao.getUserByEmail(email);
    return accessToken(userData.id);
  } else {
    return accessToken(userCheck.id);
  }
};

module.exports = {
  accountCheck,
  signUpService,
  logInService,
  userLocationService,
  shopMatchingService,
  kakaoLoginService,
};
