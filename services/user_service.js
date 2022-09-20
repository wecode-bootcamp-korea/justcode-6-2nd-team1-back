const userDao = require("../models/user_dao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accountCheck = async (email) => {
  await userDao.getAccountData(email);
};

const signUp = async (email, password, nickname, name, phoneNumber) => {
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);

  await userDao.createUser(email, password, nickname, name, phoneNumber);
  return;
};

module.exports = { accountCheck, signUp };
